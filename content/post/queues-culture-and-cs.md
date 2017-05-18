+++
categories = []
date = "2016-12-19T20:56:42+01:00"
description = ""
keywords = []
title = "Queues, Culture, and Computer Science"

+++

Much has been written about the deep cultural significance that orderly queueing holds for the Briton. The opportunities it offers to display impeccable manners -- and scowl at interlopers -- are so rich that I've lost count of the number of serious, extended conversations I've had about the do's and don'ts, the Ps and Qs, of waiting for service.

As a programmer, though, it's also interesting that there are clear parallels between core data structures found in computer science and the approaches to queueing found around the world.

# The United Kingdom: arrays

The spiritual home of the queue, many of its citizens would argue. A perceptible smugness tends to exude from the pasty pores of my countrymen when they lament how other, "less refined" cultures "don't even know how to queue"…

Of course, what they should _really_ say is that people in other countries have a different approach to queueing. But how so?

The British model their queues on **arrays**. That is, a single-file, strictly-ordered line, where each person knows absolutely nothing about those in front or behind them, because to pry would be rude.

![](/img/array.png)

The cashier, administrator or official who is servicing the backlog of visitors works their way strictly from front to back. The gentlenodes in the array need no intelligence or state whatsoever: everything operates on rigid, ancient social conventions.

# Spain: singly-linked lists
> ¿Quién da la vez?

Someone might ask as they walk into a bank in rural Spain.

In España, queueing is based on **singly-linked lists**. That is, a totally-ordered set of gentlenodes, but where the ordering of the nodes is much less evident to an outside observer than it might be for the case of an array. The nodes could be scattered around seemingly at random, and each one just knows about one neighbour.

![](/img/list.png)

_¿Quién da la vez?_ roughly means _Who is last?_, and this is how the linked-list is formed. Each person knows who is in front of them in the line, and just needs to keep an eye on them. When that person is finished, they know that they're up next.

It's a singly- rather than doubly-linked list because each person has no idea how many other people are behind them in the queue.

# China: heaps
I've only visited China briefly, but to my eyes it seemed like queueing in China is based around **heaps**.

![](/img/heap.png)

The person who is at the front of the line to be serviced is very well known, but behind them things become much less clear. We certainly don't know who is _last_. You'd expect that people within 2 or 3 layers from the front would be seen before someone 10 rows back, but you never really know how the throng will morph.

The set of people waiting, therefore isn't really ordered in any way, and certainly not strictly in terms of when you started queueing. It's characteristics are totally different from everything we hold dear in the UK.

# Pros and Cons
Of course, one approach isn't absolutely better than another. In the same way that a developer might choose between the different data structures depending on the traits of the problem they're trying to solve, different cultures have ended up with different approaches to queueing based on their needs and norms.

From my perspective, the British are pathologically stand-offish and refuse to engage with strangers on a human level, preferring instead to let the unspoken maxims of etiquette define who gets seen first at the bank.

* communication must be kept to an _absolute minimum_ hence the Spanish approach wouldn't work: the idea of asking a question to an entire room of strangers is an abhorrence
* physical contact is unacceptable, so any kind of jostling towards the front (as often happens in the Chinese heap approach) is an impossible idea to entertain
