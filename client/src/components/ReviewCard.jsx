import React from "react";

const ReviewCard = ({ review }) => {
  const { score, text } = review;

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Score: {score}</h3>
      </div>
      <p className="mt-2">{text}</p>
    </div>
  );
};

export default ReviewCard;
