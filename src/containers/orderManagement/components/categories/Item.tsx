import { CategoryItemButton } from '../styled/CategoryItem'

interface Props {
  id: string
  name: string
  selected: boolean
}

const Item = ({ id, selected, name }: Props) => {
  return (
    <CategoryItemButton
      id={`category-${name}-${id}`}
      selected={selected}
      variant="contained"
    >
      {name}
    </CategoryItemButton>
  )
}

export default Item
