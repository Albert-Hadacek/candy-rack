
import useDispatch from './useDispatch'
import { CartItem } from '../state/AppState'

const useAddToCart = () => {
  const dispatch = useDispatch()
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        item,
      },
    })
  }
  return addToCart
}

export default useAddToCart
