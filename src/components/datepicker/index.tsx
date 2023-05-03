import 'moment/locale/es'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import moment from 'moment'

import ActionButton from './styled/ActionButton'
import Header from './Header'
import MainBox from './styled/MainBox'
import MainButton from './styled/MainButton'

import 'react-datepicker/dist/react-datepicker.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { type RangeDateType, type DefaultDateType } from './interfaces/DatePicker'

interface Props {
  startDate: Date | null
  endDate: Date | null
  filterActive: boolean
  defaultOption: DefaultDateType['action']
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
  setDefaultOption: React.Dispatch<React.SetStateAction<string>>
  onApplyDefaultDate: ({ action, range }: DefaultDateType) => void
  onApplyRangeDate: ({ fromDate, toDate }: RangeDateType) => void
}

const DatePickerFilter = ({
  filterActive, defaultOption, startDate, endDate,
  setDefaultOption, setStartDate, setEndDate,
  onApplyDefaultDate, onApplyRangeDate
}: Props) => {
  const [open, setOpen] = useState(false)
  const mainBoxRef = useRef<HTMLDivElement>(null)

  const today = moment().startOf('day').toDate()
  const yesterday = moment().subtract(1, 'days')
  const startOfWeek = moment().startOf('week')

  const selectedToday = defaultOption === 'today'
  const selectedYesterday = defaultOption === 'yesterday'
  const selectedThisWeek = defaultOption === 'week'
  const selectedThisMonth = defaultOption === 'month'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mainBoxRef.current && !mainBoxRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mainBoxRef])

  /* Handles a Today button */
  const handleToday = () => {
    setStartDate(today)
    setEndDate(moment().endOf('day').toDate())
    setDefaultOption('today')
    onApplyDefaultDate({
      action: 'today',
      range: {
        fromDate: today,
        toDate: moment().endOf('day').toDate()
      }
    })
    setOpen(false)
  }

  /* Handles a Yesterday button */
  const handleYesterday = () => {
    setStartDate(yesterday.startOf('day').toDate())
    setEndDate(yesterday.endOf('day').toDate())
    setDefaultOption('yesterday')
    setOpen(false)
    onApplyDefaultDate({
      action: 'yesterday',
      range: {
        fromDate: yesterday.startOf('day').toDate(),
        toDate: yesterday.endOf('day').toDate()
      }
    })
  }

  /* Handles a This Week button */
  const handleThisWeek = () => {
    setStartDate(startOfWeek.startOf('day').toDate())
    setEndDate(moment().endOf('day').toDate())
    setDefaultOption('week')
    setOpen(false)
    onApplyDefaultDate({
      action: 'week',
      range: {
        fromDate: startOfWeek.startOf('day').toDate(),
        toDate: moment().endOf('day').toDate()
      }
    })
  }

  /* Handles a This Month button */
  const handleThisMonth = () => {
    setStartDate(moment().startOf('month').toDate())
    setEndDate(moment().endOf('day').toDate())
    setDefaultOption('month')
    setOpen(false)
    onApplyDefaultDate({
      action: 'month',
      range: {
        fromDate: moment().startOf('month').toDate(),
        toDate: moment().endOf('day').toDate()
      }
    })
  }

  /* Handles a date range */
  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  /* Handles a Apply button */
  const handleApply = () => {
    setOpen(false)
    onApplyRangeDate({
      fromDate: startDate,
      toDate: endDate
    })
  }

  /* Handles a Main button */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setOpen(!open)
  }

  const headerProps = {
    selectedToday,
    selectedYesterday,
    selectedThisWeek,
    selectedThisMonth,
    handleToday,
    handleYesterday,
    handleThisWeek,
    handleThisMonth
  }

  return (
    <>
      <MainButton
        selected={filterActive}
        variant="outlined"
        fullWidth
        disableElevation
        onClick={handleClick}
        startIcon={<CalendarMonthIcon />}
        open={open}
      >
        Filtrar por fecha
      </MainButton>
      {open && (
        <MainBox ref={mainBoxRef}>
          <Header {...headerProps} />
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            inline
            maxDate={moment().toDate()}
            locale={es}
          />
          <ActionButton
            selected={false}
            fullWidth
            variant='outlined'
            onClick={handleApply}
          >
            Aplicar Filtro
          </ActionButton>
        </MainBox>
      )}
    </>
  )
}

export default DatePickerFilter
