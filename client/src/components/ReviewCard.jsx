import { useMemo } from 'react'
import { useUserById } from '../hooks/useUser'
import { IconStar, IconStarFilled } from '@tabler/icons-react'

const ReviewCard = ({ review }) => {
  const { score, text, userId } = review

  const { user, isUserLoading } = useUserById(userId)

  const stars = useMemo(() => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        stars.push(true)
      } else {
        stars.push(false)
      }
    }
    return stars
  }, [score])

  if (isUserLoading) {
    return (
      <div>
        <p className='animate-pulse h-4 w-full' />
      </div>
    )
  }

  return (
    <div className='bg-violet-900 p-4 mb-4 border border-violet-700 rounded-lg shadow-md flex w-1/2'>
      <div className='flex flex-grow w-85'>
        <div className='flex flex-col flex-grow'>
          <span className='text-white text-xl font-bold mb-1'>
            {user.nickname}
          </span>

          <div className='bg-white bg-opacity-20 rounded-lg p-2'>
            <p className='text-white font-bold'>{text}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-end text-white text-xl font-bold ml-4'>
        <div className='starts flex'>
          {stars.map((star, i) => (
            <span key={i}>
              {star ? (
                <IconStarFilled className='text-yellow-500 h-5' />
              ) : (
                <IconStar className='text-yellow-500 h-5' />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
