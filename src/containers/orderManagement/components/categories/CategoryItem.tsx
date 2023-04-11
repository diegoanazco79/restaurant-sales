import CategoryBtn from './styled/CategoryButton'

interface Props {
  id: string
  name: string
  selected: boolean
}

const CategoryItem = ({ id, selected, name }: Props) => {
  return (
    <CategoryBtn
      id={`category-${name}-${id}`}
      selected={selected}
      variant="contained"
    >
      {name}
    </CategoryBtn>
  )
}

export default CategoryItem
