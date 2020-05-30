---
Description:  "Taking \"Not Invented Here\" to a whole new level."
Tags:  ["IBM", "tech"]
date:  "2013-07-05T16:43:55+01:00"
title:  "The worst project I ever worked on"

---


I was recently asked:

> what's the worst project you ever worked on?

After a quick scan through my mental graveyard of half-finished, half-assed
ideas too embarrassing for me to dignify with a link here, I settled upon my
first job out of university.

<!--more-->

## The company

I was hired as a Software Engineer by IBM, to work out of their main UK
development laboratory, [Hursley
Park](http://en.wikipedia.org/wiki/Hursley_House), home of the mighty **CICS**,
**WebSphere MQ** and **MessageBroker** products.

These are the gold standard in messaging and transaction processing backends
that do the heavy-lifting behind the scenes of lots of Big Enterprise Systems.

## The role

I was part of the *WebSphere MQ build team*. We were responsible for taking the
big MQ codebase and compiling it on all the different supported platforms.
Linux on several architectures, Windows, AIX, HP-UX, iSeries, zSeries, …

The main challenge of the role was reliably managing jobs in wildly heterogeneous
environments and getting useful information back if something went wrong.

The team had originally used a bunch of cron-style jobs on each build machine,
which -- a couple of times a day -- would pull the code, compile it, and make the
results available on a network share.

## The project

By the time I arrived, however, the cron jobs had been replaced by **JEM**: the Job
Execution Manager.

JEM was a central server, communicating with agents on each build machine. It
meant that builds could be started on arbitrary machines, at arbitrary times,
with arbitrary changesets; it also gated the jobs so that build machines didn't
get swamped with several at once.

JEM was kind of A Big Deal and -- if the scuttlebutt was to be believed -- had
launched the guy behind it onto a promotion hyper-fast track.

## The problem

Despite JEM only being two or three years old at that point, it had already
become something of a black box to everyone on the team, as the creators had moved
on to other roles:

* "Turn if off and on again" was always the first (and normally only) strategy.
  There was no point trying to capture information about the broken state,
  because no one could take action on it anyway.
* We couldn't add support for new build architectures because the details of
  the communication protocol were only "documented" in the (poorly-written)
  code.
* The engineers were rightly clamouring for Continuous Integration, but
  changing the dynamics of JEM to support it was such an intimidating project
  we couldn't even begin to consider it.

## Why is this the worst?

Every developer is familiar
with [Not Invented Here](http://en.wikipedia.org/wiki/Not_invented_here), and
has probably been responsible for it at some point. I know I have!

But let's look at the requirements for JEM:

* jobs to be orchestrated from a central server
* reliable communication required between server and clients
* clients required on all the architectures MQ could run on
* build requests to be queued until client is available to process them

Does that remind you of anything?

How about [WebSphere MQ](http://www-03.ibm.com/software/products/us/en/wmq/)?

A team of *four people* was required to administer and manage JEM, when the
very thing it was building had been the perfect solution all along. It should
have been [self-hosting](http://en.wikipedia.org/wiki/Self-hosting)!

## Summary

To roll your own solution when a suitable alternative already exists is a poor
show, but understandable and very common.

Still rolling your own solution when the alternative is well-known to
you and you can use it for free -- and with effectively unlimited support from the
world's top experts -- is inexcusable.

**Still** rolling your own solution when the tangible output of your daily work
_is itself the perfect solution_ (which you can use for free, with unlimited
support)… that's the worst project I ever worked on.
