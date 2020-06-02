---
title: "InnoDB and Table-level Locking"
date: 2018-03-29T06:21:34-07:00
tags:
- tech
- teespring
- databases
- devops
keywords:
- tech
- mysql
- innodb
- databases
- locking
- devops
- concurrency
- performance
thumbnail: ../assets/lock.jpg
---

One of the main reasons InnoDB is the go-to choice for our MySQL tables is that it supports row-level locking[^1]. This means that as we're reading from and writing to a table, we don't need to wait for **all** the other processes to finish up their work before we can get access to that table.

For larger tables, this ability to have multiple processes working on the same table at the same time is almost essential to get any level of decent performance, for most workloads.

However, we recently ran into a problem where – because of a detail of how InnoDB and MySQL work – we ended up doing table-level locking rather than row-level, with disastrous results.

<!-- excerpt -->

# What should happen – and what did happen
We use [LHM](https://github.com/soundcloud/lhm) to manage our database migrations. Other tools exist, but most (if we're talking about MySQL) work on the principle of:

1. Creating a new table with the desired, updated schema.
1. Double-writing any changes to the old and new tables.
1. Copying legacy data across from the old table to the new table slowly.
1. Once the old data has been copied into the new table, atomically switching to use that new table as the source of truth.
1. [Remove the old table]

Crucially, all of these steps can be done incrementally, without needing to stop activity on the table to do the maintenance – making this a so-called _online schema change_.

However, the problem we were seeing is that as soon as we started the migration, activity would grind to a halt on the table: no queries were completing if they touched the table being migrated.

We had to cancel the migration in a hurry, and with a crucial table effectively out of action, we did a database reboot and failover.

# The red herring
Step #3 is a little tricky when doing a migration. If the rate at which you're copying across existing data is too low, the migration can take an egregiously long time to complete; if your settings are too aggressive, you can overload the database and cause it to become unresponsive.

When investigating the problem, at first we thought we had stumbled into the latter situation: we thought the migration was going too fast, thereby making the table perform so poorly that it was basically unusable.

LHM has the concept of `stride` and `delay` to parameterise the rate at which you do Step #3. However, after adjusting those parameters to make the migration extremely cautious, we still saw the exact same behaviour as before. The table froze up any queries touching it, immediately: we rebooted and failed over. Clearly Step #3 wasn't the problem.

# Trigger creation is fast… right?

Through adding a lot of logging – and having three of us frantically issue diagnostic commands in parallel during an unsuccessful migration! – we noticed that the LHM migration was only getting to Step #2, as described above.

Specifically, LHM creates *database triggers* to automatically – and quickly – double-write changes on the old database table into the new one. It was the **creation** of those triggers where we were having problems. Looking in the MySQL process list, we could see a query like this:

```
+------+---------------------------------+------------------------------------------------------------------------------------------------------------+
| TIME | STATE                           | INFO                                                                                                       |
+------+---------------------------------+------------------------------------------------------------------------------------------------------------+
...
|   19 | Waiting for table metadata lock | CREATE TRIGGER trig AFTER DELETE ON table1 FOR EACH ROW DELETE IGNORE FROM table1 WHERE table1.id = OLD.id |
...
```

That's a process taking 19 seconds (and counting) to create a new trigger on the table we are migrating. When we killed that specific process, the LHM migration failed – but the table "unfroze" and the backed-up queries were able to complete successfully.

I'm used to trigger creation being **extremely** fast (sub-second, certainly), so there was something unexpected going on here.

# The epiphany

The `Waiting for table metadata lock` state of the process was the key to unlocking the puzzle.

[This post](https://www.chriscalender.com/troubleshooting-waiting-for-table-metadata-lock-errors-for-both-myisam-and-innodb-tables/) has some useful detail which served us well. In short, we realised that:

* Trigger creation is classed as a DDL type of statement by MySQL
* DDL statements need an exclusive lock on all the tables they operate on
* Step #2 for LHM is trigger creation (see [above](#what-should-happen--and-what-did-happen))
* We had an existing problem with unoptimised queries running for a long time against some tables
* Those long-running queries were sometimes issued within a transaction

Putting all those factors together resulted in a serious problem.

Because there were long-running unresolved transactions on the table, the `CREATE TRIGGER` statement was unable to get the exclusive table lock it needed. Then, **all** subsequent queries on the table were held-up behind the `CREATE TRIGGER` statement.

By introducing this DDL statement into our normal mix of row-level locking queries, it meant that we immediately lost the ability to have multiple processes working against the table being migrated. Definitely not an online schema change at that point!

# The workaround

The obvious fix is to not have long-running queries on your master database. Potentially, you can pause particular workloads (known to be the cause of long-running queries) while a migration is happening.

We have since invested some care and attention here, but at the time this wasn't an immediate-term solution so we had to look for a different approach.

In the end, we hit upon the idea of periodically – but carefully – killing queries during the lifecycle of a migration, so that they can't build up in front of the various DDL statements that LHM issues. Obviously, any solution which includes the programmatic killing of database queries is far towards the sketchy end of the spectrum. We were able to get away with it because we knew that in our case the problematic queries could be killed without harmful effects.

You can see the changes we made in [this PR](https://github.com/teespring/lhm/pull/1) – note that our LHM fork is 100% tied to Teespring's domain, but perhaps the overall idea would be useful to someone in a tight spot.

[^1]: More precisely, MySQL does its locking at the index-level, which lets it do interesting stuff like the gap locking mentioned [in the manual](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html).
