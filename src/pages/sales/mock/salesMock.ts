export const salesMockList = [
  {
    id: '1',
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
    typeSale: 'Online',
    totalAmount: 200,
    date: '2023-05-01',
    invoice: 'ABC123',
    user: {
      _id: '1',
      username: 'j_perez',
      email: 'juanperez@example.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      status: 'active',
      role: {
        _id: '1',
        name: 'Administrator'
      }
    }
  },
  {
    id: '2',
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
    typeSale: 'In-store',
    totalAmount: 500,
    date: '2023-05-02',
    invoice: 'DEF456',
    user: {
      _id: '2',
      username: 'a_gomez',
      email: 'anagomez@example.com',
      firstName: 'Ana',
      lastName: 'Gómez',
      status: 'active',
      role: {
        _id: '2',
        name: 'Salesperson'
      }
    }
  },
  {
    id: '3',
    client: {
      _id: '3',
      name: 'Juan Pérez',
      typeDocument: 'DNI',
      document: '12345678',
      phone: '111-111-111',
      email: '',
      subsidiary: '1',
      organization: '1'
    },
    typeSale: 'Online',
    totalAmount: 100,
    date: '2023-05-03',
    invoice: 'GHI789',
    user: {
      _id: '3',
      username: 'c_rodriguez',
      email: 'carlosrodriguez@example.com',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      status: 'active',
      role: {
        _id: '2',
        name: 'Salesperson'
      }
    }
  },
  {
    id: '4',
    client: {
      _id: '4',
      name: 'Juan Pérez',
      typeDocument: 'DNI',
      document: '12345678',
      phone: '111-111-111',
      email: '',
      subsidiary: '1',
      organization: '1'
    },
    typeSale: 'In-store',
    totalAmount: 750,
    date: '2023-05-03',
    invoice: 'JKL012',
    user: {
      _id: '2',
      username: 'j_perez',
      email: 'juanperez@example.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      status: 'active',
      role: {
        _id: '1',
        name: 'Administrator'
      }
    }
  },
  {
    id: '5',
    client: {
      _id: '5',
      name: 'Juan Pérez',
      typeDocument: 'DNI',
      document: '12345678',
      phone: '111-111-111',
      email: '',
      subsidiary: '1',
      organization: '1'
    },
    typeSale: 'Online',
    totalAmount: 300,
    date: '2023-05-03',
    invoice: 'MNO345',
    user: {
      _id: '4',
      username: 'm_lopez',
      email: 'marialopez@example.com',
      firstName: 'María',
      lastName: 'López',
      status: 'active',
      role: {
        _id: '3',
        name: 'Customer Support'
      }
    }
  }
]
