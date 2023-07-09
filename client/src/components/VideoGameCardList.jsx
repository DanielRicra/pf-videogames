import VideoGameCard from './VideoGameCard'

const VideoGameCardList = ({ videogames = [], message }) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {videogames.length === 0 && (
        <div className='flex items-center justify-center h-[300px] w-full'>
          <p className='text-4xl text-center font-semibold'>
            {message}
          </p>
        </div>
      )}
      {videogames.map((videoGame) => (
        <VideoGameCard key={videoGame.id} card={videoGame} />
      ))}
    </div>
  )
}
export default VideoGameCardList
