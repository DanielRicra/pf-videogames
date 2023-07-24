import { useRef } from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { IconSend } from '@tabler/icons-react'

import Message from './Message'
import ChatSideBar from './ChatSideBar'
import { useAuth0 } from '@auth0/auth0-react'
import { getFriends } from '../../services/friendService'
import { addMessageToChat, findOrCreateChat } from '../../services/chatSevice'
import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL
const socket = io(API_URL)

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [friends, setFriends] = useState([])
  const [friendId, setFriendId] = useState()
  const [userId, setUserId] = useState(null)
  const [friendShipId, setFriendShipId] = useState()

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
    setTimeout(() => {
      scrollToBottom.current.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [messages])

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
    socket.emit('join', idUser)
    setUserId(idUser)
    setFriendId(idFriend)
    setFriendShipId(friendShipId)

    const message = await findOrCreateChat(friendShipId)
    setMessages(message[0].message)
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
    if (userId === null) {
      toast.error('select a Friend')
    }
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

    addMessageToChat({
      message: {
        message,
        senderId: userId,
        from: userId,
        to: friendId,
        id: messages.length,
        createdAt: new Date().toISOString(),
      },
      friendShipId,
    })
  }

  return (
    <div className='min-h-[calc(100vh-120px)] p-2 m-2 flex bg-gray-100 text-black'>
      <div className='flex flex-col w-1/6 p-4  h-auto gap-2 bg-white shadow-md shadow-'>
        <ChatSideBar friends={friends} handleJoinChat={handleJoinChat} />
      </div>

      <div className='flex-1 flex flex-col h-[calc(100vh-100px)] justify-between overflow-hidden py-3 px-4'>
        <div className='p-4 flex-1'>
          <div className='w-full flex flex-col items-center p-4'>
            <img
              src={user?.picture}
              className='w-16 h-16 object-cover rounded-full'
              alt={user?.name}
            />
            <h2>{user?.name}</h2>
          </div>

          <div className='flex flex-col overflow-y-auto max-h-[calc(100vh-320px)] gap-2 pr-3'>
            {messages.map((message, i) => (
              <Message key={i} message={message} friendId={friendId} />
            ))}
            <div ref={scrollToBottom} />
          </div>
        </div>

        <form className='flex relative'>
          <textarea
            ref={messageRef}
            cols={1}
            disabled={userId === null ? true : false}
            placeholder='Type a message...'
            className='w-full p-2 px-4 border-2 border-purple-500 resize-none rounded-md max-h-12'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(e)
              }
            }}
          />
          <button
            disabled={userId === null ? true : false}
            onClick={(e) => sendMessage(e)}
            className='cursor-pointer disabled:cursor-not-allowed'
          >
            <IconSend className='absolute right-2 bottom-3 text-purple-500' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
