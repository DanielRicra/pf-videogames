import { useRef } from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

import Message from './Message'
import ChatSideBar from './ChatSideBar'
import { useAuth0 } from '@auth0/auth0-react'
import { getFriends } from '../../services/friendService'
import { addMessageToChat, findOrCreateChat } from '../../services/chatSevice'

const socket = io('http://localhost:3001/')

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [friends, setFriends] = useState([])
  const [friendChat, setFriendChat] = useState([])
  const [friendId, setFriendId] = useState()
  const [userId, setUserId] = useState()
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
    setFriendShipId(friendShipId)

    /* setFriendChat() */
    const message = await findOrCreateChat(friendShipId)
    setMessages(message[0].message)

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
    <div className='min-h-[calc(100vh-120px)] flex bg-gray-100 text-black'>
      <div className='flex flex-col w-1/4 p-4 h-full gap-2'>
        <ChatSideBar friends={friends} handleJoinChat={handleJoinChat} />
      </div>

      <div className='flex-1 flex flex-col h-[calc(100vh-120px)] justify-between overflow-hidden'>
        <div className='p-4 flex-1'>
          <div className='w-full flex flex-col items-center p-4'>
            <img
              src={user?.picture}
              className='w-16 h-16 object-cover rounded-full'
              alt={user?.name}
            />
            <h2>{user?.name}</h2>
          </div>

          <div className='flex flex-col overflow-y-auto max-h-[calc(100vh-320px)] gap-2'>
            {messages.map((message, i) => (
              <Message key={i} message={message} friendId={friendId} />
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
