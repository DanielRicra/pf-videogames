import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className='wrapper flex flex-col items-center justify-center min-h-screen'>
        <div className='text-[3rem] font-mono font-semibold my-[2rem]'>
          Oops! this page does not exist
        </div>
        <img
          src='https://res.cloudinary.com/dopxkawke/image/upload/v1690145483/assets/crash_qvquyn.png'
          className='h-[15rem] relative'
        />

        <Link
          to='/'
          className='flex text-[1.3rem] font-semibold justify-center border-[0.3rem] border-blue-700 bg-blue-600 hover:bg-blue-700 hover:border-blue-600 duration-200 rounded-[0.5rem] p-3 px-6 my-[1.5rem]'
        >
          Go to Home
        </Link>
      </div>
    </>
  )
}
export default NotFound
