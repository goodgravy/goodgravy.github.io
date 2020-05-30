---
title: "Elixir on Google Cloud Platform: hot code reloading?"
date: 2018-02-04T09:19:19-08:00
tags:
- tech
- elixir
- google
keywords:
- tech
- elixir
- google
thumbnailImage: "https://res.cloudinary.com/dshgddh17/c_lfill,h_280,w_280/jmsbrdy.com/elixir-logo.png"
thumbnailImagePosition: right
coverImage: "https://res.cloudinary.com/dshgddh17/jmsbrdy.com/constable-clouds.jpg"
coverSize: "partial"
# coverMeta: "out"
---

I stepped through [this guide](https://cloud.google.com/community/tutorials/elixir-phoenix-on-google-app-engine) for a _Hello World_ app running on Google Cloud Platform. How quickly can you get something working, and how convenient would it be to use longer-term?

In doing so, I confirmed GCP doesn't make use of Erlang's hot code reloading when re-deploying apps, but how important is that?

## How long does it take to get started?
**Starting point**: OS X machine with Python installed; Google account with developer access and an existing payment profile.

Minutes elapsed | Step
----------------|------
0  | Start!
1  | Create new Google Cloud project
3  | Add billing information (using existing payment profile)—they labour the point that you won't actually be charged
8  | Google Cloud SDK installed and initialised
13 | Elixir and Node packages installed locally
15 | Local development server up and running
19 | [Distillery](https://github.com/bitwalker/distillery)-based release running locally
20 | Start initial deploy to Google Cloud
33 | Initial deploy finished
35 | Start to deploy update to the app
45 | App update finished

## Surprises, good and bad
* Considering I deliberately began from a pretty unprepared starting point, I was pleased with how quickly the initial setup stages went (creating a new GCP project, installing the SDK locally, …). Quite often, these types of quick start tutorials _seem_ quick on the surface of it, but it turns out there's a bunch of annoying admin you need to do first to get to the real starting point. Not so with this one.
* This is a community-provided tutorial, and there are other very similarly named tutorials (see [this list](https://cloud.google.com/community/tutorials/)) with little to no distinction made about the differences between them, or why you might want to choose this over that. In addition, there are rudimentary _Getting Started_ instructions on the [GCP Elixir page](https://cloud.google.com/elixir/) which are different from the tutorials. It's easy to get confused or distracted when there's not a single, official source of information.
* Erlang applications (and Elixir apps by extension) have a great feature of [hot code loading](https://medium.com/@kansi/hot-code-loading-with-erlang-and-rebar3-8252af16605b) which means that the application can be changed live, without needing to take down and restart the service. However, this feature isn't—and can't be—used in any of the full service cloud platforms as far as I know. You could implement it yourself on EC2 or similar, of course, but I'd prefer not to.  More detail about why this is important below.
* The update to the app took longer than I was expecting. The initial deploy needs to set up all sorts of infrastructure, I'm sure, so it's understandable it took a while (about 13 minutes in my case). However, the subsequent deploy should be much more straightforward and I'm surprised it took 10 minutes.
* As is the norm (I find) with Google services, there wasn't a focus on an amazing developer experience. The platform is undoubtedly more extensible and configurable than something like Heroku, and the trade-off is that you have to wade through a bit more complexity to get things up and running, and to do common tasks.

## Hot code upgrades

As mentioned above, Erlang and Elixir apps can be updated on the fly without stopping the app. In GCP's case, this feature isn't being used. I proved this to myself with the following test:

By including an [`Agent`](https://elixir-lang.org/getting-started/mix-otp/agent.html) in the Phoenix app, I could store state between requests:

{{< gist goodgravy e9127ac2eeeaa85a250cbef0f084527d >}}

I hooked my controllers up to that `Agent`, to save and retrieve words submitted from a `<form>`:

{{< gist goodgravy ddaeda0b1506b07714d9e4926678675f >}}

When running the server locally, I could update the code of a running server with something like:

{{< gist goodgravy c26483b0c550229feb1663d348a20629 >}}

Crucially, **state stored in the `Agent` was preserved** throughout this upgrade.

When performing an analogous update on the Google Cloud app, this isn't true. GCP appears to be following the usual process of spinning up a new version of the app, then cutting over at the load-balancer level.

For webapps in frameworks like Rails or Django, this isn't a problem, as you don't store state in the app server. To achieve something similar to what I did using `Agents` in Elixir, you'd use Redis or similar.

However, for Elixir apps it's a shame, as process- or `Agent`-based state is extremely convenient. Not only that, but because it's so idiomatic there's a plethora of documentation encouraging its usage. New users in particular might get a nasty shock if they lean on process-based state then find that app updates wipe it out.
