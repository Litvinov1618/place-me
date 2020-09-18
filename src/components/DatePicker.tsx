import React from 'react'
import { DateRangePicker } from '@blueprintjs/datetime/lib/esm/dateRangePicker'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import { IDateRangePickerProps } from '@blueprintjs/datetime/lib/esm/dateRangePicker'

const DatePicker: React.FC<IDateRangePickerProps> = (props) => <DateRangePicker {...props} />

export default DatePicker
