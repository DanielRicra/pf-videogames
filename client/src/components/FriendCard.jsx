import React, { useEffect, useState } from 'react';
import { getUserById } from '../services/userService';
import { useDispatch } from 'react-redux';
import { addFriend, acceptFriend, rejectFriend } from '../services/friendService';

const FriendCard = ({ friend, onAccept, onReject }) => {
  const { userId, status, user } = friend; // Cambiar friendId por userId
  const [friendDetails, setFriendDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch friend details using userId
    const fetchFriendDetails = async () => {
      try {
        setLoading(true);
        const response = await getUserById(userId);
        setFriendDetails(response);
        setLoading(false);
      } catch (error) {
        setError('Error fetching friend details');
        setLoading(false);
      }
    };

    fetchFriendDetails();
  }, [userId]);

  // Funciones para manejar acciones de amigos
  const handleAcceptFriend = async () => {
    try {
      await acceptFriend(user.email, friendDetails.email);
      // Lógica adicional si es necesario después de aceptar el amigo
      onAccept(friend);
    } catch (error) {
      setError('Error accepting friend');
    }
  };

  const handleRejectFriend = async () => {
    try {
      await rejectFriend(user.email, friendDetails.email);
      // Lógica adicional si es necesario después de rechazar el amigo
      onReject(friend);
    } catch (error) {
      setError('Error rejecting friend');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Resto del código para renderizar los detalles del amigo
  const { nickname, email } = friendDetails;

  return (
    <div className="flex items-center border rounded p-4 my-2">
      <div className="flex flex-col">
        <h3 className="font-medium text-xl">{nickname}</h3>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="ml-auto">
        {status === 'Pending' && (
          <>
            <button onClick={handleAcceptFriend} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              Accept
            </button>
            <button onClick={handleRejectFriend} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
