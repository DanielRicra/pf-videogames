import { acceptFriend, rejectFriend } from '../services/friendService'
import { useUserById } from '../hooks/useUser'
import { toast } from 'sonner'

const FriendCard = ({ friend, mutatePendingRequests, mutateFriends }) => {
  const { user } = friend
  const { user: friendDetails, isUserLoading, userError } = useUserById(friend.userId)

  const handleAcceptFriend = async () => {
    try {
      await acceptFriend(user.email, friendDetails.email)
      toast.success('Friend request accepted')
      mutatePendingRequests()
      mutateFriends()
    } catch (error) { 
      toast.error('Something went wrong')
    }
  }

  const handleRejectFriend = async () => {
    try {
      await rejectFriend(user.email, friendDetails.email)
      toast.success('Friend request rejected')
      mutatePendingRequests()
    } catch (error) { 
      toast.error('Something went wrong')
    }
  }

  if (isUserLoading) {
    return <p>Loading...</p>
  }

  if (userError) {
    return <p>Error: {userError.message ?? 'Something went wrong'}</p>
  }

  const { nickname, email } = friendDetails

  return (
    <div className='flex items-center border rounded p-4 my-2'>
      <div className='flex flex-col'>
        <h3 className='font-medium text-xl'>{nickname}</h3>
        <p className='text-gray-300'>{email}</p>
      </div>
      <div className='ml-auto'>
        {friend.status === 'Pending' && (
          <>
            <button
              onClick={handleAcceptFriend}
              className='bg-green-600 text-white px-4 py-2 rounded-md mr-2 hover:opacity-90'
            >
              Accept
            </button>
            <button
              onClick={handleRejectFriend}
              className='bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90'
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FriendCard
