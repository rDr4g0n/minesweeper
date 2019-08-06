import { createComponent } from 'cf-style-container';

const Square = createComponent(
  ({ disabled, exploded }) => ({
    width: 40,
    height: 40,
    padding: 10,
    cursor: disabled ? 'initial' : 'pointer',
    backgroundColor: exploded ? "red" : disabled ? '#CCC' : '#FFF',
    border: `1px solid black`,
    lineHeight: 1,
    textAlign: 'center',
    fontSize: 18
  }),
  'div',
  ['onClick', 'onContextMenu']
);

export default Square;
