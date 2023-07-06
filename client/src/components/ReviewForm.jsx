import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../Redux/actions/reviewAction";

const ReviewForm = ({ videogameId }) => {
    const [score, setScore] = useState(1);
    const [text, setText] = useState("");
  
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const review = {
        videogameId,
        score,
        text,
      };
  
      dispatch(postReview(review));
  
      // Reset form fields
      setScore(1);
      setText("");
    };
  
    return (
      <div>
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Score:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <span>{score}</span>
          </div>
          <div>
            <label>Text:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default ReviewForm;