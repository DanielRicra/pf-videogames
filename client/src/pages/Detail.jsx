import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useParams, useNavigate } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { IconHeart } from '@tabler/icons-react';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import { Loading, ReviewCard } from '../components';
import { getVideogameById } from '../services/videoGameService';
import { fetchReviews } from '../redux/actions/reviewAction'; 

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.review.reviews || []);
  const {
    data: game,
    error,
    isLoading,
  } = useSWRImmutable(`videogames/${id}`, getVideogameById);

  useEffect(() => {
       dispatch(fetchReviews(id))
      .then(() => setIsLoadingReviews(false))
      .catch((error) => {
        setIsLoadingReviews(false);
        console.error('Error al obtener las reviews:', error);
      });
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-120px)]'>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-120px)]'>
        <div className='text-2xl font-serif'>{error.message ?? 'Something went wrong'}</div>
      </div>
    );
  }

  return (
    <div className='wrapper min-h-[calc(100vh-120px)]'>
      <div className='flex'>
        <div className='container1'>
          <img
            className='mx-[3rem] my-[5rem] h-[25rem] rounded-[1rem]'
            src={game.image}
            alt={game.name}
            title={game.name}
          />

          <div className='flex justify-between px-[23rem]'>
            <button
              className='h-[4.5rem] mx-[-19.5rem] my-[-4rem]'
              onClick={() => navigate('/favorites')}
            >
              {' '}
              <IconHeart className='w-full h-full hover:animate-pulse' />{' '}
            </button>
            <button
              className='h-[4.5rem] mx-[13rem] my-[-4rem]'
              onClick={() => navigate('/cart')}
            >
              {' '}
              <IconShoppingCartPlus className='w-full h-full hover:animate-pulse' />{' '}
            </button>
          </div>

          <div className='container flex p-[0.5rem] px-[1rem] mx-[4rem] my-[2rem] bg-black bg-opacity-50 border-[0.2rem] border-violet-500 rounded-[2rem] w-[42.5rem]'>
            <div className='flex flex-col p-[0.7rem]'>
              <div className='text-2xl font-serif'>Genres:</div>
              {game.genres &&
                game.genres.map((genre, index) => (
                  <div
                    key={index}
                    className='text-1xl font-mono font-semibold text-white my-[0.2rem]'
                  >
                    - {genre.name}
                  </div>
                ))}
            </div>

            <div className='text-white mx-[6rem] p-[0.7rem]'>
              <div>
                <div className='text-2xl font-serif'>Released in:</div>
                <div className='text-1xl font-mono font-semibold my-[0.2rem]'>
                  - {game.releaseDate}
                </div>
              </div>
            </div>

            <div className='text-white p-[0.7rem]'>
              <div>
                <div className='text-2xl font-serif'>Price:</div>
                <div className='text-1xl font-mono font-semibold my-[0.2rem]'>
                  $ {game.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container2 bg-black bg-opacity-50 p-8 w-[40rem] border-[0.2rem] border-violet-500 rounded-[2rem] mx-[5rem] my-[5rem]'>
          <div className='text-6xl font-serif text-white text-center'>
            {game.name}
          </div>
          <div className='text-1xl font-serif text-white mx-[2rem] my-[2rem]'>
            {game.description &&
              game.description.replace(/<\/?p>|<br\s?\/?>|<\/?h3>/g, '')}
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-10'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Detail;
