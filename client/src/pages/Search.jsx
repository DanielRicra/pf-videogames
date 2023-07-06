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
    <div className='min-h-screen flex'>
      <div className='min-w-[300px]'>
        <FilterBar />
      </div>
      <div className='flex flex-col flex-1'>
        <p>results of:</p>
        <SortBar />
        <VideoGameCardList videogames={videogames} />
        <PaginationBar
          currentPage={currentPage}
          totalPages={10}
          paginate={paginate}
        />
      </div>
    </div>
    <Footer />
    </>
  )
}
export default Search
