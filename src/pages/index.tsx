import React from 'react'
import {Link, graphql} from 'gatsby'
import Img from 'gatsby-image'

import {styled} from '../styles/theme'
import Layout from '../components/layout'
import Head from '../components/head'
import Bio from '../components/bio'

interface Props {
  readonly data: PageQueryData
}

interface PostExcerptProps {
  title: string
  node: {
    excerpt: string
    fields: {
      slug: string
    }
    frontmatter: {
      date: string
      title: string
      thumbnail: any
    }
  }
}

interface ThumbProps {
  readonly thumbnail: {
    readonly childImageSharp: {
      fluid: any
    }
  }
}

const StyledPostExcerpt = styled.div`
  clear: both;
`

const StyledThumbnail = styled(Img)`
  width: 256px;
  float: right;
`
const PostExcerpt: React.FC<PostExcerptProps> = ({node, title}) => {
  return (
    <StyledPostExcerpt key={node.fields.slug}>
      <Thumbnail thumbnail={node.frontmatter.thumbnail} />
      <h3>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <p dangerouslySetInnerHTML={{__html: node.excerpt}} />
    </StyledPostExcerpt>
  )
}

const Thumbnail: React.FC<ThumbProps> = ({thumbnail}) => {
  return thumbnail ? <StyledThumbnail fluid={thumbnail.childImageSharp.fluid} /> : null
}

const Index: React.FC<Props> = ({data}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <Head title="All posts" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Bio />
      <article>
        <div className={`page-content`}>
          {posts.map(({node}) => {
            const title = node.frontmatter.title || node.fields.slug
            return <PostExcerpt node={node} title={title} />
          })}
        </div>
      </article>
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
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          title: string
          thumbnail: any
        }
      }
    }[]
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
          excerpt
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
          }
        }
      }
    }
  }
`

export default Index
