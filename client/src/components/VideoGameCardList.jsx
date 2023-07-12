import VideoGameCard from './VideoGameCard'
import './index.css'

const VideoGameCardList = ({ videogames = [], message }) => {
  return (
    <div className='gap-4 videogame__card-list'>
      {videogames.length === 0 && (
        <div className='flex items-center justify-center h-[300px] w-full'>
          <p className='text-4xl text-center font-semibold'>
            {message}
          </p>
        </div>
      )}
      {videogames.map((videoGame) => (
        <VideoGameCard key={videoGame.id} videogame={videoGame} />
      ))}
    </div>
  )
}
export default VideoGameCardList
