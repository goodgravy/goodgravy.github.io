import React from 'react'

import ContentWidth from './content-width'
import * as CSS from 'csstype'

const articleStyles: CSS.Properties = {
  marginTop: '80px',
}

const ContentArticle = ({children}) => {
  return (
    <article style={articleStyles}>
      <ContentWidth>{children}</ContentWidth>
    </article>
  )
}

export default ContentArticle
