import Carrousel from '../components/Carrousel'
import { videogames } from '../utils/dumbData'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='text-white min-h-screen py-14'>
      <div className='font-medium mb-5 text-7xl whitespace-normal ml-12'>
        <h1 className='my-10 ml-2 lg:ml-10'>
          Welcome to <span className='text-purple-400'>the best</span> <br /> PC
          videogames <br /> E-commerce
        </h1>
      </div>

      <br />

      <div className='mb-5 mx-12 flex justify-between items-center'>
        <h3 className='ml-2 text-4xl lg:ml-10 font-normal'>Popular Games</h3>
        <Link to='/search' className='text-base'>
          See all the games &#8594;
        </Link>
      </div>

      <Carrousel videGames={videogames} />
      <br />

      <div className='font-medium text-6xl mt-12 flex justify-center items-center min-h-screen'>
        <h2>Join the community</h2>
      </div>
    </div>
  )
}
export default Home
