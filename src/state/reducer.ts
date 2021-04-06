import {AppState, CartItem, Modal} from "./AppState"

interface Action<T> {
  type: T
}

export interface AddToCartAction extends Action<'ADD_TO_CART'> {
  payload: {
    item: Omit<CartItem, 'quantity'>
  }
}

export interface ToggleModalAction extends Action<'TOGGLE_MODAL'> {
  payload: Modal | null
}

export interface AddOffer extends Action<'ADD_OFFER'> {
  payload: string
}

export interface ResetOffers extends Action<'RESET_OFFERS'> {}

const reducer = (
  state: AppState,
  action: AddToCartAction | ToggleModalAction | AddOffer | ResetOffers
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemToAdd = action.payload.item
      const alreadyInCart = state.cart.items.some(
        (item) => (item.id === itemToAdd.id) && (item.variant === itemToAdd.variant)
      )
      return {
        ...state,
        cart: {
          ...state.cart,
          items: alreadyInCart
            ? state.cart.items.map((item) =>
                item.id === itemToAdd.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.cart.items, { ...itemToAdd, quantity: 1 }],
        },
      }
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: action.payload,
      }
    case 'ADD_OFFER': 
      return {
        ...state,
        offers: [...state.offers, action.payload]
      }
    case 'RESET_OFFERS': 
      return {
        ...state,
        offers: []
      }
    default:
      return state
  }
}

export default reducer;