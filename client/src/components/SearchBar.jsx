import { useRef } from 'react'
import { SearchIcon } from './icons'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputRef.current?.value.trim() === '') {
      return
    }
    navigate(`/search/?query=${inputRef.current.value}`)
  }
    
  return (
    <form onSubmit={handleSubmit} className='flex border-2 py-2 border-white-400 rounded-lg bg-[rgba(0,0,0,0.25)] w-full md:w-[280px] lg:w-[350px] 2xl:w-[420px]'>
      <input
        ref={inputRef}
        placeholder='Search ...'
        className='flex-grow px-3 text-lg outline-none bg-transparent caret-white text-white'
      />

      <button type='submit' className='px-3'>
        <SearchIcon />
      </button>
    </form>
  )
}

export default SearchBar