import {Global} from '@emotion/react'
import font_light_ttf from './assets/fonts/Shabnam-FD.ttf'
import font_light_woff2 from './assets/fonts/Shabnam-FD.woff2'
import font_light_woff from './assets/fonts/Shabnam-FD.woff'
import font_light_eot from './assets/fonts/Shabnam-FD.eot'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
        @font-face {
        font-family: 'shabnam';
        font-weight: 400;
        src: url(${font_light_woff2}) format('woff2'), url(${font_light_woff}) format('woff'), url(${font_light_eot}) format('embedded-opentype'), url(${font_light_ttf}) format('truetype');
      }
      `}
  />
)

export default Fonts;
