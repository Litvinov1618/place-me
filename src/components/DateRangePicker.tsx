import React from 'react'
import { DateRangePicker as DefaultDateRangePicker } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import { IDateRangePickerProps } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import styled from 'styled-components'

const StyledDatePicker = styled(DefaultDateRangePicker)`
  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const DateRangePicker: React.FC<IDateRangePickerProps> = (props) => <StyledDatePicker {...props} />

export default DateRangePicker 