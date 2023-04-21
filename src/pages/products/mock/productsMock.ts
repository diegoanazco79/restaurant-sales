const productsMock = [
  {
    id: '009',
    name: 'Chicharron de Chancho',
    types: [],
    price: 18.0,
    isInfinite: true,
    category: { id: 'picantería_id', name: 'Picantería' }
  },
  {
    id: '001',
    name: 'Ceviche',
    types: [
      { id: 'ceviche_001', name: 'Porción', price: 20.0, stockQuantity: 15 },
      { id: 'ceviche_002', name: 'Familiar', price: 35.0, stockQuantity: 10 }
    ],
    isInfinite: true
  },
  {
    id: '002',
    name: 'Lomo Saltado',
    types: [
      { id: 'lomo_001', name: 'Individual', price: 18.0, stockQuantity: 20 },
      { id: 'lomo_002', name: 'Doble', price: 30.0, stockQuantity: 12 }
    ],
    isInfinite: true,
    category: { id: 'especial_id', name: 'Especiales' }
  },
  {
    id: '010',
    name: 'Pisco Sour',
    types: [],
    price: 20.0,
    isInfinite: false,
    stockQuantity: 30,
    category: { id: 'drinks_id', name: 'Bebidas' }
  },
  {
    id: '011',
    name: 'Pie de Limón',
    types: [],
    price: 16.0,
    isInfinite: true,
    category: { id: 'postres_id', name: 'Postres' }
  }
]

export default productsMock
