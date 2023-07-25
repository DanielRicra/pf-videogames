import { useState } from 'react'
import { addFriend } from '../services/friendService'
import { useUserById } from '../hooks/useUser'
import { toast } from 'sonner'

const FriendCardSend = ({ userId, userEmail, isPendingRequest, mutatePendingRequests }) => {
  const [isRequestSent, setIsRequestSent] = useState(isPendingRequest)
  const {
    user: friendDetails,
    isUserLoading: isFriendLoading,
    userError: friendError,
  } = useUserById(userId)

  const handleAddFriend = async () => {
    try {
      const confirmAdd = window.confirm(
        `Do you want to add ${friendDetails.nickname} as a friend?`
      )
      if (confirmAdd) {
        await addFriend(userEmail, friendDetails.email)
        setIsRequestSent(true)
        mutatePendingRequests()
        toast.success('Friend request sent')
      }
    } catch (error) { 
      toast.error('Something went wrong')
    }
  }

  if (isFriendLoading) {
    return <p>Loading...</p>
  }

  if (friendError) {
    return <p>Error: {friendError.message ?? 'Something went wrong'}</p>
  }

  const { nickname, email } = friendDetails

  return (
    <div className='flex items-center border rounded p-4 my-2'>
      <div className='flex flex-col'>
        <h3 className='font-medium text-xl'>{nickname}</h3>
        <p className='text-gray-300'>{email}</p>
      </div>
      <div className='ml-auto'>
        {!isRequestSent ? (
          <button
            onClick={handleAddFriend}
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
          >
            Add
          </button>
        ) : (
          <p className='text-green-500'>Request Sent</p>
        )}
      </div>
    </div>
  )
}

export default FriendCardSend
