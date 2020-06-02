---
date:  "2020-06-01T00:00:00Z"
keywords:
- tech
- devops
- deployment
- cloudflare
- actions
- github
tags:
- tech
- devops
- code
title:  "Deploying a Gatsby site to GitHub Pages using Actions and Cloudflare"

---

I recently converted this site to be built using [Gatsby](https://www.gatsbyjs.org/) rather than [Hugo](https://gohugo.io/). I'll write about that conversion process separately: this post only concerns the deployment and delivery of the built site. These phases can be basically identical between Hugo, Gatsby, or any other static site generator: at the most basic level it boils down to making a folder of HTML, CSS, and JS available at a URL, 1997-style.

<!-- excerpt -->

[Previously](/travis-cf-gh), I was using [Travis CI](https://travis-ci.org/) to build the HTML, CSS, and JavaScript, then pushing that content to the `master` branch of [the repo](https://github.com/goodgravy/goodgravy.github.io), with [Cloudflare](https://www.cloudflare.com/) in front of everything as a CDN.

## GitHub Actions
The main change is to use [GitHub Actions](https://github.com/features/actions) instead of Travis. I know that GitHub have a tremendous focus on Actions and Marketplace internally, so wanted to use this site as an opportunity to become more familiar with the system.

Deployment meant three things:

1. Build this Gatsby site into production-optimised assets
2. Push those assets to the `master` branch of the repo (which – when properly configured – results in [GitHub pages](https://pages.github.com/) serving them as a static site)
3. Bust Cloudflare's cache

Having now created this setup [in Travis](https://github.com/goodgravy/goodgravy.github.io/blob/6159d37a731283c0279f96a5c3081451215191fc/.travis.yml) _and_ [in GitHub Actions](https://github.com/goodgravy/goodgravy.github.io/blob/5764b6501cdcd7b4a05cb2427048dc022b6a3485/.github/workflows/deploy.yml), these differences are evident:

* GitHub want you to use Marketplace tools rather than hand-crafted bespoke scripts
* Marketplace tools are way more convenient than hand-crafted bespoke scripts (for simple use cases)
* Authentication and secret management is 10x easier in GitHub Actions than Travis or other external CI systems

### Build and deploy site
When I was using Travis, I had coded out all the steps necessary to complete this phase:

```yaml
before_install:
- openssl aes-256-cbc -K $encrypted_3f2dabfde256_key -iv $encrypted_3f2dabfde256_iv
  -in travis_key.enc -out travis_key -d
install:
- wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.69.2/hugo_0.69.2_Linux-64bit.deb
- sudo dpkg -i /tmp/hugo.deb
script:
- ls -lrtA themes
- hugo version
- hugo -v
deploy:
  local_dir: public
  provider: pages:git
  edge: true
  deploy_key: travis_key
  target_branch: master
  fqdn: jmsbrdy.com
  on:
    branch: source
```

Futz around with encrypted keys, download the Hugo binary onto the builder, install it, build the site, push it to GitHub. You can ignore the `ls -lrtA themes` and `hugo version` – I leave them in here because they are evidentially echoes of historical problems I'd been having getting the builder set up properly!

In contrast, with GitHub actions there is an off-the-shelf tool on Marketplace:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: enriikke/gatsby-gh-pages-action@v2.1.1
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          gatsby-args: '--'
```

The only funky thing here is that I had to pass explicit `gatsby-args` because otherwise the tool would literally run `npm run build ""` which fails.

### Bust the Cloudflare cache
Again, in Travis this was much more imperative:

```yaml
after_deploy:
- |
  curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
   -H "X-Auth-Email: ${CF_EMAIL}" \
   -H "X-Auth-Key: ${CF_API_KEY}" \
   -H "Content-Type: application/json" \
   --data '{"purge_everything":true}'
```

In GitHub Actions, it's declarative:

```yaml
      - name: Purge Cloudflare cache
        uses: jakejarvis/cloudflare-purge-action@master
        env:
          CLOUDFLARE_ZONE: ${{ secrets.CF_ZONE_ID }}
          CLOUDFLARE_TOKEN: ${{ secrets.CF_API_TOKEN }}
```

### Secret management
Secrets are supported in both Travis and GitHub. However, to enable GitHub repo pushes in Travis, I went through this rigmarole:

- created a keypair
- added the public key to my GitHub account
- encrypted the private key
- saved the encrypted key value to Travis
- changed my `.travis.yml` to decrypt the key

Now, easier pathways _may_ be available, but note that this is the [official recommendation in their instructions](https://docs.travis-ci.com/user/deployment-v2/providers/pages/) and therefore clearly what the folks behind Travis are expecting us to do.

In GitHub Actions, it was as simple as storing a deploy key as a repo secret. Because the Action receives a ["hydrated Octokit"](https://www.npmjs.com/package/@actions/github) as a calling parameter, it's much more straightforwards for that action to perform privileged GitHub tasks on your behalf.

I'm a fan!
