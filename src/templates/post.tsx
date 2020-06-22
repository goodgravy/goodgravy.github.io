import React from 'react'
import {graphql} from 'gatsby'

import ContentWidth from '../components/content-width'
import Layout from '../components/layout'
import Head from '../components/head'
import FullWidthContainer from '../components/full-width-container'
import CoverImg from '../components/cover-image'

interface Props {
  readonly data: PageQueryData
}

interface HeaderProps {
  readonly title: string
  readonly image: any
}

const PostHeader: React.FC<HeaderProps> = ({title, image}) => {
  const headerImage = !!image && (
    <FullWidthContainer>
      <CoverImg fluid={image.childImageSharp.fluid} alt="Cover image" />
    </FullWidthContainer>
  )

  return (
    <header>
      {headerImage}
      <ContentWidth>
        <h1 className="page-header">{title}</h1>
      </ContentWidth>
    </header>
  )
}

const PostTemplate: React.FC<Props> = ({data}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <Head title={post.frontmatter.title} description={post.excerpt} keywords={post.frontmatter.keywords} />
      <article>
        <PostHeader title={post.frontmatter.title} image={post.frontmatter.coverImage} />
        <ContentWidth>
          <div dangerouslySetInnerHTML={{__html: post.html}} />
        </ContentWidth>
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
      excerpt(pruneLength: 2500)
      html
      frontmatter {
        title
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
