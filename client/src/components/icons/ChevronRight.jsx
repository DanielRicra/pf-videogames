import { twMerge } from 'tailwind-merge'

const ChevronRightIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={twMerge('h-6 w-6', className)}
      width={24}
      height={24}
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M9 6l6 6l-6 6'></path>
    </svg>
  )
}
export default ChevronRightIcon
