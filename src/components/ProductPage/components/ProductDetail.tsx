import Dropdown from '../../shared/Dropdown'
import { useContext } from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import Button from '../../shared/Button'
import { Product } from '../../../state/AppState'
import { useState } from 'react'
import { Option } from 'react-dropdown'
import useAddToCart from '../../../hooks/useAddToCart'
import useDispatch from '../../../hooks/useDispatch'
import { AppStateContext } from '../../../state/AppState'
import transformVariants from '../../../utils/transformVariants'

interface Props {
  product: Product
}

const DetailContainer = styled.div`
  ${tw` flex-1 p-5`}
`

const Header = styled.h2`
  ${tw`text-lg font-bold`}
  margin-bottom: 8px!important;
`

const Description = styled.p`
  ${tw`mb-2`}
`

const ProductDetail: React.FC<Props> = ({
  product: {
    id,
    title,
    description,
    variants,
    price,
    currency,
    quantity,
    image,
  },
}) => {
  const [variant, setVariant] = useState<Option | null>(
    variants && transformVariants(variants)[0]
  )
  const addToCart = useAddToCart()
  const dispatch = useDispatch()
  const state = useContext(AppStateContext)

  const handleClick = () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        title,
        variant: variant && variant.value,
        price,
        currency,
        image,
      },
    })
    dispatch({
      type: 'RESET_OFFERS',
    })
    addToCart({ title, id, price, currency, variant: variant && variant.value })
  }

  console.log(state)
  return (
    <>
      <DetailContainer>
        <Header>{title}</Header>
        <Description>{description}</Description>
        <Description>
          <em>
            {quantity > 0
              ? `${quantity} ${quantity > 1 ? 'items' : 'items'} in stock`
              : 'Out of stock'}
          </em>
        </Description>
        <Description>
          <strong>
            Price: {price} {currency}
          </strong>
        </Description>
        {variants && (
          <Dropdown
            onChange={(o: Option) => setVariant(o)}
            variants={transformVariants(variants)}
            value={variant || undefined}
          />
        )}
        <Button text={'Add To Cart'} handleClick={handleClick} />
      </DetailContainer>
    </>
  )
}

export default ProductDetail
