import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`

  :root {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${ ({theme}) => theme.COLORS.BACKGROUND_800 };
    color: ${ ({theme}) => theme.COLORS.WHITE };
  }

  body, input, button, textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 1.6rem;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter .2s;
  }

  button:hover, a:hover {
    filter: brightness(.9)
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 .5rem ${ ({theme}) => theme.COLORS.GRAY_100 };
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background: ${ ({theme}) => theme.COLORS.ORANGE };
    border-radius: 10px;
  }

`

