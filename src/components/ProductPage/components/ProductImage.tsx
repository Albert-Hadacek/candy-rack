import styled from 'styled-components'
import tw from 'tailwind.macro'

interface Props {
  src: string
}

const ImageContainer = styled.div`
  ${tw`flex-1`}
`

const Image = styled.img`
  ${tw`max-w-full relative`}
  top: 50%;
  transform: translateY(-50%);
`

const ProductImage: React.FC<Props> = ({ src }) => (
  <ImageContainer>
    <Image src={src} alt="Yellow Boat" />
  </ImageContainer>
)

export default ProductImage
