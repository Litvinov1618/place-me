const formatDate = (date: Date) => {
  const year = date.getFullYear() === new Date().getFullYear() ? '' : `, ${date.getFullYear()}`
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return `${months[date.getMonth()]} ${date.getDate()} ${year}`
}

export default formatDate