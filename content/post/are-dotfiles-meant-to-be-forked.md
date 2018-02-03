+++
date = "2016-09-18T15:09:41+01:00"
description = ""
keywords = []
title = "Are dotfiles meant to be forked?"
showDate = false

+++

**Tl;dr**: I don't think so, so I created [Full
Stop](https://github.com/goodgravy/full-stop/) as a way for us to share dotfile
**tooling** while staying agnostic about the **content**.

<!--more-->

---

In ["Dotfiles Are Meant to Be
Forked"](https://zachholman.com/2010/08/dotfiles-are-meant-to-be-forked/), Zach
Holman points out that we _all_ benefit through sharing the efficiency-boosting
tips, tricks, and tools many of us have in our
[dotfiles](https://dotfiles.github.io/), and I completely agree.

However, I think it's important to draw a distinction between the **tooling**
around dotfiles, and the **content** of the dotfiles themselves.

The **tooling** -- which handles the grunt-work of applying the dotfiles
configuration to a computer -- should be quite consistent between all of us.
There's not much personal preference or variation here: code-sharing makes
sense for our tooling.

Sharing is crucially important for the **content** of the dotfiles, too. I
always seem to be grabbing snippets of configuration to tweak the way my editor
works, or how my terminal looks.

_However, forking isn't the right sharing mechanism for dotfiles content._

To be fair, I think what Zach was saying is that we should fork each others'
dotfiles as a starting point, and not expect to merge from the upstream (or
from anywhere else) from that point onwards.

Unfortunately, with that approach we don't benefit from upstream changes we
_are_ interested in, like the
[Brewfile](https://github.com/Homebrew/homebrew-bundle) support added to
`holman/dotfiles`. Both your fork and the upstream have been independently
gorging on dotfiles tidbits from across the Internet with epicurean abandon,
and the divergent commit history means it's non-trivial to pull those sorts of
improvements downstream. They may as well be completely separate repos!

## What's the alternative?

I had been using a fork of
[`holman/dotfiles`](https://github.com/holman/dotfiles) for a while to track
and share my configuration over time and space. It worked pretty well, but
there were two main problems with it:

1. The repo comes with a _lot_ of bundled configuration: Vim, Ruby, Atom,
   Node, Xcode, Go, … The recommended approach is to fork the repo, but that
   means from the first commit you're encumbered with a bunch of stuff you
   don't necessarily care for.
1. The tooling which manages the configuration is mixed directly into the
   configuration files themselves. There are bi-directional dependencies and
   it's really hard to see where one ends and another begins. It's almost
   impossible to benefit from tooling improvements that exist upstream because
   you need to deal with all of the unwanted configuration updates that have
   also happened upstream.

As a result, I created [Full Stop](https://github.com/goodgravy/full-stop/).

Full Stop is a small framework on which to build your dotfiles. It defines a
simple structure and set of rules to follow in your dotfiles, and expects to be
embedded in your dotfiles repo either as a submodule or a subtree.

When you build your dotfiles on top of Full Stop, your environment
customisations are kept safe in single, shared, and version-controlled place.
All Full Stop does is apply these customisations wherever you need them.

## How is Full Stop different?

Full Stop tries to draw a line between the content of your dotfiles (which you
own, and you alone), and the plumbing which hooks up that configuration to take
effect on a system.

Even if all of our personal configurations are wildly different, we should be
able to use the same tooling to apply it to a computer. This is the goal of
Full Stop.

As for the actual content of your dotfiles: sure, grab someone else's to get
started with. [Grab
mine](https://github.com/goodgravy/dotfiles/archive/master.zip)! But go ahead
and also grab whatever useful nuggets you come across and include those too.
Our dotfiles should be a wildly heterogeneous grab bag of snippets from here,
there, and everywhere that constantly shift over time.

Let's use code-sharing where it makes sense -- for the tooling -- and just
copy-paste snippets for the rest.

## Interested?

See the [Full Stop docs](https://github.com/goodgravy/full-stop/).
