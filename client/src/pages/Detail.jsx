import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IconHeart } from '@tabler/icons-react'
import { IconShoppingCartPlus } from '@tabler/icons-react'
import Footer from '../components/Footer'
import { ReviewCard, ReviewForm } from '../components'
import { fetchReviews, postReview } from '../redux/actions/reviewAction'
import axios from 'axios'
// import { fetchVideogame } from '../redux/actions/videoGamesAction'
// import Loading from '../components/Loading'

const Detail = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const reviews = useSelector((state) => state.review.reviews || [])
  // const videogame = useSelector((state) => state.detail || {})
  const [game, setGame] = useState({})

  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchReviews(id))

    const fetchVideogameById = async () => {
      try {
        const response = await axios(`http://localhost:3001/videogames/${id}`)
        setGame(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchVideogameById()
    // return dispatch(clearVideogame())

  }, [dispatch, id])

  const handleSubmitReview = (review) => {
    dispatch(postReview(review))
  }

  // const [currentId, setCurrentId] = useState(id);

  //  useEffect(() => {
  //   setLoading(true);
  //   dispatch(getDetail(currentId)).then(() => {
  //     setLoading(false);
  //   });
  //   return () => {
  //     dispatch(clearDetail());
  //   };
  //  }, [dispatch, currentId]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className='wrapper'>
        <div className='flex'>
          <div className='container1'>

            <img
              className='mx-[3rem] my-[5rem] h-[25rem] rounded-[1rem]'
              src={game.image}
              alt={game.name}
              title={game.name}
            />

            <div className='flex justify-between px-[23rem]'>
              <button
                className='h-[4.5rem] mx-[-19.5rem] my-[-4rem]'
                onClick={() => navigate('/favorites')}
              >
                {' '}
                <IconHeart className='w-full h-full hover:animate-pulse' />{' '}
              </button>
              <button
                className='h-[4.5rem] mx-[13rem] my-[-4rem]'
                onClick={() => navigate('/cart')}
              >
                {' '}
                <IconShoppingCartPlus className='w-full h-full hover:animate-pulse' />{' '}
              </button>
            </div>

            <div className='container flex p-[0.5rem] px-[1rem] mx-[4rem] my-[2rem] bg-black bg-opacity-50 border-[0.2rem] border-violet-500 rounded-[2rem] w-[42.5rem]'>
              <div className='flex flex-col p-[0.7rem]'>
                <div className='text-2xl font-serif'>
                  Genres:
                </div>
                {game.genres && game.genres.map((genre, index) => (
                  <div key={index} className='text-1xl font-mono font-semibold text-white my-[0.2rem]'>
                    - {genre.name}
                  </div>
                ))}
              </div>

              <div className='text-white mx-[6rem] p-[0.7rem]'>
                <div>
                  <div className='text-2xl font-serif'>
                    Released in:
                  </div>
                  <div className='text-1xl font-mono font-semibold my-[0.2rem]'>
                    - {game.releaseDate}
                  </div>
                </div>
              </div>

              <div className='text-white p-[0.7rem]'>
                <div>
                  <div className='text-2xl font-serif'>
                    Price:
                  </div>
                  <div className='text-1xl font-mono font-semibold my-[0.2rem]'>
                    - {game.price}
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className='container2 bg-black bg-opacity-50 p-8 w-[40rem] border-[0.2rem] border-violet-500 rounded-[2rem] mx-[5rem] my-[5rem]'>
            <div className='text-6xl font-serif text-white text-center'>
              {game.name}
            </div>
            <div className='text-1xl font-serif text-white mx-[2rem] my-[2rem]'>
              {game.description && game.description.replace(/<\/?p>|<br\s?\/?>|<\/?h3>/g, '')}
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
