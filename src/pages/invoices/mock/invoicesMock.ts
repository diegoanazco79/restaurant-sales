export const invocesMockList = [
  {
    id: '1',
    invoiceType: 'Factura',
    date: '2023-05-01',
    client: {
      _id: '1',
      name: 'Juan Pérez',
      typeDocument: 'DNI',
      document: '12345678',
      phone: '111-111-111',
      email: '',
      subsidiary: '1',
      organization: '1'
    },
    totalAmount: 100.50,
    user: {
      _id: '100',
      username: 'jper',
      email: 'juan.perez@example.com',
      firstName: 'Juan',
      lastName: 'Perez',
      status: 'Activo',
      role: {
        _id: '1',
        name: 'Admin'
      }
    }
  },
  {
    id: '2',
    invoiceType: 'Nota de crédito',
    date: '2023-04-15',
    client: {
      _id: '2',
      name: 'Juan Pérez',
      typeDocument: 'DNI',
      document: '12345678',
      phone: '111-111-111',
      email: '',
      subsidiary: '1',
      organization: '1'
    },
    totalAmount: 50.25,
    user: {
      _id: '101',
      username: 'arod',
      email: 'ana.rodriguez@example.com',
      firstName: 'Ana',
      lastName: 'Rodriguez',
      status: 'Activo',
      role: {
        _id: '2',
        name: 'Usuario'
      }
    }
  }
]
