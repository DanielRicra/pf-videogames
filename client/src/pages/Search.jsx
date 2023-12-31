import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { useSelector } from 'react-redux'

import {
  FilterBar,
  Loading,
  PaginationBar,
  SortBar,
  VideoGameCardList,
} from '../components'
import * as videoGameService from '../services/videoGameService'
import { getSearchQuery } from '../redux/videogame/videoGameSlice'
import { getSortType, getSortOrder } from '../redux/videogame/videoGameSlice'

const API_URL = import.meta.env.VITE_API_URL

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const searchQuery = useSelector(getSearchQuery)
  const { genresFilter, tagsFilter } = useSelector((state) => state.videoGames)

  const sortType = useSelector(getSortType)
  const sortOrder = useSelector(getSortOrder)

  const [url, setUrl] = useState(`${API_URL}/videogames?`)

  useEffect(() => {
    let myUrl = ''
    let genres = ''
    let tags = ''

    genresFilter.length > 0
      ? genresFilter.forEach((gn, ind) => {
          ind === 0
            ? (genres = `genreFilter=${gn}`)
            : (genres = `${genres}&genreFilter=${gn}`)
          myUrl = `${API_URL}/videogames?${genres}`
        })
      : null

    tagsFilter.length > 0
      ? tagsFilter.forEach((tg, ind) => {
          ind === 0
            ? (tags = `tagFilter=${tg}`)
            : (tags = `${tags}&tagFilter=${tg}`)
          myUrl = `${API_URL}/videogames?${tags}`
        })
      : null

    if (genresFilter.length > 0 && tagsFilter.length > 0) {
      myUrl = `${API_URL}/videogames?${genres}&${tags}`
    } else if (genresFilter.length == 0 && tagsFilter.length == 0) {
      myUrl = `${API_URL}/videogames?`
    }

    myUrl !== '' ? setUrl(myUrl) : null
  }, [genresFilter, tagsFilter])

  const { data, error, isLoading } = useSWRImmutable(
    `${url}&name=${searchQuery}&page=${currentPage}&field=${sortType}&order=${sortOrder}&stock=true`,
    videoGameService.fetchVideogames
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className='min-h-[calc(100vh-96px)] font-[system-ui] flex p-2 md:px-10 lg:px-14 md:py-6 lg:py-10 gap-4 lg:gap-8'>
        <div className='min-w-[300px]'>
          <FilterBar paginate={paginate} />
        </div>
        <div className='flex flex-col flex-1'>
          <SortBar />

          <p className='text-xl font-semibold text-left mb-4'>
            Showing {data?.totalResults} results
          </p>


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
              videogames={data?.results ?? []}
              message={`There are no VideoGames with name: ${searchQuery}`}
            />
          )}

          <div className='flex justify-center my-4 mt-8'>
            {!error && (
              <PaginationBar
                currentPage={currentPage}
                totalPages={Math.round((data?.totalResults ?? 10) / 10)}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Search
