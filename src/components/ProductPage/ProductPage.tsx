import ProductDetail from './components/ProductDetail'
import ProductImage from './components/ProductImage'
import ModalWindow from '../Modal/Modal'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import { useContext } from 'react'
import { AppStateContext } from '../../state/AppState'

const Container = styled.div`
  ${tw`w-screen h-screen flex justify-center items-center bg-gray-100`}
`

const ProductContainer = styled.div`
  ${tw`max-w-3xl max-h-3xl flex `}
`

const ProductPage = () => {
  const { currentProduct, modal } = useContext(AppStateContext)
  return (
    <Container>
      {modal && <ModalWindow item={modal} />}
      <ProductContainer>
        <ProductImage src={currentProduct.image} />
        <ProductDetail product={currentProduct} />
      </ProductContainer>
    </Container>
  )
}

export default ProductPage
