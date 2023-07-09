import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTags } from '../hooks/useTags'
import { useGenres } from '../hooks/useGenres'
import MultiSelectAccordion from './MultiSelectAccordion'
import { GenreFilter, TagFilter } from '../redux/actions/videoGamesAction'

const FiltersSidebar = () => {
  const [genreFilters, setGenreFilters] = useState([])
  const [tagFilters, setTagFilters] = useState([])
  const { isTagsLoading, tags } = useTags()
  const { isGenresLoading, genres } = useGenres()
  const dispatch = useDispatch()

  const addToGenreFilters = (e) => {
    const { checked, name } = e.target

    if (checked) {
      setGenreFilters((prev) => [...prev, name])
    } else {
      setGenreFilters(genreFilters.filter((item) => item !== name))
    }
  }

  const addToTagFilters = (e) => {
    const { checked, name } = e.target
    if (checked) {
      setTagFilters((prev) => [...prev, name])
    } else {
      setTagFilters(tagFilters.filter((item) => item !== name))
    }
  }

  useEffect(() => {
    dispatch(TagFilter(tagFilters))
    /* paginate(1); */
  }, [tagFilters, dispatch])

  useEffect(() => {
    dispatch(GenreFilter(genreFilters))
  }, [genreFilters, dispatch])

  return (
    <div className='flex flex-col rounded-lg bg-[#bdbcbc] p-4 text-black max-w-xs'>
      <h2 className='text-2xl mb-4 font-medium'>Filter by</h2>

      <div className='flex items-start flex-col'>
        <h3 className='font-medium text-xl capitalize m-0'>price</h3>

        <div className='flex flex-row gap-2 mb-2'>
          <div className='flex flex-col'>
            <label htmlFor='from-price' className='text-base'>
              From
            </label>
            <input
              id='from-price'
              type='text'
              className='rounded-md w-20 p-2'
            />
          </div>
          <span className='text-center font-bold text-2xl translate-y-6'>
            -
          </span>
          <div className='flex flex-col'>
            <label htmlFor='to-price' className='text-base'>
              To
            </label>
            <input id='to-price' type='text' className='rounded-md w-20 p-2' />
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
  )
}

export default FiltersSidebar
