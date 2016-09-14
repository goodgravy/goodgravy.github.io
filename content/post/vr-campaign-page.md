+++
Description = "A quick and dirty proof of concept for a virtual reality Teespring campaign page, created as a potential hackathon project"
Tags = ["Development", "Teespring", "VR"]
date = "2015-06-06T14:06:44+01:00"
title = "Prototype: Virtual Reality e-commerce"

+++

At [Teespring](https://teespring.com/) we have quarterly hackathons. We all
throw suggestions into a melting-pot of ideas in the run-up to the event, with
the most promising, most interesting, and most popular suggestions graduating
to be hacked upon by a small team for a couple of days.

A friend of mine at
[DODOcase](http://www.dodocase.com/collections/virtual-reality) had given me a
couple of Google Cardboard-based virtual reality viewers that I hadn't gotten
around to playing with yet, and this hackathon was the perfect opportunity to
have a play!

The basic idea was to use the [Virtual Reality capabilities in
WebGL](https://vr.chromeexperiments.com/) to give a Cardboard-equipped customer
a 3D virtual preview of the product. This is still experimental stuff, but
well-supported in all modern mobile browsers!

In order to prove the idea was even vaguely possible, and to give my Hackathon
pitch some substance, I put together this quick-and-dirty prototype
([full-screen version here](/vr-campaign.html)):

<iframe src="/vr-campaign.html" height="350px" width="100%"
  style="border: none"> </iframe>

Here, the Cardboard shows the left render to your left eye, and the right
render to your right eye. The camera locations are slightly different meaning
you get a [stereoscopic](https://en.wikipedia.org/wiki/Stereoscopy) effect!

In the end, I didn't move the idea past this prototype stage (and ended up
hacking on machine learning fraud detection instead… more on that another time
maybe), but I was surprised by how easy it was to get VR working on my phone
browser, and how well it performed!
