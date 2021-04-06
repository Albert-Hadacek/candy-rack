import React, { createContext, useReducer } from 'react'
import { AddOffer, AddToCartAction, ResetOffers, ToggleModalAction } from './reducer'
import reducer from './reducer'

export interface CartItem {
  id: string
  title: string
  quantity: number
  price: number
  currency: string
  variant: string | null
}

export interface Product {
  id: string
  title: string
  description: string
  variants: string[] | null
  price: number
  image: string
  currency: string
  quantity: number
}

export interface Modal {
  price: number,
  title: string
  variant : string | null
  currency: string
  image: string
}

export interface AppState {
  cart: {
    items: CartItem[]
  }
  offers: string[]
  currentProduct: Product
  modal: Modal | null
}

const initialState: AppState = {
  cart: {
    items: [],
  },
  offers: [],
  currentProduct: {
    id: '75842923002882',
    title: 'Yellow Rubber Dinghy',
    price: 999,
    image:
      'https://cdn.xsd.cz/resize/7988d76b5dac33088508dc9617a20aec_resize=1750,1123_.jpg?hash=227cd888646e7ccebfc45b6a99d3ed76',
    currency: 'CZK',
    quantity: 6,
    variants: ['small', 'medium', 'large'],
    description:
      'An exclusive limited edition of the presidential summer rubber dinghy, that will take your holidays to a completely new level. Available in three variants.',
  },
  modal: null,
}

export const AppStateContext = createContext(initialState)
// Preventing extra rerenders
export const AppDispatchContext = createContext<
  React.Dispatch<AddToCartAction | ToggleModalAction | AddOffer | ResetOffers> | undefined
>(undefined)

const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
