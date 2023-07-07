import { useState } from 'react'
import MultiSelectAccordion from './MultiSelectAccordion'
import { useTags } from '../hooks/useTags'
import { useGenres } from '../hooks/useGenres'

const FiltersSidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState([])
  const [sourceFilters, setSourceFilters] = useState([])
  const { isTagsLoading, tags } = useTags()
  const { isGenresLoading, genres } = useGenres()

  const addToSelectedFilters = (e) => {
    const { checked, name } = e.target

    if (checked) {
      setSelectedFilters((prev) => [...prev, name])
    } else {
      setSelectedFilters(selectedFilters.filter((item) => item !== name))
    }
  }

  const addToSourceFilters = (e) => {
    const { checked, name } = e.target
    if (checked) {
      setSourceFilters((prev) => [...prev, name])
    } else {
      setSourceFilters(sourceFilters.filter((item) => item !== name))
    }
  }

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
          <span className='text-center font-bold text-2xl translate-y-6'>-</span>
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
        addToSelectedFilters={addToSelectedFilters}
      />
      <p className='animate-pulse'>{isGenresLoading && 'Fetching genres...'}</p>

      <MultiSelectAccordion
        title='Tags'
        options={tags?.slice(0, 15) ?? []}
        addToSelectedFilters={addToSourceFilters}
      />
      <p className='animate-pulse'>{isTagsLoading && 'Fetching tags...'}</p>
    </div>
  )
}

export default FiltersSidebar
