import { Link } from 'react-router-dom'

const VideoGameCardImage = ({ videoGame }) => {
  return (
    <Link
      to={`/detail/${videoGame.id}`}
      className='w-[210px] h-[300px] 2xl:w-[250px] 2xl:h-[350px]  rounded-md flex flex-col bg-[#bdbcbc] text-slate-950 shadow-md relative overflow-hidden'
    >
      <img
        src={videoGame.image}
        alt={videoGame.name}
        title={videoGame.name}
        width={200}
        height={300}
        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
      />
      <p className=' text-black text-center text-base font-semibold mt-2 absolute bottom-0 right-0 bg-[rgba(200,200,200,0.85)] rounded-tl-lg p-1'>
        {videoGame.price} $
      </p>
    </Link>
  )
}
export default VideoGameCardImage
