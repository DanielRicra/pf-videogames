import React, { useEffect, useState } from 'react';
import { getUserById } from '../services/userService';
import { useDispatch } from 'react-redux';
import { addFriend } from '../services/friendService';

const FriendCardSend = ({ userId }) => {
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

  const handleAddFriend = async () => {
    try {
      await addFriend(user.email, friendDetails.email);
      // Lógica adicional si es necesario después de agregar el amigo
      // Por ejemplo, actualizar la lista de posibles amigos.
    } catch (error) {
      setError('Error adding friend');
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
        <button onClick={handleAddFriend} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </div>
    </div>
  );
};

export default FriendCardSend;
