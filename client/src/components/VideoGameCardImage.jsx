import { Link } from 'react-router-dom'

const VideoGameCardImage = ({ videoGame }) => {
  return (
    <Link
      to={`/detail/${videoGame.id}`}
      className='w-[210px] h-[300px] 2xl:w-[250px] 2xl:h-[350px] rounded-md flex flex-col bg-[#bdbcbc] text-slate-950 shadow-md relative overflow-hidden group'
    >
      <img
        src={videoGame.image}
        alt={videoGame.name}
        title={videoGame.name}
        width={200}
        height={300}
        className='w-full h-full rounded-md object-cover transition-transform duration-300 hover:scale-110 peer'
      />
      <p className=' text-black text-center text-base font-semibold mt-2 absolute bottom-0 right-0 bg-[rgba(200,200,200,0.85)] rounded-tl-lg p-1'>
        {videoGame.price} $
      </p>
      <div className='opacity-0 transition-all duration-300 group-hover:opacity-100 w-full h-full bg-[rgba(0,0,0,0.35)] flex items-center justify-center absolute z-10 inset-0'>
        <p className='text-black text-center text-xl lg:text-2xl font-bold bg-[rgba(200,200,200,0.75)] rounded-md p-1'>
          {videoGame.name}
        </p>
      </div>
    </Link>
  )
}
export default VideoGameCardImage
