import {
  DRAW_LOAD_BOOK,
  SUCCESS_DELETE_LETTER,
  FAILED_DELETE_LETTER,
  DRAW_LOAD_BORROWING
} from '../constants'

import axios from 'axios'

export const addBorrow = (id) => {
  console.log(id, 'rrrrr')
  return (dispatch) => {
    return axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}api/borrow`,
        { BookId: id },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
      .then(function () {
        alert('Buku berhasil dipinjam')
      })
      .catch(function (error) {
        alert(error.response.data.message)
      })
  }
}

export const addBReturnBook = (borrowingId) => {
  console.log(borrowingId, 'rrrrr')
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/return/${borrowingId}`, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then(function () {
        alert('Buku berhasil dikembalikan')
      })
      .catch(function (error) {
        alert(error.response.data.message)
      })
  }
}

const drawLoadBook = (books) => ({
  type: DRAW_LOAD_BOOK,
  books
})

const drawLoadBorrowing = (borrows) => ({
  type: DRAW_LOAD_BORROWING,
  borrows
})

export const loadBook = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_SERVER_URL}api/book`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then((books) => {
        dispatch(drawLoadBook(books.data))
      })
      .catch(function (error) {
        window.location = '/'
        throw error
      })
  }
}

export const loadBorrowing = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_SERVER_URL}api/borrow`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then((borrows) => {
        console.log(borrows.data, 'ttttt')
        dispatch(drawLoadBorrowing(borrows.data))
      })
      .catch(function (error) {
        window.location = '/'
        throw error
      })
  }
}

const successDeleteLetter = (id) => ({
  type: SUCCESS_DELETE_LETTER,
  id
})

const failedDeleteLetter = (id) => ({
  type: FAILED_DELETE_LETTER,
  id
})

export const deletedLetter = (id) => (dispatch) => {
  var result = window.confirm('want to delete ?')
  if (result) {
    return axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/letter/${id}`)
      .then(function (response) {
        console.log(response)
        dispatch(successDeleteLetter(id))
      })
      .catch(function (error) {
        console.error(error)
        dispatch(failedDeleteLetter(id))
      })
  } else {
    window.location = '/list'
  }
}

export const updateLetter = (formData, _id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/letter/${_id}`, formData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function () {})
      .catch(function (error) {
        throw error
      })
  }
}
