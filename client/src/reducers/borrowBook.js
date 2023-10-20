import {
  DRAW_ADD_LETTER,
  DRAW_LOAD_BORROWING,
  DRAW_LOAD_BOOK,
  FAILED_ADD_LETTER,
  FAILED_DELETE_LETTER,
  SUCCESS_DELETE_LETTER
} from '../constants'

const initialState = {
  createdAt: ''
}

const borrowBook = (state = [initialState], action) => {
  switch (action.type) {
    case DRAW_LOAD_BOOK:
      console.log(action)
      return action.books.map((item) => {
        return {
          name: item.name,
          author: item.author,
          createdAt: item.createdAt,
          id: item.id
        }
      })
    case DRAW_LOAD_BORROWING:
      return action.borrows.borrowingData.map((item) => {
        console.log(item, 'hhhhh')
        return {
          name: item.borrowing.User.name,
          book: item.borrowing.Book.name,
          late: item.isLate,
          returnDate: item.borrowing.returnDate
        }
      })
    case DRAW_ADD_LETTER:
      return [
        ...state,
        {
          price: action.price,
          name: action.name,
          day: action.day,
          idCar: action.idCar,
          start: action.start,
          end: action.end,
          createdAt: action.createdAt,
          sent: true
        }
      ]

    case FAILED_DELETE_LETTER:

    // eslint-disable-next-line no-fallthrough
    case SUCCESS_DELETE_LETTER:
      return state.filter((item) => {
        return item._id !== action._id
      })

    case FAILED_ADD_LETTER:
      return state.map((item) => {
        if (item._id === action._id) {
          item.sent = false
        }
        return item
      })

    default:
      return state
  }
}

export default borrowBook
