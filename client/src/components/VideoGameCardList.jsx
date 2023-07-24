import VideoGameCard from './VideoGameCard'
import { useAuth0 } from '@auth0/auth0-react'
import './index.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user/userSlice'

const VideoGameCardList = ({ videogames = [], message }) => {
  const { user } = useAuth0()
  const { videogames: myVideogames } = useSelector(selectUser)

  return (
    <div className='gap-4 videogame__card-list'>
      {videogames.length === 0 && (
        <div className='flex items-center justify-center h-[300px] w-full'>
          <p className='text-4xl text-center font-semibold'>{message}</p>
        </div>
      )}
      {videogames.map((videoGame) => (
        <VideoGameCard
          key={videoGame.id}
          videogame={videoGame}
          user={user}
          owned={myVideogames?.some((vg) => vg.id === videoGame.id)}
        />
      ))}
    </div>
  )
}
export default VideoGameCardList
