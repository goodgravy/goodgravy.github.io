import React from 'react'
import {StaticQuery, graphql, Link} from 'gatsby'
import Img from 'gatsby-image'

import {GlobalStyle, styled} from '../styles/theme'
import ContentWidth from '../components/content-width'

const navHeight = '78px'
const rightBorder = '36px'
const paddingNarrow = '15px'
const logoPadding = '10px'

const StyledNav = styled.nav`
  height: ${navHeight};

  a.home {
    padding: 0 30px;
    position: fixed;
    z-index: 10;
  }

  ul {
    padding: 0 ${rightBorder} 0 100px;
    text-align: right;
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

  @media (max-width: 760px) {
    a.home {
      padding-left: calc(${paddingNarrow} - ${logoPadding});
      position: inherit;
      float: left;
    }

    ul {
      padding-right: ${paddingNarrow};
    }
  }
`

const LogoWrapper = styled.div`
  padding: ${logoPadding};
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
  padding: 0 ${rightBorder} 36px;
  text-align: right;
`

interface Props {
  readonly title?: string
  readonly children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => (
  <div className="layout">
    <GlobalStyle />
    {/* ABSOLUTELY no idea why, but removing this ContentWidth component     */}
    {/* results in the classes of various rendered elements being different  */}
    {/* between server-side and browser-side rendering. This, in turn        */}
    {/* breaks a wide range of styling rules.                                */}
    <ContentWidth />
    <StyledNav className="navigation">
      <Link to={`/`} className="home">
        <SiteLogo />
      </Link>
      <ul>
        <li>
          <Link to={`/tags/`}>Tags</Link>
        </li>
        <li>
          <Link to={`/about/`}>About</Link>
        </li>
      </ul>
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
  </div>
)

export default Layout
