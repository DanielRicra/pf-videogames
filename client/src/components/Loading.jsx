import keyboard from '../assets/teclado.png'

const Loading = () => {
  return (
    <div className='flex flex-col items-center text-5xl font-semibold gap-5'>
      <img src={keyboard} alt='Keyboard' className='w-[7rem] animate-bounce' />
      <p className='font-mono font-light'>Loading...</p>
    </div>
  )
}

export default Loading
