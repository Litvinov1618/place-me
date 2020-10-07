import React from 'react'
import { DateRangePicker as DefaultDateRangePicker, IDateRangePickerProps } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import styled from 'styled-components'

const StyledDatePicker = styled(DefaultDateRangePicker)`
  justify-content: center;

  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const DateRangePicker: React.FC<IDateRangePickerProps> = (props) => <StyledDatePicker {...props} />

export default DateRangePicker 