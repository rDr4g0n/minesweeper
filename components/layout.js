import Link from 'next/link';
import Head from 'next/head';
import { StyleProvider } from 'cf-style-nextjs';
import { createComponent } from 'cf-style-container';

const Center = createComponent(({ boardSize, theme }) => ({
  margin: '0px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: `${(boardSize * 40) + 2}px`
}));

const theme = {
    squareSize: 40
}

export default ({ children, title = 'Minesweeper', boardSize }) => (
  <StyleProvider>
    <Center boardSize={boardSize}>
      <h1>{title}</h1>
      {children}
    </Center>
  </StyleProvider>
);
