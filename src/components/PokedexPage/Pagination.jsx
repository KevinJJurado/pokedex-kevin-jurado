import React, { useRef } from 'react'


const Pagination = ({ productsPerPage, max, currentPage, setCurrentPage}) => {
  
  const pageNumbers = []

  const p = Math.ceil(max/productsPerPage)
  
  for (let i = 1; i <= p; i++) {
    pageNumbers.push(i)
  }
  const previusPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const pageActual = (p) => {
    setCurrentPage(p)
  } 
  return (
    <nav className="pagination">
      <a onClick={previusPage} className={`pagination-previous ${currentPage === 1 ? 'is-disable' : ''}`}>Previous</a>
      <ul className="pagination-list">
        {
          pageNumbers.map(page => (
            <li key={page}>
              <a className={`pagination-link ${page === currentPage ? 'is-current' : ''}`} onClick={() => pageActual(page)}>
                {page}
              </a>
            </li>
          ))
        }
      </ul>
      <a onClick={nextPage} className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disable' : ''}`}>Next Page</a>
    </nav>
  )
}

export default Pagination
