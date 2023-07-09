import React from "react";

const ReviewCard = ({ review }) => {
  const { score, text } = review;

  return (
    <div className="bg-violet-900 p-4 mb-4 border border-violet-700 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Score: {score}</h3>
      </div>
      <p className="mt-2 text-white font-bold">{text}</p>
    </div>
  );
};

export default ReviewCard;
