import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/user/userSlice'
import { IconHeartFilled } from '@tabler/icons-react'
import useSWR from 'swr/immutable'
import { useNavigate } from 'react-router-dom'
import { deleteFavorite } from '../services/favoriteService'
import { removeFromFavorites } from '../redux/user/userSlice'
import { getUserFavorites } from '../services/favoriteService'
import { toast } from 'sonner'
import { useEffect } from 'react'

const Favorites = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const { data: userData, mutate } = useSWR(
    `user/${user?.id}/favorites`,
    getUserFavorites
  )

  const removeFavorite = async (favId, videogameId) => {
    try {
      await deleteFavorite(favId)
      dispatch(removeFromFavorites(videogameId))
      mutate()
      toast.success('Removed from favorites')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <div className='min-h-screen p-7 lg:p-14'>
      <h1 className='text-3xl font-bold text-white mb-5'>My Favorites</h1>
      {userData?.Favorites?.length === 0 && (
        <p className='text-center text-2xl font-bold p-2 bg-gray-100 rounded-lg text-black'>
          You have no favorites
        </p>
      )}
      <div className='flex flex-wrap gap-4'>
        {userData?.Favorites?.map((fav) => {
          return (
            <div
              key={fav.id}
              className='bg-violet-900 w-[18.4rem] rounded-[0.5rem] flex flex-col overflow-hidden'
            >
              <img
                src={fav.videogame.image}
                title={fav.videogame.name}
                onClick={() => navigate(`/detail/${fav.videogame.id}`)}
                className='w-full cursor-pointer'
              />
              <div className='p-2 flex flex-col justify-between flex-1'>
                <p className=''>{fav.videogame.name}</p>
                <button
                  className='self-start'
                  type='button'
                  onClick={() => removeFavorite(fav.id, fav.videogame.id)}
                  title='Remove from favorites'
                >
                  <IconHeartFilled className='h-10 w-10 hover:animate-pulse text-red-600' />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Favorites
