import { createComponent } from 'cf-style-container';
import Mine from './mine';
import Flag from './flag';

const styles = ({ revealed, exploded }) => ({
  width: 40,
  height: 40,
  padding: 10,
  cursor: revealed ? 'initial' : 'pointer',
  backgroundColor: exploded ? 'rgba(255, 20, 147, 0.3)' : revealed ? '#222' : '#555',
  color: exploded ? 'black' : 'limegreen',
  border: `1px solid #000`,
  lineHeight: 1,
  textAlign: 'center',
  fontSize: 18
});

const Square = ({
  revealed,
  flagged,
  mine,
  count,
  peek,
  exploded,
  ...props
}) => {
  return (
    <div {...props}>
      {!revealed && flagged && <Flag />}
      {(peek || revealed) && mine && !flagged && <Mine />}
      {(revealed) && !mine && !!count && count}
    </div>
  );
};

export default createComponent(styles, Square, [
  'revealed',
  'flagged',
  'mine',
  'count',
  'peek',
  'exploded',
  'onClick',
  'onContextMenu'
]);
