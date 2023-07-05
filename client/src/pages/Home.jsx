import { useSelector } from 'react-redux';
import Carrousel from '../components/Carrousel';
import { videogames } from '../utils/dumbData';

const Home = () => {
  const { user } = useSelector((state) => state.users);
  console.log('🚀 ~ file: Home.jsx:7 ~ Home ~ user:', user);
  return (
    <div className='text-white min-h-screen'>
      <div className='font-medium mb-5 text-7xl whitespace-normal ml-12'>
        <h1>Welcome to <span className='text-purple-400'>the best</span> <br/> PC videogames <br/> E-comerce</h1>
      </div>

      <br />

      <div className='font-medium mb-5 text-4xl ml-12'>
        <h3>Popular Games</h3>
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