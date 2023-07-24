import { formatDistance } from 'date-fns'

const Message = ({ message, friendId }) => {
  return (
    <div
      className={`py-2 px-4 ${
        message?.senderId === friendId
          ? 'self-start bg-white text-purple-800 rounded-tr-lg rounded-bl-lg rounded-br-lg'
          : 'self-end bg-purple-800 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg'
      }`}
    >
      <p>{message?.message}</p>
      <span className='text-xs'>
        {formatDistance(new Date(), new Date(message?.createdAt))}
      </span>
    </div>
  )
}
export default Message
