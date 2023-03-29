import { Divider, Typography } from '@mui/material'

interface Props {
  title: string
}

const TitlePage = ({ title }: Props) => {
  return (
    <>
      <Typography variant='h4'>{title}</Typography>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  )
}

export default TitlePage
