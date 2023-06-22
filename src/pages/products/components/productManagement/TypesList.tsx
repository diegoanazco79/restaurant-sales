import { useState } from 'react'
import { Button, Typography } from '@mui/material'

import Modal from 'components/modal/Modal'
import TypeItem from './TypeItem'
import TypeManagement from './TypeManagement'
import TypesHeader from './TypesHeader'

import { pxToRem } from 'theme/helpers/functions'

import { type ProductType, type Product } from 'pages/products/interfaces/Products'

import { initialProductType } from 'pages/products/helpers/constants'

interface Props {
  product?: Product
  setFieldValue: (field: string, value: any) => void
  onEditProductType: (typeId: ProductType['_id'], newType: ProductType) => void
  onAddProductType: (type: ProductType) => void
  onDeleteProductType: (iProduct: number) => void
}

const TypesList = ({
  product,
  setFieldValue,
  onDeleteProductType, onEditProductType, onAddProductType
}: Props) => {
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [currentType, setCurrentType] = useState<ProductType>(initialProductType)

  const onEditType = (type: ProductType) => {
    setCurrentType(type)
    setShowTypeModal(true)
  }

  /* Component's Props */
  const typeManagementProps = {
    product,
    currentType,
    actionType: currentType === initialProductType ? 'create' : 'edit',
    setShowTypeModal,
    setFieldValue,
    onEditProductType,
    onAddProductType
  }

  return (
    <>
      <Typography
        variant="body2" fontWeight={600} mb={`${pxToRem(4)} !important`} >
        Tipos
      </Typography>
      {product && product?.types.length > 0 && <TypesHeader/>}
      {product?.types.map((type, idx) => (
        <TypeItem
          key={idx}
          idx={idx}
          type={type}
          onDeleteProductType={onDeleteProductType}
          onEditType={onEditType}
        />
      ))}
      <Button
        variant="text" sx={{ width: 'fit-content', mt: '0 !important', mb: 2 }}
        onClick={() => { setShowTypeModal(true) }}
      >
        + Añadir tipo
      </Button>
      <Modal
        open={showTypeModal}
        setOpen={setShowTypeModal}
        title={currentType === initialProductType ? 'Añadir tipo' : 'Editar tipo'}
      >
        <TypeManagement {...typeManagementProps} />
      </Modal>
    </>
  )
}

export default TypesList
