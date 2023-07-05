import { useSelector } from 'react-redux';
import Carrousel from '../components/Carrousel';
import { videogames } from '../utils/dumbData';

const Home = () => {
  const { user } = useSelector((state) => state.users);
  console.log('🚀 ~ file: Home.jsx:7 ~ Home ~ user:', user);
  return (
    <div className='text-white min-h-screen'>
      <div>Welcome</div>
      <Carrousel cards={videogames} />
    </div>
  );
};
export default Home;
