import { createGlobalStyle } from "styled-components";
import CabinetRegular from "./fonts/CabinetGrotesk-Regular.ttf";
import CabinetMedium from "./fonts/CabinetGrotesk-Medium.ttf";
import CabinetBold from "./fonts/CabinetGrotesk-Bold.ttf";

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
    @font-face {
    font-family: 'Cabinet Grotesk';
    src: url(${CabinetRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
    }
    @font-face {
    font-family: 'Cabinet Grotesk';
    src: url(${CabinetMedium}) format('truetype');
    font-weight: medium;
    font-style: normal;
    }
    @font-face {
    font-family: 'Cabinet Grotesk';
    src: url(${CabinetBold}) format('truetype');
    font-weight: bold;
    font-style: normal;
    }
    * {
        box-sizing: border-box;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;

export default GlobalStyle;
