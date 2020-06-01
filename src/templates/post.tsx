import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'

import {styled} from '../styles/theme'
import ContentWidth from '../components/content-width'
import Layout from '../components/layout'
import Head from '../components/head'

interface Props {
  readonly data: PageQueryData
}

interface HeaderProps {
  readonly title: string
  readonly image: any
}

const FullWidthDiv = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 25em;
`

const CoverImg = styled(Img)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -10;
`

const PostHeader: React.FC<HeaderProps> = ({title, image}) => {
  const headerImage = !!image && (
    <FullWidthDiv>
      <CoverImg fluid={image.childImageSharp.fluid} alt="Cover image" />
    </FullWidthDiv>
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
