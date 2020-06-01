import React from 'react'
import {StaticQuery, graphql, Link} from 'gatsby'
import {GlobalStyle, styled} from '../styles/theme'
import Img from 'gatsby-image'

const StyledNav = styled.nav`
  a.home {
    float: left;
    padding: 10px 30px;
    position: fixed;
  }

  @media (max-width: 760px) {
    a.home {
      position: inherit;
    }
  }

  ul {
    list-style-type: none;
    margin: 0 0 0 100px;
    padding: 0;
  }

  li:first-child {
    margin-left: 0px;
  }

  li {
    display: inline-block;
    margin: 16px;

    a {
      background: none;
    }
  }
`

const StyledFooter = styled.footer`
  padding-bottom: 36px;
`

interface Props {
  readonly title?: string
  readonly children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => (
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
      <>
        <GlobalStyle />
        <StyledNav className="navigation">
          <Link to={`/`} className="home">
            <Img fixed={data.file.childImageSharp.fixed} />
          </Link>
          <ul>
            <li>
              <Link to={`/tags`}>Tags</Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
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
      </>
    )}
  />
)

export default Layout
