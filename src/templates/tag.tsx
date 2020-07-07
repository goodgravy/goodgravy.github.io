import React from 'react'
import {graphql} from 'gatsby'

import {ContentArticle} from '../components/content-article'
import Head from '../components/head'
import Layout from '../components/layout'
import PostExcerpt from '../components/post-excerpt.tsx'

interface Props {
  readonly data: PageQueryData
  readonly pageContext: {
    tag: string
  }
}

const TagTemplate: React.FC<Props> = ({data, pageContext}) => {
  const {tag} = pageContext
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <Head title={`Posts tagged "${tag}"`} keywords={[`blog`, `gatsby`, tag, `jmsbrdy`, `james brady`]} />
      <ContentArticle className="body">
        <h1>Posts tagged {tag}</h1>
        {posts.map(({node}) => {
          const title = node.frontmatter.title || node.fields.slug
          return <PostExcerpt key={node.fields.slug} node={node} title={title} />
        })}
      </ContentArticle>
    </Layout>
  )
}

interface PageQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    totalCount: number
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          title: string
        }
      }
    }[]
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {published: {ne: false}, tags: {in: [$tag]}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 300)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 256) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            staticThumbnail
          }
        }
      }
    }
  }
`

export default TagTemplate
