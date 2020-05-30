import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

type StaticQueryData = {
  site: {
    siteMetadata: {
      description: string
      social: {
        github: string
      }
    }
  }
}

const Bio: React.FC = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            description
            social {
              github
            }
          }
        }
      }
    `}
    render={(data: StaticQueryData): React.ReactElement | null => {
      const {description, social} = data.site.siteMetadata
      return (
        <div>
          <h1>{description}</h1>
          <p>
            By James Brady
            <br />
            <a href={social.github}>GitHub</a>
          </p>
        </div>
      )
    }}
  />
)

export default Bio
