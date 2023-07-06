import { twMerge } from 'tailwind-merge'

const HeartIcon = ({ className = '' }) => {
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
      <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572'></path>
    </svg>
  )
}
export default HeartIcon
