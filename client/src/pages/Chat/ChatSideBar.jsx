import { IconPointFilled } from '@tabler/icons-react'

const ChatSideBar = ({
  friends,
  handleJoinChat,
  selecteFriend,
  lastMessage,
}) => {
  return (
    <div className='flex flex-col gap-3 '>
      <div className='p-4'>
        <h2 className='text-2xl'>Chats</h2>
        <div className='my-2 border-b-2'>
          <input
            type='text'
            placeholder='search user...'
            className='p-2 px-4 text-black w-full'
          />
        </div>
      </div>
      {friends?.map((friend) => (
        <div
          className='flex gap-2 items-start cursor-pointer p-2'
          style={{
            backgroundColor:
              selecteFriend === Number(friend.friendId)
                ? '#8d8099'
                : 'transparent',
          }}
          key={friend.id}
          onClick={() =>
            handleJoinChat({
              idFriend: friend.friendId,
              idUser: friend.userId,
              friendShipId: friend.id,
            })
          }
        >
          <img
            src={friend.friendUser.picture}
            alt={friend.friendUser.name}
            className='w-8 h-8 rounded-full'
          />

          <div className='flex gap-0 flex-row justify-between w-full'>
            <div className='flex flex-col gap-0 '>
              <p className='text-[12px] font-bold'>{friend.friendUser.name}</p>
              <p className='text-xs'>{lastMessage?.message}</p>
            </div>

            <div className='flex flex-col justify-between'>
              <IconPointFilled size={'15px'} style={{ color: 'green' }} />
              <p className='text-xs'> 2h</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ChatSideBar
