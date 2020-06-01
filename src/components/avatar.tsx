import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

type StaticQueryData = {
  site: {
    siteMetadata: {
      social: {
        gravatar: string
      }
    }
  }
}

const Avatar: React.FC = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            social {
              gravatar
            }
          }
        }
      }
    `}
    render={(data: StaticQueryData): React.ReactElement | null => {
      const {social} = data.site.siteMetadata
      return (
        <div className="image-cropper">
          <img src={social.gravatar} alt="avatar" className="profile-pic" />
        </div>
      )
    }}
  />
)

export default Avatar
