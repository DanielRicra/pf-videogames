import { useState } from 'react'
import Footer from '../components/Footer'

import {
  FilterBar,
  PaginationBar,
  SortBar,
  VideoGameCardList,
} from '../components'
import { videogames } from '../utils/dumbData'

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
    <div className='min-h-screen flex p-2 md:px-10 lg:px-14 md:py-6 lg:py-10'>
      <div className='min-w-[300px]'>
        <FilterBar />
      </div>
      <div className='flex flex-col flex-1'>
        <p>results of:</p>
        <SortBar />
        <VideoGameCardList videogames={videogames} />

        <div className='flex justify-center my-4'>
          <PaginationBar
            currentPage={currentPage}
            totalPages={10}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
export default Search
