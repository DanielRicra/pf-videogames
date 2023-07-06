import { twMerge } from 'tailwind-merge'

const CloudUpload = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={twMerge('h-6 w-6', className)}
      width={24}
      height={24}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1'></path>
      <path d='M9 15l3 -3l3 3'></path>
      <path d='M12 12l0 9'></path>
    </svg>
  )
}
export default CloudUpload
