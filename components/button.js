import { createComponent } from 'cf-style-container';

const Button = createComponent(
  ({ inline }) => ({
    fontSize: inline ? 'inherit' : '24px',
    color: 'aqua',
    border: 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: inline ? '0' : '4px 10px',
    background: 'transparent'
  }),
  'button',
  ['onClick']
);

export default Button;
