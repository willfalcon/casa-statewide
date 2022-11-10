import { css } from 'styled-components';

const theme = {
  blue: '#003362',
  lightBlue: '#058FFB',
  red: '#CC022E',
  gray: '#6A7883',
  light: '#E0E0E0',
  lighter: '#EEF2F6',
  offWhite: '#F1F5F8',
  font: {
    family: 'brandon-grotesque, sans-serif',
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900',
  },
  sizes: {
    break: 768,
    large: 1024,
    content: 900,
    wide: 1200,
    header: 150,
  },
};

const media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export { media };
export default theme;
