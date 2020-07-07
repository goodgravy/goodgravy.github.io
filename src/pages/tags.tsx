import React from 'react'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

interface Props {
  readonly data: PageQueryData
}

const Tags: React.FC<Props> = ({data}) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <p>Tags page</p>
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

export default Tags
