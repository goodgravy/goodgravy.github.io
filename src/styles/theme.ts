import styled, {css, createGlobalStyle} from 'styled-components'

export {css, styled}

export const theme = {
  colors: {
    black: '#000000',
    background: '#fffff8',
    contrast: '#111',
    contrastLightest: '#dad9d9',
    accent: 'red',
    white: '#ffffff',
  },
}

const reset = () => `
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0 !important;
  padding: 0;
}

::selection {
  background-color: ${theme.colors.contrastLightest};
  color: rgba(0, 0, 0, 0.70);
}

a.anchor, a.anchor:hover, a.anchor:link {
  background: none !important;
}

figure {
  a.gatsby-resp-image-link {
    background: none;
  }

  span.gatsby-resp-image-wrapper {
    max-width: 100% !important;
  }
}
`

// These style are based on https://edwardtufte.github.io/tufte-css/
const styles = () => `
body {
  background-color: white;
}

h1 {
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1;
}

h2 {
  margin-top: 2.1rem;
  margin-bottom: 1.4rem;
  line-height: 1;
}

h3 {
  margin-top: 2rem;
  margin-bottom: 1.4rem;
}

hr {
  display: block;
  height: 1px;
  width: 55%;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}

section {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

p,
ol,
ul {
  line-height: 2rem;
}

p {
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;
  padding-right: 0;
  vertical-align: baseline;
}

blockquote::before{
  font-family:Arial;
  content: "\u201C";
  color: hsl(230, 36%, 45%);
  font-size:4em;
  position: absolute;
  left: 10px;
  top:-10px;
}

blockquote {
  margin:50px 0 50px;
  font-style:italic;
  color: #555555;
  padding:1.2em 30px 1.2em 75px;
  border-left:8px solid hsl(230, 36%, 45%);
  line-height:1.6;
  position: relative;
  background:#EDEDED;
}

blockquote::after{
  content: '';
}

blockquote p {
  margin-right: 20px;
}

blockquote footer {
  width: 55%;
  font-size: 1.1rem;
  text-align: right;
}

section > p,
section > footer,
section > table {
  width: 55%;
}

section > ol,
section > ul {
  width: 50%;
  -webkit-padding-start: 5%;
}

li:not(:first-child) {
  margin-top: 0.25rem;
}

figure {
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  margin: 0 auto 3em auto;
  max-width: 640px;
}

figcaption {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.6;
  vertical-align: baseline;
}

figure.fullwidth figcaption {
  margin-right: 24%;
}

a { color:hsl(230, 36%, 45%); }
a:visited { color:hsl(230, 36%, 35%); }

img {
  max-width: 100%;
}

table.fullwidth {
  width: 100%;
}

.fullwidth {
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  position: relative;
  right: 50%;
  width: 100vw;
}

div.fullwidth figure { float: left }
div.fullwidth figure.five { width: 19%; margin-left: 1% }
div.fullwidth figure.four { width: 24%; margin-left: 1% }

div.table-wrapper {
  overflow-x: auto;
}

code {
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 1rem;
  line-height: 1.42;
}

h1 > code,
h2 > code,
h3 > code {
  font-size: 0.8em;
}

pre.code {
  font-size: 0.9rem;
  width: 52.5%;
  margin-left: 2.5%;
  overflow-x: auto;
}

pre.code.fullwidth {
  width: 90%;
}

.fullwidth {
  clear: both;
}

.iframe-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-cropper {
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
.profile-pic {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}

@media (max-width: 760px) {
  hr,
  section > p,
  section > footer,
  section > table {
    width: 100%;
  }

  pre.code {
    width: 97%;
  }

  section > ol {
    width: 90%;
  }

  section > ul {
    width: 90%;
  }

  figure {
    max-width: 90%;
  }

  div.fullwidth {
    width: 100%;
    position: inherit;
    margin: 0;
  }
  div.fullwidth figure { width: 100% !important }

  figcaption,
  figure.fullwidth figcaption {
    margin-right: 0%;
    max-width: none;
  }

  blockquote {
    width: 90%;
    margin-left: 1.5em;
    margin-right: 0em;
  }

  blockquote p,
  blockquote footer {
    width: 100%;
  }

  label.margin-toggle:not(.sidenote-number) {
    display: inline;
  }

  label {
    cursor: pointer;
  }

  div.table-wrapper,
  table {
    width: 85%;
  }

  img {
    width: 100%;
  }
}
`

export const GlobalStyle = createGlobalStyle`
${reset()}
${styles()}
`
