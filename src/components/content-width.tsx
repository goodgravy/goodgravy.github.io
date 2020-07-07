import React from 'react'

import {styled} from '../styles/theme'

const breakpointWidth = `760px`

const Wrapper = styled.div`
  margin: 0 0 0 100px;

  @media (max-width: ${breakpointWidth}) {
    margin: 0 15px;
  }
`

const Inner = styled.div`
  max-width: 35em;
  margin: 0 auto;
  @media (max-width: ${breakpointWidth}) {
    max-width: 100%;
  }
`

const ContentWidth: React.FC = ({children}) => (
  <Wrapper className="wrapper">
    <Inner className="inner">{children}</Inner>
  </Wrapper>
)

export default ContentWidth
