import React from 'react'
import {graphql} from 'gatsby'
import Obfuscate from 'react-obfuscate'

import Avatar from '../components/avatar'
import Layout from '../components/layout'
import Head from '../components/head'
import {ContentArticle} from '../components/content-article'

interface Props {
  readonly data: PageQueryData
}

const About: React.FC<Props> = ({data}) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <Head title="About James Brady" keywords={[`blog`, `goodgravy`, `jmsbrdy`, `james brady`]} />
      <ContentArticle className="body">
        <Avatar />
        <p>
          Hello! I’m a <a href="/tags/tech/">technology leader</a> with a background in software engineering.
        </p>
        <h3>Outside of tech</h3>
        <p>
          I&apos;m a hobbyist <a href="/tags/woodwork/">woodworker</a>, I’m learning to speak Catalan, I like hiking{' '}
          <strong>up</strong> hills and mountain biking <strong>down</strong> them. I play the trumpet poorly. I enjoy
          hard problems and learning new things with which to solve them.
        </p>
        <p>
          My current interests are <a href="https://jamesclear.com/atomic-habits">Atomic Habits</a>,{' '}
          <a href="https://en.wikipedia.org/wiki/Zettelkasten">Zettlekasten</a>, and trying to catch up on 2,000 years
          of ethical theory.
        </p>
        <p>
          I live in <a href="https://goo.gl/maps/f1U1Ke241Uv4n24Q6">Oristà</a>, a micro-village in rural Catalunya. My
          wife, Odette, is an author and creativity coach. Together, we operate an artist&apos;s retreat called{' '}
          <a href="https://celdelnord.com/">Cel del Nord</a>.
        </p>
        <h3>Remote work</h3>
        <p>
          I have worked as a part of a distributed team for 12 years, and have been 100% remote since December 2016.
        </p>
        <p>
          The tectonic shift in working patterns forced upon us by the Covid-19 pandemic has made learning and sharing
          even more important in this area.
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
