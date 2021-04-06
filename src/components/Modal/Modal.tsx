import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import useDispatch from '../../hooks/useDispatch'
import useFetchData, { Data } from '../../hooks/useFetchData'
import { AppStateContext, Modal } from '../../state/AppState'
import Button from '../shared/Button'
import ModalItem from './components/ModalItem'

const ModalContainer = styled.div`
  ${tw`fixed bg-white z-10 max-w-3xl w-full rounded`}
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ModalSectionTitle = styled.div`
  ${tw` py-6 px-8 flex items-center justify-center relative`}
  border-bottom: 1px solid lightgray;
`
const ModalSectionHeader = styled.div`
  ${tw` py-4 px-8 flex items-center justify-between bg-gray-200`}
  border-bottom: 1px solid lightgray;
`

const ModalSectionBody = styled.div`
  ${tw`px-8`}
  border-bottom: 1px solid lightgray;
`

const ModalSectionFooter = styled.div`
  ${tw` px-8 flex items-center justify-end`}
`

const ModalHeader = styled.div`
  ${tw`flex items-center`}
`

const ModalImage = styled.img`
  ${tw`h-12 pr-8`}
`

const Overlay = styled.div`
  ${tw`fixed z-10`}
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

const CloseIcon = styled.span`
  ${tw`absolute font-bold cursor-pointer`}
  right: 12px;
  top: 10px;
  &:hover {
    opacity: 0.75;
  }
`

const ModalMessage = styled.div`
  ${tw`flex justify-center items-center p-20`}
`

interface Props {
  item: Modal
}

const ModalWindow: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch()
  const {offers} = useContext(AppStateContext)
  const { data, error, isLoading } = useFetchData<Data>(
    'https://mock-api-candy-rack.herokuapp.com/offers'
  )

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: null })
    setTimeout(() => alert(offers.reduce((acc, curr) => `${acc} ${curr}, `, "")), 1000)
  }

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: null })
  }



  const { title, currency, variant, image, price } = item

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <ModalContainer>
        <ModalSectionTitle>
          <CloseIcon onClick={handleClose}>✕</CloseIcon>
          <h2>Wait, don't miss your deals, today only!</h2>
        </ModalSectionTitle>
        <ModalSectionHeader>
          <ModalHeader>
            <ModalImage src={image} alt="Image" />
            <h4>
              {title}
              {variant ? ` - ${variant}` : ''}
            </h4>
          </ModalHeader>
          <h5>
            {price} {currency}
          </h5>
        </ModalSectionHeader>
        {error && (
          <ModalMessage>
            <h3>{error}</h3>
          </ModalMessage>
        )}
        {isLoading && (
          <ModalMessage>
            <h3>Loading...</h3>
          </ModalMessage>
        )}
        {!error && !isLoading && (
          <ModalSectionBody>
            {data &&
              data.offers.offers.map((offer) => (
                <ModalItem
                  currency={data.offers.currency}
                  key={offer.id}
                  data={offer}
                ></ModalItem>
              ))}
          </ModalSectionBody>
        )}
        <ModalSectionFooter>
          <Button
            text="Continue to checkout >"
            color="green"
            size="m"
            handleClick={handleSubmit}
          />
        </ModalSectionFooter>
      </ModalContainer>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalWindow
