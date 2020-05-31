---
title: "ynabadell: connect your Sabadell bank account with YNAB"
slug: "ynabadell"
date: 2019-02-04T18:42:48+01:00
tags:
- tech
- javascript
keywords:
- javascript
- node
- ynab
- you need a budget
- import
- export
- api
- sabadell
thumbnail: ../assets/calculator.jpg
coverImage: ../assets/piggy.jpg
coverSize: "partial"
coverMeta: "out"
---

We've recently started using You Need A Budget ([YNAB](https://www.youneedabudget.com/)) to plan our finances. Unfortunately, like most finance apps it's focussed squarely on the north american market: its automatic transaction importing only works for some US and Canadian banks – and we live and bank in Spain…

YNAB **does** support a manual process, where you upload QFX or OFX files – or CSVs (in their required format). However, our bank ([Sabadell](https://www.bancsabadell.com)) supports neither QFX nor OFX, and their CSV format is markedly different from that which YNAB expects in the upload. We were stuck with the prospect of importing every single transaction by hand, or manually downloading a CSV from Sabadell and munging it into a shape that YNAB can understand.

Surely we can do better?

<!-- excerpt -->
So became [**ynabadell**](https://github.com/goodgravy/ynabadell) – a tool to automatically import transactions from Sabadell into your YNAB ledger.

Technically speaking, **ynabadell** resembles an ETL system in many ways:

1. **Extract** transactions from Sabadell's online banking
1. **Transform** the transactions into the format expected by YNAB
1. **Load** the transactions into YNAB via API

If you just want to use the tool, feel free to look at [the instructions](https://github.com/goodgravy/ynabadell/blob/master/README.md). If you're looking for more information on how it works – or how you might tackle creating a similar tool for other banks – keep reading:

# The Extractor
This component grabs transactions from Sabadell's online banking, in their CSV format. I use [Puppeteer](https://github.com/GoogleChrome/puppeteer) as a headless browser to sign into Sabadell and grab the transaction data.

The main things which stood out to me while creating this component is that Sabadell's website is **extremely** painful to navigate in a headless browser. There is very little semantic markup, lots of jumbled-up table layouts sat alongside – or inside – div-based layouts, and mixed natural languages in the structure (e.g. Spanish and English class- and input-names).

As such, I'm expecting to need to regularly tweak and fix the selector rules – they are perilously fragile. A few other caveats:

* The extractor downloads transactions for the last month. This would be easy to configure differently if you wanted to, but in its current form it expects the ETL to be run at least once monthly to get a complete ledger in YNAB. Duplicate imported transactions aren't a concern (see [The Loader](#the-loader), below).
* I've only run the extractor against our personal account. It's entirely possible that if you have more or fewer accounts, or they're arranged differently in the Overview page the extractor will get confused and not work properly for you. In this case, I would love a PR if you can find a way of driving Puppeteer in a way which works both for you and for me!

The end result of the extractor is a list of `SabadellTransaction` value objects, which will be passed into…

# The Transformer
Probably the simplest component: all the transformer does is create a `YNABTransaction` value object for each `SabadellTransaction` it is given.

You can take a look at [the code](https://github.com/goodgravy/ynabadell/blob/master/transformer.js) if you'd like, but there's not too much to it.

Each `YNABTransaction` that the transformer emits is passed into…

# The Loader
Thankfully, YNAB has a [nice API](https://api.youneedabudget.com/) which supports many different operations – the one we're interested in is the ability to [upload new transactions](https://api.youneedabudget.com/v1#/Transactions/createTransaction) into a particular account.

In the extraction section above, I noted that duplicate transactions weren't a concern. This is because the YNAB API conveniently allows for idempotency through an `import_id` which you can include alongside every transaction. If you upload two transactions with the same `import_id`, the latter one is ignored as a duplicate – even if the data are different.

YNAB uses this approach to generate `import_id` fields:

> … this field is a unique (by account) import identifier. If this transaction was imported through File Based Import or Direct Import and not through the API, the import_id will have the format: 'YNAB:[milliunit_amount]:[iso_date]:[occurrence]'. For example, a transaction dated 2015-12-30 in the amount of -$294.23 USD would have an import_id of 'YNAB:-294230:2015-12-30:1’. If a second transaction on the same account was imported and had the same date and same amount, its import_id would be 'YNAB:-294230:2015-12-30:2’.

I chose to follow this same approach for `import_id` generation in **ynabadell** so that you can make a smooth transition from manual CSV uploads – the two systems will work properly in conjunction with one another.

Apart from the `import_id`, really the only interesting thing which isn't supplied in the `YNABTransaction` is the access token – it's easy to get your own YNAB personal access token by following the README instructions.

# Putting it all together
Currently, **ynabadell** is designed to be run as a `launchctl` service on OS X.

A plist file is supplied which will need to be customised to your needs. It just runs the top-level script which is responsible for reading in configuration, and then stringing together the extractor, transformer, and loader.
