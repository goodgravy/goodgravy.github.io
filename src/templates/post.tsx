import React from 'react'
import {graphql} from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'
import FullWidthContainer from '../components/full-width-container'
import CoverImg from '../components/cover-image'
import {ContentArticle} from '../components/content-article'

interface Props {
  readonly data: PageQueryData
}

interface HeaderProps {
  readonly title: string
  readonly image: any
}

const PostHeader: React.FC<HeaderProps> = ({image}) => {
  const headerImage = !!image && (
    <FullWidthContainer>
      <CoverImg fluid={image.childImageSharp.fluid} alt="Cover image" />
    </FullWidthContainer>
  )

  return <header>{headerImage}</header>
}

const PostTemplate: React.FC<Props> = ({data}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const excerpt = post.frontmatter.description || post.excerpt
  const postTitle = post.frontmatter.title

  return (
    <Layout title={siteTitle}>
      <Head title={postTitle} description={excerpt} keywords={post.frontmatter.keywords} />
      <PostHeader image={post.frontmatter.coverImage} />
      <ContentArticle className="body">
        <h1 className="page-header">{postTitle}</h1>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
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
  markdownRemark: {
    id?: string
    excerpt?: string
    html: string
    frontmatter: {
      title: string
      keywords: string[]
      coverImage: any
    }
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 300)
      html
      frontmatter {
        title
        description
        keywords
        coverImage {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default PostTemplate
