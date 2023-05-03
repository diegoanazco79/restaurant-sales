import { Box, Button } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

import useRoomManagement from './hooks/useRoomManagement'

import { type Room } from 'pages/rooms/interfaces/Room'

interface FormValues {
  roomName: string
}

interface Props {
  actionType: string
  room?: Room
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const RoomManagement = ({ actionType, room, setShow }: Props) => {
  const { onAddRoom, onEditRoom } = useRoomManagement()

  const validationSchema = Yup.object({
    roomName: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    roomName: room?.name ?? ''
  }

  const handleSubmit = (values: FormValues) => {
    const newRoom = {
      id: room?.id ?? '',
      name: values.roomName
    }
    if (actionType === 'create') onAddRoom(newRoom, setShow)
    else onEditRoom(newRoom, setShow)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => { handleSubmit(values) }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Input
            className={{ mb: 2 }}
            label="Nombre"
            name="roomName"
            placeholder="Escribe aquí el nombre del ambiente"
          />

          <Box display="flex" justifyContent="space-between" pt={4}>
            <Button
              variant="contained" color="inherit"
              onClick={() => { setShow(false) }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {actionType === 'create' ? 'Añadir' : 'Editar'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default RoomManagement
