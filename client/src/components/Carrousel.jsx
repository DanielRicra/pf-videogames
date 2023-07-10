import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'
import VideoGameCardImage from './VideoGameCardImage'
import { getCardShowAmount } from '../utils/helpers'

const Carrousel = ({ videGames }) => {
  const [screeWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className='swiper relative px-5 flex items-center'>
      <div className='swiper-button-prev cursor-pointer hover:opacity-75'>
        <ChevronLeftIcon className='h-24 w-24' />
      </div>
      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={10}
        slidesPerView={getCardShowAmount(screeWidth)}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        scrollbar={{ draggable: true }}
        className='w-full'
      >
        {videGames.map((videoGame) => (
          <SwiperSlide key={videoGame.id} className='swiper-slide'>
            <VideoGameCardImage videoGame={videoGame} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-button-next cursor-pointer hover:opacity-75'>
        <ChevronRightIcon className='h-20 w-20' />
      </div>
    </div>
  )
}
export default Carrousel
