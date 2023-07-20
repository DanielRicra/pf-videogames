import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByEmail, selectUser } from '../redux/user/userSlice';
import { toTitleCase } from '../utils/helpers';
import FriendCard from '../components/FriendCard';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      dispatch(fetchUserByEmail(user.email));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    // Update pending friend requests when userState changes
    if (userState.pendingFriendRequests) {
      setPendingFriendRequests(userState.pendingFriendRequests);
    }
  }, [userState.pendingFriendRequests]);

  if (!isAuthenticated) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)]">
      {user && ( // Check if 'user' is defined
        <div className="flex font-serif bg-black bg-opacity-50 border-[0.2rem] rounded-[2rem] my-[5rem] m-[4rem] w-[55rem] h-[21.5rem] border-violet-500">
          <img
            className="h-[11rem] m-[5rem] border-[rem] rounded-[1rem]"
            src={user.picture}
            alt={user.name}
          />
          <div className="flex flex-col">
            <h2 className="mx-[1rem] font-serif text-[3rem] underline my-[3rem]">
              {toTitleCase(user.given_name)} {toTitleCase(user.family_name)}
            </h2>
            <h2 className="mx-[1rem] text-[1.5reem]">Nickname: {user.nickname}</h2>
            <h2 className="mx-[1rem] text-[1.5rem]">E-mail: {user.email}</h2>
          </div>
        </div>
      )}
 <div className="my-8">
        <h3 className="text-xl font-medium mb-4">Pending Friend Requests</h3>
        {pendingFriendRequests.length === 0 ? (
          <p>No pending friend requests.</p>
        ) : (
          pendingFriendRequests.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))
        )}
      </div>
    </div>
  );
};


export default Profile;
