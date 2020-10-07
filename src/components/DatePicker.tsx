import React from 'react'
import { DatePicker as DefaultDatePicker, IDatePickerProps } from '@blueprintjs/datetime/lib/esm/datePicker'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import styled from 'styled-components'

const StyledDatePicker = styled(DefaultDatePicker)`
  justify-content: center;
`

const DatePicker: React.FC<IDatePickerProps> = (props) => <StyledDatePicker {...props} />

export default DatePicker
