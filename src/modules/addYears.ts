const addYears = (date: Date, years: number) => {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

export default addYears