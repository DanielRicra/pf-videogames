import { IconLoader3 } from '@tabler/icons-react'
import { formatMoney } from '../../utils/helpers'

const CheckoutDetail = ({ items, handleCheckout, loadingCheckoutStatus }) => {
  return (
    <div className='w-full flex flex-col'>
      <div className='flex items-center justify-between w-full my-3 border-b-2 border-gray-400'>
        <p>Total VideoGames: {items.length}</p>
        <div className='text-2xl flex gap-2'>
          <p>Total Price:</p>
          <span className='font-semibold text-purple-800'>
            {formatMoney(
              items.reduce((acc, item) => acc + parseFloat(item.price), 0)
            )}
          </span>
        </div>
      </div>

      <button
        type='button'
        className='py-2 text-white px-4 bg-purple-600 rounded-lg hover:opacity-80 self-end'
        onClick={handleCheckout}
      >
        {!loadingCheckoutStatus ? (
          'Checkout'
        ) : (
          <IconLoader3 className='animate-spin' size={25} />
        )}
      </button>
    </div>
  )
}
export default CheckoutDetail
