import React from 'react'

function formatDate(dateString) {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export default function ItemPeminjam(props) {
  const lateString = props.late ? 'Iya' : 'Tidak'
  const returnDateString = props.returnDate
    ? formatDate(props.returnDate)
    : 'belum'

  return (
    <>
      <tr>
        <td colSpan="3">{props.name}</td>
        <td colSpan="3">{props.book}</td>
        <td colSpan="3">{lateString}</td>
        <td colSpan="3">{returnDateString}</td>
      </tr>
      <tr></tr>
    </>
  )
}
