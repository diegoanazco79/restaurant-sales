import { Box, Button } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Input from 'components/form/Input'

import { type Room } from 'pages/rooms/interfaces/Room'

interface FormValues {
  roomName: string
}

interface Props {
  actionType: string
  room?: Room
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (newRoom: Room) => Promise<void>
}

const RoomManagement = ({ actionType, room, setShow, onFinishModal }: Props) => {
  const validationSchema = Yup.object({
    roomName: Yup.string().required('* Este campo es obligatorio')
  })

  const initialValues = {
    roomName: room?.name ?? ''
  }

  const handleSubmit = async (values: FormValues) => {
    const newRoom = {
      _id: room?._id ?? '',
      name: values.roomName ?? '',
      subsidiary: room?.subsidiary ?? '',
      organization: room?.organization ?? '',
      createdAt: room?.createdAt ?? '',
      updatedAt: room?.updatedAt ?? ''
    }
    await onFinishModal(newRoom)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => { await handleSubmit(values) }}
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
