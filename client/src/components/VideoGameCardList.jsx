import VideoGameCard from './VideoGameCard'

const VideoGameCardList = ({ videogames = [] }) => {
  return (
    <div className='flex flex-wrap'>
      {videogames.length === 0 && <p>There are no videogames</p>}
      {videogames.map((videoGame) => (
        <VideoGameCard key={videoGame.id} card={videoGame} />
      ))}
    </div>
  )
}
export default VideoGameCardList
