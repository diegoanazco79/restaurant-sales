export const invocesMockList = [
  {
    id: '1',
    invoiceType: 'Factura',
    date: '2023-05-01',
    client: {
      id: '123456',
      name: 'Juan Perez',
      typeDocument: 'DNI',
      document: '12345678',
      phone: '555-1234'
    },
    totalAmount: 100.50,
    user: {
      id: '100',
      username: 'jper',
      email: 'juan.perez@example.com',
      firstName: 'Juan',
      lastName: 'Perez',
      status: 'Activo',
      role: {
        id: '1',
        name: 'Admin'
      }
    }
  },
  {
    id: '2',
    invoiceType: 'Nota de crédito',
    date: '2023-04-15',
    client: {
      id: '789012',
      name: 'Ana Rodriguez',
      typeDocument: 'RUC',
      document: '78901234',
      phone: '555-5678'
    },
    totalAmount: 50.25,
    user: {
      id: '101',
      username: 'arod',
      email: 'ana.rodriguez@example.com',
      firstName: 'Ana',
      lastName: 'Rodriguez',
      status: 'Activo',
      role: {
        id: '2',
        name: 'Usuario'
      }
    }
  }
]
