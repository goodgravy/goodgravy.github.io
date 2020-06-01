import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'

import {styled} from '../styles/theme'
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

const PostHeader: React.FC<HeaderProps> = ({title, image}) => {
  const headerImage = !!image && (
    <FullWidthDiv>
      <Img
        fluid={image.childImageSharp.fluid}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
        alt="Cover image"
      />
    </FullWidthDiv>
  )

  return (
    <header>
      {headerImage}
      <h1 className="page-header">{title}</h1>
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
        <div className={`page-content`}>
          <div dangerouslySetInnerHTML={{__html: post.html}} />
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
