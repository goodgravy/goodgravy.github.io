---
title: "Are roadmaps useful any more?"
date: 2020-06-20T19:33:01-08:00
tags:
- tech
- management
- career
- teespring
keywords:
- roadmap
- planning
- agile
- iteration
- software
- product management
- project management

thumbnail:  "../assets/hard-turn.jpg"
coverImage: ../assets/waterfall.jpg
---

Does anyone actually do product roadmaps any more? If so: how? And _why_?

At university, we discussed the launch of a space shuttle as a classic example of where iterative software development wouldn't work, and waterfall reigned supreme: there's no such thing as an MVP and you don't really get to do a bug fix update if your V1 didn't work. But today, even [NASA is doing Agile](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20120013429.pdf). What should a medium- and long-term plan look like in this context?

<!-- excerpt -->

Historically, at Teespring we have tried to layout out a grand plan for what each quarter would look like. Sometimes this has gotten as detailed as what each individual engineer on a particular team would be working on on a week-by-week basis, over a full three month period.

Ignoring for a moment the obvious futility of trying to predict with any confidence that level of detail at that distance, the more pernicious problem is that these roadmaps would almost immediately become a burden rather than a useful tool.

There would be high friction to considering new projects ("what will we take out of the plan to make room?"), and low friction to plowing on with the planned work even if it wasn't the most impactful thing the team could do.

On top of that, the quarterly planning processing was antithetical to any sort of iterative, explorative experimentation. We had to get stuff locked in for the start of the quarter so there were a lot of implicit assumptions that we had neither a culture nor a process to validate.

## Out with the old; in with the new

[Sense & Respond](https://senseandrespond.co/) is a great reference here. It emphasises the importance of tight feedback loops in the way a company functions, and of bringing people from different disciplines together to make smaller decisions, faster.

Inspired by that, here is the approach we will follow for Q3:
1. The commercial leads and data team build a bottom-up model of what we should expect our baseline business performance to be
1. We form a number of **cross-functional teams**, each defined around an area of the business
1. Using our overall vision and strategy, the executive team identify the main execution and stategic results we want to achieve
1. We turn these outcomes into measurable KPIs[^1] applicable to each of the cross-functional teams
1. The cross-functional teams work together to generate:
   * a prioritised list of projects they can tackle to move their allotted KPIs
   * a list of resources (people, marketing budget, etc.) required to successfully execute the projects
1. The executive team lend a critical eye and give feedback on these projects
1. Throughout the quarter we re-examine the projects on a weekly or bi-weekly basis:
   * new opportunities are slotted into the right place
   * if an experiment has disabused us of the potential of a project, we remove it from the list
   * if an idea shows more promise than expected, it's moved up in priority

The most significant step here is actually #7. We could follow any process we wanted to come up with a roughed-out sketch for upcoming work, but the constant re-examination of priorities is where the feedback loop is closed, and where we bake flexibility into the process.

## Risks
A few situations are often raised as reasons why a strict roadmap is necessary. These include:
- _We need to plan and coordinate our marketing efforts with the launch date_
- _There's something intrinsic in the work that means it has to be done by X date (e.g. Black Friday readiness)_
- _We have external partners depending on something which we've promised_

Even in these cases, the core principles of an iterative, flexible approach will stand a team in good stead. The bar is quite low here: in the days of waterfall and strict roadmaps there were **plenty** of missed deadlines: we don't have to be perfect in order to be better.

Let's look at each of these situations:

#### Marketing plans
Firstly, the marketing folks are crucial participants in these cross-functional teams to enable them to develop and refine their materials as the product itself takes shape. This means that there doesn't need to be a big, complex hand-off from engineering to marketing when they think it's ready: the marketing team already have their message down pat. Secondly, modern marketing tools are much less about traditional ad campaigns that need to be planned months in advance. The sector has itself become more flexible and dynamic, making it a better fit for an iterative go-to-market plan.

#### Intrinsic deadlines
Let's take the case of "Readiness for Black Friday". Here, the deadline is indeed fixed, but the scope of work isn't. If in August you were to try and specify all the things you would do over three months to handle the forecasted load, no doubt certain complexities would be underestimated, dead-end ideas would be prioritised, and as-yet unrealised possibilities would be missed. Instead, we should focus on establishing a tight feedback loop and resist the hubristic tendency to guess at what will be necessary and what will work. For example, the first step should be to run some initial load tests, see how close you are to meeting the projected load, and see where the hotspots are in your infrastructure – then iterate from there.

#### External deadlines
Working to set up the relationship with the partner to emphasise a functional MVP as a sort of proof-of-integration can build ongoing iterative collaboration between the teams. This won't be possible in all cases, but even if you're working with a big unwieldly company, you can focus on delivering incremental value, proving out parts of the integration iteratively, and keeping them updated as you iterate. Doing so means that we can confidently answer the "is this partnership working?" question we should be asking ourselves regularly.

## Fingers crossed

This change to our planning philosophy and process is definitely something of an experiment. But, if what you have been doing so far isn't working properly, experimentation is exactly what one should do. I'll report back – good and/or bad – in three months!

[^1]: These KPIs are all [leading metrics](https://www.geckoboard.com/blog/leading-lagging-or-lost-how-to-find-the-right-key-performance-indicators-for-your-sales-team/) to make them more easily actionable

[^photo]: Cover photo by [Roberto Reposo](https://unsplash.com/@neovision?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on Unsplash
