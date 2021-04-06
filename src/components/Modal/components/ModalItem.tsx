import { useState } from 'react'
import { Offer } from '../../../hooks/useFetchData'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import { Option } from 'react-dropdown'
import transformVariants from '../../../utils/transformVariants'
import Dropdown from '../../shared/Dropdown'
import Button from '../../shared/Button'
import useAddToCart from '../../../hooks/useAddToCart'
import useDispatch from '../../../hooks/useDispatch'

const ModalItemContainer = styled.div`
  ${tw` ml-8 flex items-center justify-between`}
  border-left: 1px solid lightgray;
  &:before {
    content: '';
    position: absolute;
    border-bottom: 1px lightgray solid;
    height: 25px;
    width: 25px;
    transform: translateY(-50%);
  }
`

const ModalItemImage = styled.img`
  ${tw`h-8 pr-2`}
`

const Description = styled.p`
  ${tw`m-0 text-sm`}
`

const ModalItemTitle = styled.span`
  ${tw`text-l font-bold`}
`

const CrossedPrice = styled.span`
  ${tw`line-through text-gray-600`}
`

const ModalItemContainerSection = styled.div`
  ${tw`flex ml-6 items-center justify-end`}
`

interface Props {
  data: Offer
  currency: string
}

const ModalItem: React.FC<Props> = ({
  currency,
  data: {
    title,
    discounted_price,
    id,
    original_price,
    variants,
    image,
    short_description,
  },
}) => {
  const addToCart = useAddToCart()
  const dispatch = useDispatch()
  const [variant, setVariant] = useState<Option | null>(
    variants && transformVariants(variants)[0]
  )
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addToCart({
      title,
      id,
      price: discounted_price || original_price,
      currency,
      variant: variant && variant.value,
    })
    dispatch({
      type: 'ADD_OFFER',
      payload: `${id} - ${title} - ${(variant && variant.value) || ''}`,
    })
    setAdded(true)
  }

  return (
    <ModalItemContainer>
      <ModalItemContainerSection>
        <ModalItemImage src={image} />
        <div>
          <Description>
            <ModalItemTitle>{title}</ModalItemTitle>,{' '}
            {discounted_price ? (
              <>
                <CrossedPrice>
                  {original_price} {currency}
                </CrossedPrice>
                ,{' '}
                <span>
                  {discounted_price} {currency}
                </span>
              </>
            ) : (
              <span>
                {original_price} {currency}
              </span>
            )}
          </Description>
          <Description>{short_description}</Description>
        </div>
      </ModalItemContainerSection>
      <ModalItemContainerSection>
        {added ? (
          <p>
            <i>✔ Item was added</i>
          </p>
        ) : (
          <>
            {variants && (
              <Dropdown
                onChange={(o: Option) => setVariant(o)}
                variants={transformVariants(variants)}
                value={variant || undefined}
              />
            )}
            <Button
              text="+Add"
              color="green"
              size="s"
              handleClick={handleClick}
            />
          </>
        )}
      </ModalItemContainerSection>
    </ModalItemContainer>
  )
}

export default ModalItem
