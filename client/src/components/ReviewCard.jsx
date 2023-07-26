import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { getUser } from '../services/userService';

const ReviewCard = ({ review }) => {
  const { score, text, userId, createdAt } = review;
  const [nickname, setNickname] = useState("");
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchNickname = async () => {
      if (isAuthenticated && user.email) {
        try {
          const userData = await getUser(user.email);
          setNickname(userData.nickname);
        } catch (error) {
          console.log('Error al obtener el nickname:', error);
        }
      }
    };

    fetchNickname();
  }, [isAuthenticated, user]);

  return (
    <div className="bg-violet-900 p-4 mb-4 border border-violet-700 rounded-lg shadow-md flex w-1">
      <div className="flex flex-grow w-85"> {/* Aquí ajustamos el tamaño de la caja del texto */}
        <div className="flex flex-col flex-grow">
          {nickname && (
            <span className="text-white text-xl font-bold mb-1">{nickname}</span>
          )}
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <p className="text-white font-bold">{text}</p>
          </div>
          <span className="text-white text-sm mt-1">
            {createdAt && new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end text-white text-xl font-bold ml-4">
        {/* Agregamos una caja invisible para el score */}
        <div className="invisible">{`Score: ${score}`}</div>
        {/* Luego, podemos mostrar el score aquí */}
        {score}
      </div>
    </div>
  );
};

export default ReviewCard;