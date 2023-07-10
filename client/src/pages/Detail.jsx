import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IconHeart } from '@tabler/icons-react'
import { IconShoppingCartPlus } from '@tabler/icons-react'
import Footer from '../components/Footer'
import { ReviewCard, ReviewForm } from '../components'
import { fetchReviews, postReview } from '../redux/actions/reviewAction'
import axios, { AxiosError } from 'axios'
import Loading from '../components/Loading'

const Detail = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const reviews = useSelector((state) => state.review.reviews || [])
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    dispatch(fetchReviews(id))

    const fetchVideogameById = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios(`http://localhost:3001/videogames/${id}`)

        setGame(response.data)
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.error ?? 'Something when wrong!')
        } else {
          setError(error.message ?? 'Something when wrong!')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchVideogameById()
  }, [dispatch, id])

  // const handleSubmitReview = (review) => {
  //   dispatch(postReview(review))
  // }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className='flex justify-center items-center w-full min-h-[calc(100vh-96px)]'>
        <span className='text-red-500 font-bold text-3xl p-4 rounded-lg bg-[rgba(0,0,0,0.4)]'>{error}</span>
      </div>
    )
  }


  return (
    <>
      <div className='wrapper'>
        <div className='flex'>
          <div className='container1'>
            <img
              className='mx-[3rem] my-[5rem] h-[25rem]'
              src={game.image}
              alt={game.name}
              title={game.name}
            />

            <div className='flex justify-between px-[23rem]'>
              <button
                className='h-[4rem] mx-[-19.5rem] my-[-4rem]'
                onClick={() => navigate('/favorites')}
              >
                {' '}
                <IconHeart className='w-full h-full' />{' '}
              </button>
              <button
                className='h-[4rem] mx-[10rem] my-[-4rem]'
                onClick={() => navigate('/cart')}
              >
                {' '}
                <IconShoppingCartPlus className='w-full h-full' />{' '}
              </button>
            </div>

            <div className='container flex mx-[3rem] my-[1.5rem] bg-violet-900 border-[0.2rem] border-purple-900 rounded-[1rem]'>
              <div className='flex flex-col p-[0.7rem]'>
                <div className='text-2xl font-serif'>Genres:</div>
                {game.genres &&
                  game.genres.map((genre) => (
                    <div
                      className='text-1xl font-mono font-semibold text-white my-[0.2rem]'
                      key={genre.id}
                    >
                      - {genre.name}
                    </div>
                  ))}
              </div>
              <div className='text-white mx-[8rem] p-[0.7rem]'>
                <div>
                  <div className='text-2xl font-serif'>Released in:</div>
                  <div className='text-1xl font-mono font-semibold my-[0.2rem]'>
                    - {game.releaseDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='container2 bg-violet-900 p-8 w-[40rem] border-[0.2rem] border-purple-900 rounded-2xl mx-[5rem] my-[5rem]'>
            <div className='text-6xl font-serif text-white text-center'>
              {game.name}
            </div>
            <div className='text-1xl font-serif text-white mx-[2rem] my-[2rem]'>
              {game.description &&
                game.description.replace(/<\/?p>|<br\s?\/?>/g, '')}
            </div>
          </div>
        </div>

        {/* <ReviewForm onSubmit={handleSubmitReview} videogameId={id} /> */}

        <div className='flex flex-col mt-10'>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Detail
