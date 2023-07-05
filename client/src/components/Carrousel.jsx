import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import VideoGameCard from './VideoGameCard'
import 'swiper/css'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

const Carrousel = ({ cards }) => {
  return (
    <div className='swiper relative px-5 flex items-center'>
      <div className='swiper-button-prev cursor-pointer'>
        <ChevronLeftIcon className='h-24 w-24' />
      </div>
      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={5}
        slidesPerView={5}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        scrollbar={{ draggable: true }}
        className='w-full px-2'
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className='swiper-slide'>
            <VideoGameCard card={card} key={card.id} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-button-next cursor-pointer'>
        <ChevronRightIcon className='h-24 w-24' />
      </div>
    </div>
  )
}
export default Carrousel
