import React from 'react'

import { useDispatch } from 'react-redux'
import { addBReturnBook, addBorrow } from '../actions/borrowBook'

export default function BookItem(props) {
  const dispatch = useDispatch()

  const handleBorrow = (event) => {
    event.preventDefault()

    dispatch(addBorrow(props.id))
  }

  const handleReturn = (event) => {
    event.preventDefault()

    dispatch(addBReturnBook(props.id))
  }

  return (
    <>
      <tr>
        <td colSpan="3">{props.name}</td>
        <td colSpan="3">{props.author}</td>
        <td colSpan="3">
          <div>
            <button className="btn btn-primary" onClick={handleBorrow}>
              Pinjam
            </button>
            <button className="btn btn-success" onClick={handleReturn}>
              Balik
            </button>
          </div>
        </td>
      </tr>
      <tr></tr>
    </>
  )
}
