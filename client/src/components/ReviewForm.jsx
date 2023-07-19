import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { postReview } from '../redux/actions/reviewAction'
import { IconX } from '@tabler/icons-react'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../services/userService'
import useSWRImmutable from 'swr/immutable'
import { getReviewByVideogameId } from '../services/reviewService'

const ReviewForm = ({ videogameId, closeForm, onReviewSubmitted }) => {
  const [score, setScore] = useState(1)
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useAuth0()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUserId = async () => {
      if (isAuthenticated && user.email) {
        try {
          const userData = await getUser(user.email)
          setUserId(userData.id)
        } catch (error) {
          console.log('Error al obtener el userId:', error)
        }
      }
    }

    fetchUserId()
  }, [isAuthenticated, user])

  const { data: reviews, error: reviewError } = useSWRImmutable(videogameId, getReviewByVideogameId)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userReview = reviews?.find((review) => review.userId === userId)

    if (userReview) {
      setIsFormOpen(false)
    } else {
      const review = {
        videogameId,
        score,
        text,
        userId,
      }

      try {
        await dispatch(postReview(review))
        setScore(1)
        setText('')
        closeForm()
        onReviewSubmitted(true) // notifica a la libreria que se ha hecho submit de una review 
      } catch (error) {
        console.log('Error submitting review:', error)
      }
    }
  }

  if (reviewError) {
    return <div>Error al cargar las revisiones del videojuego.</div>
  }

  return (
    <div className='w-full bg-transparent py-8'>
      <div className='max-w-3xl mx-auto px-4 relative'>
        <button
          className='absolute top-2 right-2 text-red-600 hover:text-red-700 border-red-600 border-2 rounded-lg p-2'
          onClick={closeForm}
        >
          <IconX className='w-8 h-8' />
        </button>
        <h2 className='text-3xl font-semibold text-center mb-6'>Review</h2>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
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
              className={`text-${score === '10' ? '4xl' : '2xl'} font-semibold text-black ml-2`}
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
