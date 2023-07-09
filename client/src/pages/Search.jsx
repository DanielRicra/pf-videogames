import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { useSelector, useDispatch } from 'react-redux'

import {
  FilterBar,
  Loading,
  PaginationBar,
  SortBar,
  VideoGameCardList,
  Footer,
} from '../components'
import * as videoGameService from '../services/videoGameService'
import { getSearchQuery } from '../redux/videogame/videoGameSlice'

import { getSortType, getSortOrder } from '../redux/videogame/videoGameSlice'

const Search = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const searchQuery = useSelector(getSearchQuery)
  const { genresFilter, tagsFilter } = useSelector((state) => state.videoGames)

  const sortType = useSelector(getSortType)
  const sortOrder = useSelector(getSortOrder)

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
    `${url}&name=${searchQuery}&page=${currentPage}&field=${sortType}&order=${sortOrder}`,
    videoGameService.fetchVideogames
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const sortTypeHandler = (parameter) => {
    dispatch(setSortType(parameter));
    dispatch(fetchByParameter(parameter));
  };
  console.log(data)

  return (
    <>
      <div className='min-h-[calc(100vh-96px)] font-[system-ui] flex p-2 md:px-10 lg:px-14 md:py-6 lg:py-10 gap-4 lg:gap-8'>
        <div className='min-w-[300px]'>
          <FilterBar />
        </div>
        <div className='flex flex-col flex-1'>
          <SortBar sortTypeHandler={sortTypeHandler}/>

          <p className='text-xl font-semibold text-left mb-4'>
            Showing {data?.length ?? 0} results: {searchQuery}
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
