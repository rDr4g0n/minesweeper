import { createComponent } from 'cf-style-container';
import moment from 'moment';

const Message = createComponent(props => ({
  fontSize: '1.4em',
  fontWeight: 'bold',
  textShadow: '0 0 10px black'
}));

const styles = props => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '2px 6px'
});

const GameStatus = ({ count, duration, className, children }) => {
  const toFriendlyDuration = ms =>
    moment.utc(moment.duration(ms).as('ms')).format('HH:mm:ss');
  return (
    <div className={className}>
      <div>{count} Mines</div>
      <Message>{children}</Message>
      <div>{toFriendlyDuration(duration)}</div>
    </div>
  );
};

export default createComponent(styles, GameStatus, [
  'count',
  'duration',
  'message'
]);
