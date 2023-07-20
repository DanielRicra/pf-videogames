import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { getPendingFriendRequests } from '../api'; // Import the API function to get pending friend requests
import { toTitleCase } from '../utils/helpers';
import FriendCard from '../components/FriendCard';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch pending friend requests when the component mounts
    fetchPendingFriendRequests();
  }, []);

  const fetchPendingFriendRequests = async () => {
    try {
      const response = await getPendingFriendRequests(user.email); // Assuming 'user.email' contains the user's email
      setPendingFriendRequests(response.data.results);
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
    }
  };

  const handleAcceptFriend = async (friend) => {
    // Logic to accept the friend request using an API function
    // Implement this function using the API endpoint and logic to accept the friend request
    console.log('Accept friend request:', friend);
  };

  const handleRejectFriend = async (friend) => {
    // Logic to reject the friend request using an API function
    // Implement this function using the API endpoint and logic to reject the friend request
    console.log('Reject friend request:', friend);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)]">
      {isAuthenticated && (
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
            <h2 className="mx-[1rem] text-[1.5rem]">Nickname: {user.nickname}</h2>
            <h2 className="mx-[1rem] text-[1.5rem]">E-mail: {user.email}</h2>
          </div>
        </div>
      )}

      {/* Display pending friend requests */}
      <div className="my-8">
        <h3 className="text-xl font-medium mb-4">Pending Friend Requests</h3>
        {pendingFriendRequests.map((friend) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            onAccept={handleAcceptFriend}
            onReject={handleRejectFriend}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
