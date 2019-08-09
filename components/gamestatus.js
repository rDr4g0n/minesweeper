import moment from "moment"
const GameStatus = ({count, duration, message}) => {
    // TODO - format hour:minute:ss
    const toFriendlyDuration = ms => moment.duration(ms).humanize()
    // TODO - format time
    return <div>
        <div>{count}</div>
        <div>{toFriendlyDuration(duration)}</div>
        <div>{message}</div>
    </div>
}

export default GameStatus
