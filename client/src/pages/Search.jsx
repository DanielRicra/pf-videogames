import { useState } from 'react'
import useSWRImmutable from 'swr/immutable'

import Footer from '../components/Footer'

import {
  FilterBar,
  Loading,
  PaginationBar,
  SortBar,
  VideoGameCardList,
} from '../components'
import { fetchVideogames } from '../services/videoGameService'

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, error, isLoading } = useSWRImmutable(
    `http://localhost:3001/videogames?name=&page=${currentPage}`,
    fetchVideogames
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
    <div className='min-h-[calc(100vh-96px)] font-[system-ui] flex p-2 md:px-10 lg:px-14 md:py-6 lg:py-10'>

      <div className='min-w-[300px]'>
        <FilterBar />
      </div>
      <div className='flex flex-col flex-1'>
        <p>results of:</p>
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
          <VideoGameCardList videogames={data} />
        )}

        <div className='flex justify-center my-4'>
          {!error && (
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
