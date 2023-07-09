import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postReview } from '../redux/actions/reviewAction'

const ReviewForm = ({ videogameId }) => {
  const [score, setScore] = useState(1)
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const review = {
      videogameId,
      score,
      text,
    }

    dispatch(postReview(review))

    // Reset form fields
    setScore(1)
    setText('')
  }

  return (
    <div className='w-full bg-transparent py-8'>
      <div className='max-w-3xl mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-center mb-6'>
          Leave a Review
        </h2>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg shadow-md'
        >
          <div className='flex items-center justify-center'>
            <input
              type='range'
              min='1'
              max='10'
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className='w-64'
            />
            <span
              className={`text-${
                score === '10' ? '4xl' : '2xl'
              } font-semibold text-black ml-2`}
            >
              {score}
            </span>
          </div>
          <div className='mt-4'>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Do you like this game?'
              className='w-full h-32 px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500'
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-purple-600 text-white px-4 py-2 mt-4 rounded-md hover:opacity-80'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
