import React from 'react'
import {StaticQuery, graphql, Link} from 'gatsby'
import Img from 'gatsby-image'

import {GlobalStyle, styled} from '../styles/theme'
import ContentWidth from '../components/content-width'

const navHeight = '78px'
const StyledNav = styled.nav`
  height: ${navHeight};

  a.home {
    padding: 0 30px;
    position: fixed;
  }

  @media (max-width: 760px) {
    a.home {
      position: inherit;
      float: left;
    }
  }

  ul {
    list-style-type: none;
    text-align: right;
    height: ${navHeight};
  }

  li:last-child {
    margin-right: 0px;
  }

  li {
    display: inline-block;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 0px !important;
    font-size: 120%;
    line-height: ${navHeight};

    a {
      color: black;
      background: none;
    }
  }
`

const LogoWrapper = styled.div`
  padding: 10px;
  background-color: hsla(0, 100%, 100%, 50%);
  line-height: 0;
`
const Logo = styled(Img)``

const SiteLogo: React.FC = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: {eq: "jb.png"}) {
          childImageSharp {
            fixed(width: 40) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => (
      <LogoWrapper>
        <Logo fixed={data.file.childImageSharp.fixed} />
      </LogoWrapper>
    )}
  />
)

const StyledFooter = styled.footer`
  padding: 0 36px 36px;
  text-align: right;
`

interface Props {
  readonly title?: string
  readonly children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => (
  <>
    <GlobalStyle />
    <StyledNav className="navigation">
      <Link to={`/`} className="home">
        <SiteLogo />
      </Link>
      <ContentWidth>
        <ul>
          <li>
            <Link to={`/tags`}>Tags</Link>
          </li>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
        </ul>
      </ContentWidth>
    </StyledNav>
    <main className="content" role="main">
      {children}
    </main>
    <StyledFooter className="footer">
      © {new Date().getFullYear()},{` `}
      <a href="https://jmsbrdy.com">jmsbrdy.com</a>. Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </StyledFooter>
  </>
)

export default Layout
