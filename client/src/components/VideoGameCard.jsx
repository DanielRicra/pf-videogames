import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from './icons'

const VideoGameCard = ({ card }) => {
  return (
    <div
      to={`/detail/${card.id}`}
      className='w-[210px] rounded-md flex flex-col bg-white text-slate-950 shadow-md'
    >
      <Link
        to={`/detail/${card.id}`}
        className='w-full h-[220px] rounded-t-lg overflow-hidden'
        title='See details'
      >
        <img
          src={card.image}
          alt={card.name}
          className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        />
      </Link>
      <div className='flex flex-col justify-between gap-1 p-2'>
        <p
          className='text-lg font-semibold text-center truncate'
          title={card.name}
        >
          {card.name}
        </p>
        <p className='text-lg font-medium text-center'>{card.price} $</p>
        <div className='flex justify-between'>
          <button className='bg-purple-600 text-white w-full p-2 rounded-lg hover:opacity-85 flex gap-1 justify-center'>
            <ShoppingCartIcon />
            <span>Buy</span>
          </button>
        </div>
        <Link
          to={`/detail/${card.id}`}
          className='text-center font-normal text-sm'
        >
          See details
          <span className='text-purple-600'> &rarr;</span>
        </Link>
      </div>
    </div>
  )
}
export default VideoGameCard
