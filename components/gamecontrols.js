import { createComponent } from 'cf-style-container';

const GameControls = createComponent(() => ({
  display: 'flex',
  position: 'absolute',
  top: '10px',
  right: '10px'
}));

export default GameControls;
