import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTags } from '../hooks/useTags';
import { useGenres } from '../hooks/useGenres';
import MultiSelectAccordion from './MultiSelectAccordion';
import { GenreFilter, TagFilter } from '../redux/actions/videoGamesAction';

const FiltersSidebar = () => {
  const [genreFilters, setGenreFilters] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);
  const { isTagsLoading, tags } = useTags();
  const { isGenresLoading, genres } = useGenres();
  const dispatch = useDispatch();

  const addToGenreFilters = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      setGenreFilters((prev) => [...prev, name]);
    } else {
      setGenreFilters(genreFilters.filter((item) => item !== name));
    }
  };

  const addToTagFilters = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setTagFilters((prev) => [...prev, name]);
    } else {
      setTagFilters(tagFilters.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    dispatch(TagFilter(tagFilters));
    /* paginate(1); */
  }, [tagFilters, dispatch]);

  useEffect(() => {
    dispatch(GenreFilter(genreFilters));
  }, [genreFilters, dispatch]);

  return (
    <div className='flex flex-col rounded-lg bg-white  p-4 text-purple-900 max-w-xs'>
      <h2 className='text-2xl text-center mb-4 font-medium'>Filter by</h2>

      <div className='flex items-start flex-col'>
        <h3 className='font-medium text-purple-900 text-xl capitalize mb-3'>
          price
        </h3>

        <div className='flex flex-row gap-2 mb-2'>
          <div className='flex flex-col'>
            <input
              id='from-price'
              placeholder='From'
              type='text'
              className='w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-20 p-2'
            />
          </div>
          <span className='text-center font-bold text-2xl'>-</span>
          <div className='flex flex-col'>
            <input
              id='to-price'
              type='text'
              placeholder='To'
              className='w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-20 p-2'
            />
          </div>
        </div>
      </div>

      <MultiSelectAccordion
        title='Genre'
        options={genres ?? []}
        addToSelectedFilters={addToGenreFilters}
      />
      <p className='animate-pulse'>{isGenresLoading && 'Fetching genres...'}</p>

      <MultiSelectAccordion
        title='Tags'
        options={tags?.slice(0, 15) ?? []}
        addToSelectedFilters={addToTagFilters}
      />
      <p className='animate-pulse'>{isTagsLoading && 'Fetching tags...'}</p>
    </div>
  );
};

export default FiltersSidebar;
