import { useState } from 'react'
import useSWRImmutable from 'swr/immutable'

import {
  FilterBar,
  Loading,
  PaginationBar,
  SortBar,
  VideoGameCardList,
  Footer,
} from '../components'
import { fetchVideogames } from '../services/videoGameService'
import { useSelector } from 'react-redux'
import { getSearchQuery } from '../redux/videogame/videoGameSlice'

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const searchQuery = useSelector(getSearchQuery)

  const { data, error, isLoading } = useSWRImmutable(
    `http://localhost:3001/videogames?name=${searchQuery}&page=${currentPage}`,
    fetchVideogames
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className='min-h-[calc(100vh-96px)] font-[system-ui] flex p-2 md:px-10 lg:px-14 md:py-6 lg:py-10 gap-4 lg:gap-8'>
        <div className='min-w-[300px]'>
          <FilterBar />
        </div>
        <div className='flex flex-col flex-1'>
          <p className='text-xl font-semibold text-left mb-4'>
            Showing {data?.length ?? 0} results of: {searchQuery}
          </p>
          <SortBar />

          {error ? (
            <div className='flex justify-center my-6'>
              <p className='text-red-600 font-semibold text-2xl'>
                {error?.message ?? 'Something went wrong'}
              </p>
            </div>
          ) : isLoading ? (
            <div className='flex justify-center my-6'>
              <Loading />
            </div>
          ) : (
            <VideoGameCardList
              videogames={data}
              message={`There are no VideoGames with name: ${searchQuery}`}
            />
          )}

          <div className='flex justify-center my-4'>
            {!error && data?.length > 9 && (
              <PaginationBar
                currentPage={currentPage}
                totalPages={5}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Search
