import React from 'react';
import './Pagination.css'; 

function Pagination({ nPages, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }

    return (
        <div className="pagination-container"> 
            <div className="pagination-wrapper"> 
                <div>
                    <ul className='pagination'>
                        <li className="page-item">
                            <a className="page-link prev-next" 
                                onClick={prevPage} 
                                href='#'>
                                Anterior
                            </a>
                        </li>
                        {pageNumbers.map(pgNumber => (
                            <li key={pgNumber} 
                                className={`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                                <a onClick={() => setCurrentPage(pgNumber)}  
                                    className='page-link' 
                                    href='#'>
                                    {pgNumber}
                                </a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link prev-next" 
                                onClick={nextPage}
                                href='#'>
                                Siguiente
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Pagination;
