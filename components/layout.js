import Link from 'next/link';
import Head from 'next/head';
import { StyleProvider } from 'cf-style-nextjs';
import { createComponent } from 'cf-style-container';

const Center = createComponent(({ boardSize, theme }) => ({
  margin: '0px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: `${boardSize * 40 + 2}px`
}));

const titleStyle = {
  textTransform: 'uppercase',
  margin: '0 0 -60px 0',
  fontSize: '90px',
  color: 'rgba(255, 255, 255, 0.1)'
};

export default ({ children, title = 'Minesweeper', boardSize }) => (
  <StyleProvider>
    <Center boardSize={boardSize}>
      <h1 style={titleStyle}>{title}</h1>
      {children}
    </Center>
  </StyleProvider>
);
