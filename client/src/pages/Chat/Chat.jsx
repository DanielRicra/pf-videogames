import { useEffect, useState } from 'react'
import { useRef } from 'react'
import ChatSideBar from './ChatSideBar'
import Message from './Message'
import io from 'socket.io-client'
import { useAuth0 } from '@auth0/auth0-react'
import { getFriends } from '../../services/friendService'
import { findOrCreateChat } from '../../services/chatSevice'

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
const socket = io('http://localhost:3001/')

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [friends, setFriends] = useState([])
  const [friendId, setFriendId] = useState()
  const [userId, setUserId] = useState()

  const messageRef = useRef(null)
  const scrollToBottom = useRef(null)
  const { user, isAuthenticated } = useAuth0()

  useEffect(() => {
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      Friends()
    }
  }, [user])

  const Friends = async () => {
    const { results } = await getFriends(user.email)
    setFriends(results)
  }

  const handleJoinChat = async ({ idUser, idFriend, friendShipId }) => {
    setUserId(idUser)
    setFriendId(idFriend)
    /* const { message } = await findOrCreateChat(friendShipId)
     setMessages((prevMessages) => [...prevMessages, message]) */
    socket.emit('join', userId)
  }

  const receiveMessage = (message) => {
    let newMessage = {
      senderId: message.from,
      message: message.message,
      createdAt: new Date().toISOString(),
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  const sendMessage = (e) => {
    e.preventDefault()
    let message = messageRef.current.value
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        from: userId,
        to: friendId,
        message: message,
        createdAt: new Date().toISOString(),
      },
    ])
    messageRef.current.value = ''
    socket.emit('message', { message, from: userId, to: friendId })
  }

  return (
    <div className='min-h-[calc(100vh-120px)] flex bg-gray-100 text-black'>
      <div className='flex flex-col w-1/4 p-4 h-full gap-2'>
        <ChatSideBar friends={friends} handleJoinChat={handleJoinChat} />
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
            {messages.map((message, i) => (
              <Message key={i} message={message} currentUser={friendId} />
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
