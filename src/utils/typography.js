import Typography from 'typography'
import judahTheme from 'typography-theme-judah'

judahTheme.bodyFontFamily = ['Merriweather', 'serif']
judahTheme.googleFonts = [
  {
    name: 'Merriweather',
    styles: ['300', '300i', '400', '400i', '700', '700i'],
  },
  {
    name: 'Roboto Condensed',
    styles: ['400', '400i', '700', '700i'],
  },
]
judahTheme.bodyWeight = 300
judahTheme.headerWeight = 700

const typography = new Typography(judahTheme)

export default typography
