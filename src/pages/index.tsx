import React from 'react'
import {Link, graphql} from 'gatsby'
import Img from 'gatsby-image'

import {styled} from '../styles/theme'
import ContentArticle from '../components/content-article'
import Layout from '../components/layout'
import Head from '../components/head'

interface PageProps {
  readonly data: PageQueryData
}

interface PostPreview {
  readonly node: {
    readonly excerpt: string
    readonly fields: {
      readonly slug: string
    }
    readonly frontmatter: {
      readonly date: string
      readonly title: string
      readonly thumbnail: {
        readonly childImageSharp: {
          fluid: any
        }
      }
      readonly staticThumbnail: string
    }
  }
}

interface PostExcerptProps {
  title: string
  PostPreview
}

interface ThumbProps {
  readonly thumbnail: {
    readonly childImageSharp: {
      fluid: any
    }
  }
  readonly staticThumbnail: string
}

const Article = styled.article`
  margin-top: 100px;
`

const StyledPostExcerpt = styled.div`
  margin-bottom: 3em;
  overflow: auto;

  h3 {
    a,
    a:visited {
      color: hsl(230, 36%, 45%);
    }
  }
`

const thumbnailStyles = `
  width: 256px;
  float: right;
  margin-left: 1em;

  @media (max-width: 760px) {
    width: 150px;
  }
`
const StyledThumbnail = styled(Img)`
  ${thumbnailStyles}
`
const StyledStaticThumbnail = styled.img`
  ${thumbnailStyles}
`

const PostExcerpt: React.FC<PostExcerptProps> = ({node, title}) => {
  return (
    <StyledPostExcerpt>
      <Thumbnail thumbnail={node.frontmatter.thumbnail} staticThumbnail={node.frontmatter.staticThumbnail} />
      <h3>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <p dangerouslySetInnerHTML={{__html: node.excerpt}} />
    </StyledPostExcerpt>
  )
}

const Thumbnail: React.FC<ThumbProps> = ({thumbnail, staticThumbnail}) => {
  if (thumbnail) return <StyledThumbnail fluid={thumbnail.childImageSharp.fluid} />
  if (staticThumbnail) return <StyledStaticThumbnail src={staticThumbnail} />
  return null
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
