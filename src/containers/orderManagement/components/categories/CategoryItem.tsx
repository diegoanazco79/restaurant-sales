import CategoryBtn from './styled/CategoryButton'

interface Props {
  id: string
  name: string
  selected: boolean
  onSelectCategory: (categoryId: string) => void
}

const CategoryItem = ({ id, selected, name, onSelectCategory }: Props) => {
  return (
    <CategoryBtn
      id={`category-${name}-${id}`}
      selected={selected}
      variant="contained"
      onClick={() => { onSelectCategory(id) }}
    >
      {name}
    </CategoryBtn>
  )
}

export default CategoryItem
