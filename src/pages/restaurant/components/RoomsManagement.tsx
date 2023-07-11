import { Box, Button, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Select, { type Option } from 'components/form/Select'
import Input from 'components/form/Input'

import { type Room } from 'pages/rooms/interfaces/Room'
import { type TableType } from '../interfaces/Tables'

interface FormValues {
  tableName: string
  room: Option | null
}

interface Props {
  table?: TableType
  roomsList: Room[]
  actionType: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onFinishModal: (newTable: TableType) => Promise<void>
}

const RoomsManagement = ({ table, roomsList, actionType, setShow, onFinishModal }: Props) => {
  const [currentRoom, setCurrentRoom] = useState(table?.room ?? null)

  const validationSchema = Yup.object({
    tableName: Yup.string().required('* Este campo es obligatorio'),
    room: Yup.object().nullable().required('* Este campo es obligatorio')
  })

  const initialValues = {
    tableName: table?.name ?? '',
    room: { id: currentRoom?._id ?? '', label: currentRoom?.name ?? '' } ?? null
  }

  const handleSubmit = async (values: FormValues) => {
    const newTable = {
      _id: table?._id ?? '',
      name: values.tableName ?? '',
      room: { _id: values.room?.id ?? '', name: values.room?.label ?? '' },
      status: table?.status ?? 'empty',
      subsidiary: table?.subsidiary ?? '',
      organization: table?.organization ?? ''
    }
    await onFinishModal(newTable)
  }

  const formatedRooms = roomsList.map((room) => ({
    id: room._id,
    label: room.name
  }))

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => { await handleSubmit(values) }}
    >
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <Form>
            <Stack spacing={2}>
              <Input
                label='Nombre de Mesa'
                name="tableName"
                placeholder="Escribe aquí el nombre de tu mesa"
              />
              <Select
                label="Ambiente"
                placeholder='Busque o seleccione el ambiente'
                name="room"
                options={formatedRooms}
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  value: Option | null
                ) => {
                  setFieldValue('room', value)
                  setCurrentRoom({ _id: value?.id ?? '', name: value?.label ?? '' })
                }}
                value={{ id: currentRoom?._id ?? '', label: currentRoom?.name ?? '' }}
              />
              <Box display='flex' justifyContent='space-between'>
                <Button
                  variant='contained'
                  color='inherit'
                  onClick={() => { setShow(false) }}
                >
                Cancelar
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  {actionType === 'edit' ? 'Editar' : 'Añadir'}
                </Button>
              </Box>
            </Stack>
          </Form>
        )
      }}
    </Formik>)
}

export default RoomsManagement
