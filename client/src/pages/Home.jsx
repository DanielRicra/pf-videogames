import Carrousel from '../components/Carrousel'
import { videogames } from '../utils/dumbData'

const Home = () => {
  return (
    <div className='text-white min-h-screen'>
      <div>Welcome</div>
      <Carrousel cards={videogames} />
    </div>
  )
}
export default Home
