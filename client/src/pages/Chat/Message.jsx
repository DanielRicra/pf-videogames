import { formatDistance } from 'date-fns'

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={
        message.senderId === currentUser.id ? 'self-end' : 'self-start'
      }
    >
      <p>{message.message}</p>
      <span className='text-sm'>
        {formatDistance(new Date(), new Date(message.createdAt))}
      </span>
    </div>
  )
}
export default Message
