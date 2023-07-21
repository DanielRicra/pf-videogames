import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByEmail, selectUser } from '../redux/user/userSlice';
import { toTitleCase } from '../utils/helpers';
import FriendCard from '../components/FriendCard';
import FriendCardSend from '../components/FriendCardSend';
import { getUsers } from '../services/userService';
import { addFriend, getPendingFriendRequests } from '../services/friendService';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      dispatch(fetchUserByEmail(user.email));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (userState.pendingFriendRequests) {
      setPendingFriendRequests(userState.pendingFriendRequests);
    }
  }, [userState.pendingFriendRequests]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getUsers();
        setAllUsers(response.results);
        console.log('All Users:', response.results);

        const filtered = response.results.filter(
          (u) =>
            u.email !== user.email &&
            !userState.pendingFriendRequests.find((friend) => friend.userId === u.id)
        );
        setFilteredUsers(filtered);
        console.log('Filtered Users:', filtered);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, [user.email, userState.pendingFriendRequests]);

  useEffect(() => {
    const fetchPendingFriendRequests = async () => {
      try {
        if (isAuthenticated && user?.email) {
          const requestsFromOthers = await getPendingFriendRequests(user.email);
          // Filtrar las solicitudes espejo para que no se muestren en el perfil
          const nonMirrorRequests = requestsFromOthers.filter((request) => !request.isMirror);
          setPendingFriendRequests(nonMirrorRequests || []);
        }
      } catch (error) {
        console.error('Error fetching pending friend requests:', error);
      }
    };

    fetchPendingFriendRequests();
  }, [isAuthenticated, user]);

  const handleAddFriend = async (friendEmail) => {
    try {
      const confirmAdd = window.confirm(`¿Deseas agregar a ${friendEmail} como amigo?`);
      if (confirmAdd) {
        await addFriend(user.email, friendEmail);
        const updatedFilteredUsers = filteredUsers.filter((user) => user.email !== friendEmail);
        setFilteredUsers(updatedFilteredUsers);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to view this page.</p>;
  }

  const filteredPendingRequests = pendingFriendRequests.filter((request) => !request.isMirror);

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)]">
      {user && (
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
        {Array.isArray(filteredPendingRequests) && filteredPendingRequests.length === 0 ? (
          <p>No pending friend requests.</p>
        ) : (
          filteredPendingRequests.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))
        )}
      </div>

      <div className="my-8">
        <h3 className="text-xl font-medium mb-4">Possible Friends</h3>
        {filteredUsers.length === 0 ? (
          <p>No possible friends.</p>
        ) : (
          filteredUsers.map((user) => (
            <FriendCardSend key={user.id} userId={user.id} userEmail={userState.email} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
