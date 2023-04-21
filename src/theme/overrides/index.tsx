import Autocomplete from './Autocomplete'
import Backdrop from './Backdrop'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Card from './Card'
import Chip from './Chip'
import Input from './Input'
import Paper from './Paper'
import Table from './Table'
import Tooltip from './Tooltip'
import Typography from './Typography'

export default function ComponentsOverrides (theme: any) {
  return Object.assign(
    Autocomplete(theme),
    Backdrop(theme),
    Button(theme),
    ButtonGroup(theme),
    Card(theme),
    Chip(theme),
    Input(theme),
    Paper(),
    Table(theme),
    Tooltip(theme),
    Typography(theme)
  )
}
