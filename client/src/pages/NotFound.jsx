import crash from '../assets/crash.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className='wrapper flex flex-col items-center justify-center min-h-screen'>
        <div className='text-[3rem] font-mono font-semibold'>
          Oops! this page does not exist
        </div>
        <img src={crash} className='h-[15rem]' />
   
        <Link
          to='/'
          className='flex text-[1.3rem] font-semibold justify-center bg-blue-600 rounded-[0.5rem] p-3 px-6 my-3'
        >
          Go to Home
        </Link>
      </div>
    </>
  )
}
export default NotFound
