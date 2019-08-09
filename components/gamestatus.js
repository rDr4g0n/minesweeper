import moment from "moment"
const GameStatus = ({count, duration, message}) => {
    const toFriendlyDuration = ms => moment.utc(moment.duration(ms).as("ms")).format("HH:mm:ss")
    return <div>
        <div>{count}</div>
        <div>{toFriendlyDuration(duration)}</div>
        <div>{message}</div>
    </div>
}

export default GameStatus
