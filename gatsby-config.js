/* eslint-disable @typescript-eslint/camelcase */
'use strict'

module.exports = {
  siteMetadata: {
    title: 'jmsbrdy.com',
    description: 'jmsbrdy.com',
    siteUrl: 'https://jmsbrdy.com',
    author: {
      name: 'James Brady',
      url: 'https://jmsbrdy.com',
      email: 'james@jmsbrdy.com',
    },
    social: {
      github: 'https://github.com/goodgravy',
      gravatar: 'https://www.gravatar.com/avatar/363e08c01d9caf37d45bf6e5a011421b?s=500',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
        excerpt_separator: `<!-- excerpt -->`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://jmsbrdy.com`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `James Brady`,
        short_name: `jmsbrdy.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/jb.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-9836486-2`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
