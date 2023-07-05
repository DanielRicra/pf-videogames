import Carrousel from '../components/Carrousel'
import { videogames } from '../utils/dumbData'

const Home = () => {
  return (
    <div className='text-black min-h-screen'>
      <div className='font-medium mb-5 text-7xl whitespace-normal ml-12'>
        <h1>Welcome to <span className='text-violet-500'>the best</span> <br/> PC videogames <br/> E-comerce</h1>
      </div>

      <br />

      <div className='mb-5 text-4xl ml-12'>
        <h3>Popular games</h3>
      </div>

      <Carrousel cards={videogames} />
      <br />

      <div className='font-medium text-6xl mt-12 flex justify-center items-center'>
        <h2>Join the community</h2>
      </div>
    </div>
  )
};
export default Home;