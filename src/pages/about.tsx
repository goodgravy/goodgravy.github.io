import React from 'react'
import {graphql} from 'gatsby'
import Obfuscate from 'react-obfuscate'

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
      <Head title="About James Brady" keywords={[`blog`, `goodgravy`, `jmsbrdy`, `james brady`]} />
      <ContentArticle>
        <Avatar />
        <p>
          Hello! I’m a <a href="/tags/tech/">software engineer</a> by trade and a{' '}
          <a href="/tags/woodwork/">woodworker</a> for fun.
        </p>
        <p>I like hard problems and learning new things with which solve them.</p>
        <p>
          I’m learning to speak Catalan. I like hiking <strong>up</strong> hills and mountain biking{' '}
          <strong>down</strong> them. I play the trumpet poorly.
        </p>
        <p>
          I live in <a href="https://goo.gl/maps/f1U1Ke241Uv4n24Q6">Oristà</a>, a micro-village in rural Catalunya. My
          wife, Odette, is an author and creativity coach. Together, we operate an artist&apos;s retreat called{' '}
          <a href="https://celdelnord.com/">Cel del Nord</a>.
        </p>
        <h3>Contacting me</h3>
        <p>I would love to hear from you if:</p>
        <ul>
          <li>You liked something I&apos;ve posted on this blog</li>
          <li>You didn&apos;t like something I&apos;ve posted on this blog</li>
          <li>You&apos;re working on something I seem to be interested in</li>
          <li>You&apos;d like to work together</li>
        </ul>
        <p>
          I&apos;m not looking for career opportunities, so please don&apos;t contact me if you&apos;re a recruiter.
          Thanks!
        </p>
        <p>
          Email: <Obfuscate email="james@jmsbrdy.com" />.
        </p>
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
