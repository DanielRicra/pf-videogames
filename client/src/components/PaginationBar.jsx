import { ChevronLeftIcon, ChevronRightIcon } from './icons'
import { twMerge } from 'tailwind-merge'

const Pagination = ({ currentPage, totalPages = 1, paginate }) => {
  const previous = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1)
    }
  }

  return (
    <ul className='list-none flex items-center flex-wrap'>
      <li className='flex justify-center items-center'>
        <span
          onClick={previous}
          className={twMerge(
            'flex w-[30px] h-[30px] justify-center items-center aspect-square py-2 rounded-lg text-base cursor-pointer',
            currentPage <= 1 && 'cursor-not-allowed'
          )}
        >
          <ChevronLeftIcon className={currentPage <= 1 && 'opacity-50'} />
        </span>
      </li>

      {Array(totalPages)
        .fill(true)
        .map((_number, index) => (
          <li key={index} className='page-item'>
            <span
              onClick={() => paginate(index + 1)}
              className={twMerge(
                'flex w-[30px] h-[30px] justify-center items-center aspect-square py-2 rounded-lg text-base cursor-pointer hover:bg-purple-600 hover:text-white',
                currentPage === index + 1 && 'bg-purple-600 text-white font-medium'
              )}
            >
              {index + 1}
            </span>
          </li>
        ))}

      <li className='page-item'>
        <span
          onClick={next}
          className={twMerge(
            'flex w-[30px] h-[30px] justify-center items-center aspect-square py-2 rounded-lg text-base cursor-pointer',
            currentPage >= totalPages && 'cursor-not-allowed'
          )}
        >
          <ChevronRightIcon className={currentPage >= totalPages && 'opacity-50'} />
        </span>
      </li>
    </ul>
  )
}

export default Pagination
