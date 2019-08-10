import { createComponent } from 'cf-style-container';
import moment from 'moment';

const MineCount = createComponent(props => ({
  fontWeight: "bold",
}));
const GameDuration = createComponent(props => ({
  color: "#CCC"
}));

const styles = props => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: "100%",
  backgroundColor: "#333",
  padding: "2px 6px",
  color: "white",
});

const GameStatus = ({ count, duration, message, className }) => {
  const toFriendlyDuration = ms =>
    moment.utc(moment.duration(ms).as('ms')).format('HH:mm:ss');
  return (
    <div className={className}>
      <MineCount>{count} Mines</MineCount>
      <div>{message}</div>
      <GameDuration>{toFriendlyDuration(duration)}</GameDuration>
    </div>
  );
};

export default createComponent(styles, GameStatus, [
  'count',
  'duration',
  'message'
]);
