import { SummaryLayout } from '../styled/SummaryLayout'

import Item from './Item'
import HeaderColumns from './HeaderColumns'

const OrderSummary = () => {
  return (
    <SummaryLayout maxWidth='xl'>
      <HeaderColumns />
      <Item
        id='1'
        name='Coca Cola'
        price={5}
      />
    </SummaryLayout>
  )
}

export default OrderSummary
