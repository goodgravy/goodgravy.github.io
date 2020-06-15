import React from 'react'
import {Helmet} from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

type StaticQueryData = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: {
        name: string
      }
    }
  }
}

interface Props {
  readonly title: string
  readonly description?: string
  readonly lang?: string
  readonly keywords?: string[]
}

const Head: React.FC<Props> = ({title, description, lang, keywords}) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
            }
          }
        }
      }
    `}
    render={(data: StaticQueryData): React.ReactElement | null => {
      const metaDescription = description || data.site.siteMetadata.description
      lang = lang || 'en'
      keywords = keywords || []
      const color = '#49579C'
      return (
        <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`}>
          <html lang={lang} />
          <meta name="description" content={metaDescription} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:creator" content={data.site.siteMetadata.author.name} />
          <meta name="theme-color" content={color} />
          <meta name="msapplication-navbutton-color" content={color} />
          <meta name="apple-mobile-web-app-status-bar-style" content={color} />
          {keywords.length > 0 && <meta name="keywords" content={keywords.join(`, `)} />}
        </Helmet>
      )
    }}
  />
)

export default Head
