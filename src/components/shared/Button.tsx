import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'

interface Props {
  text: string
  color?: 'blue' | 'green'
  size?: 's' | 'm' | 'l'
  handleClick: (e:  React.MouseEvent<HTMLButtonElement>) => void;
}

type PropsNoText = Omit<Props, 'text'|'handleClick'>

const generateStyle = ({ size, color }: PropsNoText) => {
  if (color === 'blue') {
    if (size === 's') {
      return tw`bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded my-4`
    } else if (size === 'm') {
      return tw`bg-blue-400 hover:bg-blue-600 text-white font-bold py-3 px-6 border border-blue-700 rounded my-4`
    } else {
      return tw`bg-blue-400 hover:bg-blue-600 text-white font-bold py-4 px-8 border border-blue-700 rounded my-4`
    }
  } else {
    if (size === 's') {
      return tw`bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-700 rounded my-4`
    } else if (size === 'm') {
      return tw`bg-green-400 hover:bg-green-600 text-white font-bold py-3 px-6 border border-green-700 rounded my-4`
    } else {
      return tw`bg-green-400 hover:bg-green-600 text-white font-bold py-4 px-8 border border-green-700 rounded my-4`
    }
  }
}

// String interpolation does not work with tw``
const CustomButton = styled.button<PropsNoText>`
  ${({ color, size }) => generateStyle({ color, size })}
`

const Button: React.FC<Props> = ({
  text,
  color = 'blue',
  size = 's',
  handleClick,
}) => {
  return (
    <CustomButton color={color} size={size} onClick={handleClick}>
      {text}
    </CustomButton>
  )
}

export default Button
