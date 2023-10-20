import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBook } from '../actions/borrowBook'
import BookItem from './ItemBuku'
import { Container } from 'react-bootstrap'

function ListBuku() {
  const { borrowBook } = useSelector((state) => ({
    borrowBook: state.borrowBook
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBook())
  }, [dispatch])

  function Logout(event) {
    event.preventDefault()
    localStorage.clear()
    window.location = '/login'
  }

  const nodeList = borrowBook.map((item, index) => (
    <BookItem {...item} key={index} index={index + 1} />
  ))

  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Container>
              <h1 style={{ marginTop: '1%' }} className="h3 mb-4 text-gray-800">
                List Buku
              </h1>
              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-striped "
                      style={{ border: '1px solid black' }}
                    >
                      <thead>
                        <tr>
                          <th colSpan="3">Nama</th>
                          <th colSpan="3">Penerbit</th>
                          <th colSpan="3">
                            <div>Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>{nodeList}</tbody>
                    </table>
                    <button className="btn btn-danger" onClick={Logout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* JS Scripts */}
      <script></script>
    </div>
  )
}

export default ListBuku
