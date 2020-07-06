import React from 'react'
import {graphql} from 'gatsby'

import ContentArticle from '../components/content-article'
import Head from '../components/head'
import Layout from '../components/layout'
import PostExcerpt from '../components/post-excerpt.tsx'

interface PageProps {
  readonly data: PageQueryData
}

const Index: React.FC<PageProps> = ({data}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <Head title="All posts" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <ContentArticle>
        {posts.map(({node}) => {
          const title = node.frontmatter.title || node.fields.slug
          const description = node.frontmatter.description
          return <PostExcerpt key={node.fields.slug} node={node} title={title} description={description} />
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
    edges: PostPreview[]
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {published: {ne: false}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
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

export default Index
