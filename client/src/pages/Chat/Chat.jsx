import { useState } from 'react'
import { useRef } from 'react'
import { formatDistance } from 'date-fns'

const friends = [
  {
    id: 1,
    name: 'Friend 01',
    email: 'firend01@test.com',
    picture:
      'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100',
  },
  {
    id: 2,
    name: 'Test 02',
    email: 'XXXXXXXXXXXXXXX',
    picture:
      'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100',
  },
]

const initialMessages = [
  {
    id: 1,
    senderId: 1,
    message: 'Hey, how are you?',
    createdAt: '2023-07-14T08:00:00',
  },
  {
    id: 2,
    senderId: 2,
    message: 'Good, How about you?',
    createdAt: '2023-07-14T08:00:20',
  },
  {
    id: 3,
    senderId: 1,
    message: 'Great, How about you?',
    createdAt: '2023-07-14T08:00:40',
  },
  {
    id: 4,
    senderId: 2,
    message: 'Stop being so silly',
    createdAt: '2023-07-14T08:00:50',
  },
]

const currentUser = friends[0]

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages)
  const messageRef = useRef(null)
  const scrollToBottom = useRef(null)

  const sendMessage = (e) => {
    e.preventDefault()
    
    let message = messageRef.current.value
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        senderId: currentUser.id,
        message: message,
        createdAt: new Date().toISOString(),
      },
    ])
    messageRef.current.value = ''
    scrollToBottom.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='min-h-[calc(100vh-120px)] flex bg-gray-100 text-black'>
      <div className='flex flex-col w-1/4 p-4 h-full gap-2'>
        <h2 className='text-2xl'>Chats</h2>
        <div className='my-2'>
          <input
            type='text'
            placeholder='search user...'
            className='p-2 px-4 text-black w-full'
          />
        </div>
        <div className='flex flex-col gap-3'>
          {friends.map((friend) => (
            <div key={friend.id}>
              <div className='flex gap-2'>
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className='w-10 h-10 rounded-full'
                />
                <div>
                  <p>{friend.name}</p>
                  <p className='text-sm'>Last seen: 2 hours ago</p>
                </div>
              </div>
              <div>
                <p>Last message: Hey, how are you?</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex-1 flex flex-col h-[calc(100vh-120px)] justify-between overflow-hidden'>
        <div className='p-4 flex-1'>
          <div className='w-full flex flex-col items-center p-4'>
            <img
              src={currentUser.picture}
              className='w-16 h-16 object-cover rounded-full'
              alt={currentUser.name}
            />
            <h2>{currentUser.name}</h2>
          </div>

          <div className='flex flex-col overflow-y-auto max-h-[calc(100vh-320px)] gap-2'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.senderId === currentUser.id
                    ? 'self-end'
                    : 'self-start'
                }
              >
                <p>{message.message}</p>
                <span className='text-sm'>
                  {formatDistance(new Date(), new Date(message.createdAt))}
                </span>
              </div>
            ))}
            <div ref={scrollToBottom} />
          </div>
        </div>

        <form className='flex'>
          <textarea
            ref={messageRef}
            cols={1}
            placeholder='Type a message...'
            className='w-full p-2 px-4 border-2 border-purple-500 resize-none rounded-md max-h-12'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(e)
              }
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default Chat
