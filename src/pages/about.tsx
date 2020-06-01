import React from 'react'
import {graphql} from 'gatsby'

import Avatar from '../components/avatar'
import ContentArticle from '../components/content-width'
import Layout from '../components/layout'
import Head from '../components/head'

interface Props {
  readonly data: PageQueryData
}

const About: React.FC<Props> = ({data}) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <Head title="About James Brady" keywords={[`blog`, `goodgravy`, `jmsbrdy`]} />
      <ContentArticle>
        <Avatar />
        <p>I’m a software engineer by trade and a woodworker for fun.</p>
        <p>I like hard problems and learning new things with which solve them.</p>
        <p>
          I’m learning to speak Catalan. I like hiking up hills and mountain biking down them. I play the trumpet
          poorly.
        </p>
        <p>That is all. </p>
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
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default About
