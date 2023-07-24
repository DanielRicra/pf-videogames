/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectUser,
  fetchUserPendingFriendRequests,
  selectUserPendingFriendRequests,
} from '../redux/user/userSlice'
import { FriendCard, FriendCardSend } from '../components'
import { useUsers } from '../hooks/useUsers'

const Profile = () => {
  const userProfile = useSelector(selectUser)
  const { user, isAuthenticated } = useAuth0()
  const dispatch = useDispatch()
  const pendingFriendRequests = useSelector(selectUserPendingFriendRequests)
  const { users } = useUsers()

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      dispatch(fetchUserPendingFriendRequests(user.email))
    }
  }, [isAuthenticated, user])

  const filteredUsers = useMemo(
    () =>
      users?.results.filter(
        (u) =>
          u.email !== user?.email &&
          !pendingFriendRequests.find((friend) => friend.userId === u.id)
      ),
    [users?.results, user?.email, pendingFriendRequests]
  )

  const filteredPendingRequests = useMemo(
    () => pendingFriendRequests.filter((request) => !request.isMirror),
    [pendingFriendRequests]
  )

  return (
    <div className='flex flex-col min-h-[calc(100vh-180px)] p-7 lg:p-14'>
      {isAuthenticated && (
        <>
          <div className='flex flex-col mx-auto rounded-xl bg-[#232428] text-white overflow-hidden 2xl:min-w-[800px] xl:min-w-[600px] lg:min-w-[500px] md:min-w-[560px] sm:min-w-[90%] min-w-[300px]'>
            <div className='relative bg-purple-600 h-32 w-full'>
              <img
                className='h-36 w-36 rounded-full absolute -bottom-1/2 left-4 border-8 border-[#232428] object-cover'
                src={userProfile.picture}
                alt={userProfile.name}
              />
              <Link
                to='/profile/edit'
                className='bg-[rgba(0,0,0,0.25)] rounded-full absolute right-4 top-4 cursor-pointer flex p-2'
                title='Edit profile'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className=' h-6 w-6 text-white'
                >
                  <title>Edit</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                  />
                </svg>
              </Link>
            </div>
            <div className='flex flex-col m-4 bg-[#111214] rounded-xl mt-[calc(144px/2)] p-4 2xl:p-6'>
              <div className='flex flex-col items-start justify-start pb-4'>
                <h2 className='text-2xl xl:text-3xl font-bold capitalize'>
                  {`${userProfile.name}`}
                </h2>
                <span>{userProfile.nickname}</span>
              </div>
              <div className='border-b-[0.5px] border-[rgba(255,255,255,0.2)] mb-4' />
              <p className='text-base 2xl:text-[1.5rem] mb-6'>
                Email: {userProfile.email}
              </p>
            </div>
          </div>
        </>
      )}

      <div className='flex my-8 flex-wrap gap-4'>
        <div className='pr-4 bg-[#232428] rounded-xl p-4 flex-1 min-w-[260px]'>
          <h3 className='text-xl font-medium mb-4'>Pending Friend Requests:</h3>
          {Array.isArray(filteredPendingRequests) &&
          filteredPendingRequests.length === 0 ? (
            <p>No pending friend requests.</p>
          ) : (
            filteredPendingRequests.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))
          )}
        </div>
        <div className='pl-4 flex-1 bg-[#232428] rounded-xl p-4 min-w-[300px]'>
          <h3 className='text-xl font-medium mb-4'>Add Friends:</h3>
          {filteredUsers?.length === 0 ? (
            <p>No possible friends.</p>
          ) : (
            filteredUsers?.map((user) => (
              <FriendCardSend
                key={user.id}
                userId={user.id}
                userEmail={userProfile.email}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
