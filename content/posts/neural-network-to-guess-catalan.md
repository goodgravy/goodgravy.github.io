---
title: "Can a neural network guess Catalan words?"
date: 2017-09-01T15:06:22+02:00
keywords:
- tech
- ml
coverImage: https://res.cloudinary.com/dshgddh17/jmsbrdy.com/neural.jpg
thumbnailImage: https://res.cloudinary.com/dshgddh17/c_lfill,h_280,w_280/jmsbrdy.com/neural-thumb.jpeg
thumbnailImagePosition: "right"
published: false

---

As a follow-up to [_It it possible to guess Catalan words?_](../../08/it-it-possible-to-guess-catalan-words/), how could we use a neural network to solve this problem?

Specifically, suppose there are some transformations we might apply to words in one language in order to naïvely translate them into another language. Can a neural network learn which transformations to apply in which scenarios? Could it even learn brand new transformations to apply?

<!--more-->

It's not immediately clear how to express this problem as something which could be ingested by a neural network.
