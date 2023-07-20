import React from 'react';

const FriendCard = ({ friend, onAccept, onReject }) => {
  const { friendUser } = friend;

  return (
    <div className="flex items-center border rounded p-4 my-2">
      <img
        className="h-12 w-12 rounded-full object-cover mr-4"
        src={friendUser.picture} // Assuming 'picture' is available in the user object
        alt={friendUser.name} // Assuming 'name' is available in the user object
      />
      <div className="flex flex-col">
        <h3 className="font-medium text-xl">
          {friendUser.given_name} {friendUser.family_name}
        </h3>
        <p className="text-gray-600">{friendUser.nickname}</p>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => onAccept(friend)}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(friend)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
