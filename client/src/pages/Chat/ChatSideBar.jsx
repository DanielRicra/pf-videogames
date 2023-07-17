const ChatSideBar = ({ friends }) => {
  return (
    <>
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
    </>
  )
}
export default ChatSideBar
