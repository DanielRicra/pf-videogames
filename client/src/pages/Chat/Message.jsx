import { formatDistance } from 'date-fns'

const Message = ({ message, friendId }) => {
  return (
    <div
      className={message?.senderId === friendId ? 'self-start ' : 'self-end'}
    >
      <p>{message?.message}</p>
      <span className='text-sm'>
        {formatDistance(new Date(), new Date(message?.createdAt))}
      </span>
    </div>
  )
}
export default Message
