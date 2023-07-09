import { useEffect, useState } from 'react'
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

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { genresFilter, tagsFilter } = useSelector((state) => state.videoGames)
  const [url, setUrl] = useState('http://localhost:3001/videogames?')
  useEffect(() => {
    let myUrl = ''
    let genres = ''
    let tags = ''

    genresFilter.length > 0
      ? genresFilter.forEach((gn, ind) => {
          ind === 0
            ? (genres = `genreFilter=${gn}`)
            : (genres = `${genres}&genreFilter=${gn}`)
          myUrl = `http://localhost:3001/videogames?${genres}`
        })
      : null

    tagsFilter.length > 0
      ? tagsFilter.forEach((tg, ind) => {
          ind === 0
            ? (tags = `tagFilter=${tg}`)
            : (tags = `${tags}&tagFilter=${tg}`)
          myUrl = `http://localhost:3001/videogames?${tags}`
        })
      : null

    if (genresFilter.length > 0 && tagsFilter.length > 0) {
      myUrl = `http://localhost:3001/videogames?${genres}&${tags}`
    } else if (genresFilter.length == 0 && tagsFilter.length == 0) {
      myUrl = 'http://localhost:3001/videogames?'
    }

    myUrl !== '' ? setUrl(myUrl) : null
  }, [genresFilter, tagsFilter])

  const { data, error, isLoading } = useSWRImmutable(
    `${url}&page=${currentPage}`,
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
