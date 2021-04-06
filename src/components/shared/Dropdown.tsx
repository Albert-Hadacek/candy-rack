import 'react-dropdown/style.css'
import ReactDropdown, { Option } from 'react-dropdown'
import styled from 'styled-components'
import tw from 'tailwind.macro'



interface Props {
  variants: Option[]
  onChange(o: Option): void
  value?: string | Option | undefined 
}

const DropdownCustom = styled(ReactDropdown)`
  ${tw`w-1/2 mr-6`}
`

const Dropdown: React.FC<Props> = ({ variants, onChange, value}) => {
  
  return <DropdownCustom value={value} options={variants} onChange={onChange}/>
}

export default Dropdown
