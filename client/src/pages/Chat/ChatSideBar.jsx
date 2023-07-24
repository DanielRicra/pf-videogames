import { IconPointFilled } from '@tabler/icons-react'

const ChatSideBar = ({ friends, handleJoinChat }) => {
  return (
    <>
      <h2 className='text-2xl'>Chats</h2>
      <div className='my-2 border-b-2'>
        <input
          type='text'
          placeholder='search user...'
          className='p-2 px-4 text-black w-full'
        />
      </div>
      <div className='flex flex-col gap-3 '>
        {friends?.map((friend) => (
          <div
            className='flex gap-2 items-start active:bg-violet-200 focus:outline-none focus:ring focus:ring-violet-300 cursor-pointer'
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
                <p className='text-[12px] font-bold'>
                  {friend.friendUser.name}
                </p>
                <p className='text-xs'>Hey, how are you?</p>
              </div>

              <div className='flex flex-col justify-between'>
                <IconPointFilled size={'15px'} style={{ color: 'green' }} />
                <p className='text-xs'> 2h</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default ChatSideBar
