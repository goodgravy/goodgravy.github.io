import React from 'react'

import {styled} from '../styles/theme'
import ContentWidth from './content-width'

const Article = styled.article`
  margin-top: 100px;
`

const ContentArticle = ({children}) => {
  return (
    <Article>
      <ContentWidth>{children}</ContentWidth>
    </Article>
  )
}

export default ContentArticle
