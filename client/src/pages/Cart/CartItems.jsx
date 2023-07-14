import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/cart/cartSlice'
import { IconTrashFilled } from '@tabler/icons-react'
import { removeVideogameFromUserCart } from '../../services/cartService'
import { useAuth0 } from '@auth0/auth0-react'

const CartItems = ({ cartItems }) => {
  const { user } = useAuth0()
  const dispatch = useDispatch()

  const handleRemoveItem = async (id) => {
    try {
      if (user) {
        await removeVideogameFromUserCart({
          userEmail: user.email,
          videogameId: id,
        })
      }
      dispatch(removeFromCart(id))
    } catch (error) { /* empty */ }
  }

  return (
    <div className='flex flex-col gap-2 px-4'>
      {cartItems.map((item) => (
        <div key={item.id} className='flex items-center my-3 justify-between border-b-[1px] border-white pb-2'>
          <div className='flex items-start gap-2'>
            <div className='flex items-center w-[80px] h-[102px] overflow-hidden'>
              <img
                src={item.image}
                alt={item.name}
                className='w-full h-full object-cover'
              />
            </div>
            <p>{item.name}</p>
          </div>

          <div className='flex items-end gap-2 flex-col '>
            <button onClick={() => handleRemoveItem(item.id)}>
              <IconTrashFilled className='text-red-600' />
            </button>
            <p className='font-semibold text-purple-800'>{item.price} $</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CartItems
