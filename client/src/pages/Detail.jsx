import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import useSWRImmutable from 'swr/immutable'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { IconShoppingCartPlus } from '@tabler/icons-react'
import { Loading, ReviewCard } from '../components'
import { getVideogameById } from '../services/videoGameService'
import { fetchReviews } from '../redux/actions/reviewAction'
import {
  saveFavorite,
  deleteFavorite,
  getUserFavorites,
} from '../services/favoriteService'
import { selectUser } from '../redux/user/userSlice'
import { toast } from 'sonner'
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from '../redux/cart/cartSlice'
import {
  addVideogameToUserCart,
  removeVideogameFromUserCart,
} from '../services/cartService'
import { getReviewByVideogameId } from '../services/reviewService'

const Detail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector(getCartItems)

  const {
    data: reviews,
    error: reviewError,
    isLoading: reviewsLoading,
  } = useSWRImmutable(id, getReviewByVideogameId)

  const user = useSelector(selectUser)

  const {
    data: game,
    error,
    isLoading,
  } = useSWRImmutable(`videogames/${id}`, getVideogameById)
  const { videogames: myVideogames } = useSelector(selectUser)

  const { data: userWithFavorites, mutate: mutateFavorites } = useSWRImmutable(
    `user/${user?.id}/favorites`,
    getUserFavorites
  )

  const cartItem = useMemo(() => {
    return cartItems.find((item) => item.id === game?.id)
  }, [cartItems, game])

  const isFavorite = useMemo(() => {
    return userWithFavorites?.Favorites?.some(
      (fav) => fav.videogame.id === game?.id
    )
  }, [userWithFavorites, game])

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        const favoriteId = userWithFavorites?.Favorites?.find(
          (fav) => fav.videogame.id === game?.id
        ).id
        await deleteFavorite(favoriteId)
        toast.success('Removed from favorites')
      } else {
        await saveFavorite(user.email, game.id)
        toast.success('Added to favorites')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      mutateFavorites()
    }
  }

  const handleClick = async () => {
    try {
      if (!cartItem) {
        if (user) {
          await addVideogameToUserCart({
            userEmail: user.email,
            videogameId: game.id,
          })
        }
        dispatch(addToCart(game))
        toast.success('Added to cart')
        navigate('/cart')
      } else {
        if (user) {
          await removeVideogameFromUserCart({
            userEmail: user.email,
            videogameId: game?.id,
          })
        }

        dispatch(removeFromCart(game?.id.toString()))
        toast.success('Removed from cart')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    dispatch(fetchReviews(id)).catch(() => {
      toast.error('Cannot fetch reviews')
    })
  }, [dispatch, id])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-120px)]'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-120px)]'>
        <div className='text-2xl'>
          {error.message ?? 'Something went wrong'}
        </div>
      </div>
    )
  }

  return (
    <div className='wrapper min-h-[calc(100vh-120px)] p-7 lg:p-14'>
      <div className='flex flex-wrap gap-4 lg:gap-8 flex-col md:flex-row'>
        <div className='flex-1 w-full md:w-1/2 flex-col'>
          <div className='overflow-hidden rounded-lg w-full mb-4'>
            <img
              className='w-full rounded-lg'
              src={game.image}
              alt={game.name}
              title={game.name}
            />
          </div>

          <div className='flex justify-between'>
            <button className='' onClick={handleFavorite}>
              {isFavorite ? (
                <IconHeartFilled className='w-14 h-14 hover:animate-pulse text-red-500' />
              ) : (
                <IconHeart className='w-14 h-14 hover:animate-pulse' />
              )}
            </button>

            <button
              className='bg-purple-600 text-white px-4 text-lg lg:text-2xl p-2 rounded-lg hover:opacity-85 flex gap-1 justify-center items-center'
              type='button'
              onClick={handleClick}
            >
              <IconShoppingCartPlus className='w-7 h-7' />
              <span>
                {!cartItem
                  ? !myVideogames?.some((vg) => vg.id === game?.id)
                    ? 'Add to cart'
                    : 'Gift to a friend'
                  : 'Remove from cart'}
              </span>
            </button>
          </div>

          <div className='flex flex-col gap-4 p-4 mt-8 bg-gray-100 text-black rounded-xl'>
            <div className='flex'>
              <div className='flex flex-col flex-1'>
                <div className='text-2xl'>Genres:</div>
                {game.genres &&
                  game.genres.map((genre, index) => (
                    <div
                      key={index}
                      className='text-1xl font-semibold text-gray-800 my-[0.2rem]'
                    >
                      - {genre.name}
                    </div>
                  ))}
              </div>

              <div className='text-gray-800 flex-1'>
                <div className='text-2xl'>Released in:</div>
                <p className='text-1xl font-semibold my-[0.2rem]'>
                  - {game.releaseDate}
                </p>
              </div>
            </div>
            <div className='text-gray-800 flex gap-4 self-end mt-4'>
              <div className='text-2xl'>Price:</div>
              <p className='text-2xl font-semibold text-center'>
                $ {game.price}
              </p>
            </div>
          </div>
        </div>

        <div className='flex-1 p-6 2xl:p-8 rounded-lg bg-gray-100 text-black'>
          <div className='xl:text-3xl text-lg'>{game.name}</div>
          <div className='text-1xl my-[2rem]'>
            {game.description &&
              game.description.replace(/<\/?p>|<br\s?\/?>|<\/?h3>/g, '')}
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-10 bg-gray-100 rounded-lg text-black p-4'>
        <h2 className='text-2xl'>Reviews</h2>
        {reviewError && (
          <div className='text-center text-gray-800'>
            <p>Something went wrong fetching reviews</p>
          </div>
        )}
        {reviewsLoading ? (
          <div className='text-center text-gray-800 animate-pulse'>
            Loading reviews...
          </div>
        ) : reviews?.length === 0 ? (
          <div className='text-center text-gray-800'>No reviews yet</div>
        ) : (
          reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  )
}

export default Detail
