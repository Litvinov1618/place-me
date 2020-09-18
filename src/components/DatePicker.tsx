import React from 'react'
import { DateRangePicker } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import { IDateRangePickerProps } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import styled from 'styled-components'

const StyledDatePicker = styled(DateRangePicker)`
  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const DatePicker: React.FC<IDateRangePickerProps> = (props) => <StyledDatePicker {...props} />

export default DatePicker
