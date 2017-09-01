---
title: "Can a neural network guess Catalan words?"
date: 2017-09-01T15:06:22+02:00
showDate: false
keywords:
- tech
- ml
coverImage: /img/neural.jpg
thumbnailImage: /img/neural-thumb.jpeg
thumbnailImagePosition: "right"
draft: true

---

As a follow-up to [_It it possible to guess Catalan words?_](../../08/it-it-possible-to-guess-catalan-words/), how could we use a neural network to solve this problem?

Specifically, suppose there are some transformations we might apply to words in one language in order to naïvely translate them into another language. Can a neural network learn which transformations to apply in which scenarios? Could it even learn brand new transformations to apply?

<!--more-->

It's not immediately clear how to express this problem as something which could be ingested by a neural network.
