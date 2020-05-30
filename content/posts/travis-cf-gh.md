---
date:  "2017-07-12T00:00:00Z"
keywords:  ["tech"]
tags:  []
title:  "Deploying a static site to Github Pages using Travis and Cloudflare"

---

A quick and easy way to use these 3rd party services to deliver your site:

* [Cloudflare](https://www.cloudflare.com/) speeds up your site and gives you HTTPS for free.
* [Github Pages](https://pages.github.com/) is basically zero-configuration, free hosting.
* [Travis CI](https://travis-ci.org/) glues the pieces together. And it's free.

<!--more-->

# The setup for this site

1. the **source** for this static site is on the [`source`](https://github.com/goodgravy/goodgravy.github.io/tree/source) branch of the repo
1. when I push to that branch, Travis CI builds the static site, then pushes that built site to the [`master`](https://github.com/goodgravy/goodgravy.github.io) branch of the repo
1. Github pages is configured to serve the `master` branch as static files at http://goodgravy.github.io/
1. Cloudflare acts as a CDN in front of Github pages, serving as https://jmsbrdy.com/

## Travis CI configuration
Full file [here](https://github.com/goodgravy/goodgravy.github.io/blob/source/.travis.yml), relevant excerpt here:

{{< codeblock yaml >}}
deploy:
  local_dir: public
  provider: pages
  skip_cleanup: true
  target_branch: master
  fqdn: 'jmsbrdy.com'
  github_token: $GITHUB_TOKEN # Set in travis-ci.org dashboard
  on:
    branch: source
after_deploy:
  - |
    curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
     -H "X-Auth-Email: ${CF_EMAIL}" \
     -H "X-Auth-Key: ${CF_API_KEY}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
{{< /codeblock >}}

## Cloudflare configuration
Following [this guide](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) should get you basically there.

The `after_deploy` step purges the entire Cloudflare cache for your site, so feel free to be very aggressive with the caching settings.
