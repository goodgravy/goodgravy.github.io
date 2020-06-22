import React from 'react'
import {Link} from 'gatsby'
import Img from 'gatsby-image'

import {styled} from '../styles/theme'

interface PostPreview {
  readonly node: {
    readonly excerpt: string
    readonly fields: {
      readonly slug: string
    }
    readonly frontmatter: {
      readonly date: string
      readonly title: string
      readonly thumbnail: {
        readonly childImageSharp: {
          fluid: any
        }
      }
      readonly staticThumbnail: string
    }
  }
}

interface PostExcerptProps {
  title: string
  PostPreview
}

interface ThumbProps {
  readonly thumbnail: {
    readonly childImageSharp: {
      fluid: any
    }
  }
  readonly staticThumbnail: string
}

const StyledPostExcerpt = styled.div`
  margin-bottom: 3em;
  overflow: auto;

  h3 {
    a,
    a:visited {
      color: hsl(230, 50%, 45%);
    }
  }
`

const Thumbnail: React.FC<ThumbProps> = ({thumbnail, staticThumbnail}) => {
  if (thumbnail) return <StyledThumbnail fluid={thumbnail.childImageSharp.fluid} />
  if (staticThumbnail) return <StyledStaticThumbnail src={staticThumbnail} />
  return null
}
const thumbnailStyles = `
  width: 256px;
  float: right;
  margin-left: 1em;

  @media (max-width: 760px) {
    width: 150px;
  }
`
const StyledThumbnail = styled(Img)`
  ${thumbnailStyles}
`
const StyledStaticThumbnail = styled.img`
  ${thumbnailStyles}
`

const PostExcerpt: React.FC<PostExcerptProps> = ({node, title}) => {
  return (
    <StyledPostExcerpt>
      <Thumbnail thumbnail={node.frontmatter.thumbnail} staticThumbnail={node.frontmatter.staticThumbnail} />
      <h3>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <p dangerouslySetInnerHTML={{__html: node.excerpt}} />
    </StyledPostExcerpt>
  )
}

export default PostExcerpt
