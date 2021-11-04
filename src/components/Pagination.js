import millify from 'millify';
import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Row } from 'react-bootstrap';

const CryptoList = (props) => {
   const paginatedData = props.paginatedData;
  
   
    return (
            <Container className="crypto-list-container">
                <Row>
                        {paginatedData && paginatedData.map((currency, index) => (
                            <Col sm={6} md={6} lg={4} xl={3} className="mb-4" key={currency.rank}>
                                <Card className="crypto-card">
                                    <Card.Header className="text-center d-flex justify-content-between">
                                        <span className="align-self-center">{currency.rank} - {currency.name}</span> 
                                        <div><img className="coin-icon" src={currency.iconUrl} alt={currency.name} logo/></div>
                                    </Card.Header>
                                    <Card.Body  >
                                        <Card.Text className="text-left">
                                        <p>Price:  <span className="list-value">${millify(currency.price)}</span></p>
                                        <p>Market Cap: <span className="list-value">{millify(currency.marketCap)}</span></p>
                                        <p>Daily change: <span className="list-value">{currency.change < 0 ? currency.change : '+' + currency.change} %</span></p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    
                </Row>
            </Container>
    );
};

const Pagination = (props) => {
    const {data} = props;

    const [pages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstPage, setFirstPage] = useState(null);
    const [lastPage, setLastPage] = useState(null);
    const [endIndex, setEndIndex] = useState(null);
    const [startIndex, setStartIndex] = useState(null);
    const [paginatedData, setPaginatedData] = useState(null);
    


    useEffect(()=>{
        if(data.coins.length > 0) {
            setPages(Math.ceil(data.coins.length / props.itemsPerPage));
            setFirstPage(data.coins.length - (data.coins.length - 1));
            setLastPage(Math.ceil(data.coins.length / props.itemsPerPage));
            let endIndex = (currentPage * props.itemsPerPage) - 1;
            let startIndex = (endIndex - props.itemsPerPage) + 1;
            let paginatedData = [];
            for (let i = startIndex; i <= endIndex; i++) {
                const element = data.coins[i];
                if(element) {
                    paginatedData.push(element);
                }
                
            }
          
            setEndIndex(endIndex);
            setStartIndex(startIndex);
            setPaginatedData(paginatedData);
           
        }
    },[currentPage]);

    const handlePageChange = (e) => {

            console.log('clicked');
             setCurrentPage(Number(e.target.childNodes[0].data));
        
    }

    const handlePrevNextChange = (direction) => {
           if(direction === 'increment' && currentPage < lastPage) {
             console.log('incremented');
            setCurrentPage((currentPage) => {
                return currentPage + 1;
            })
        } else if(direction === 'decrement' && currentPage > firstPage){
             console.log('decremented');
      
             setCurrentPage((currentPage) => {
                return currentPage - 1;
            })
        }
    }

 
    return (
        <>
        <CryptoList paginatedData={paginatedData}/>
        {pages > 0 && <div className="container">
            <div className="row pagination-container justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={(e)=>{ handlePageChange(e)}}> <a className="page-link active" href="#">{firstPage}</a> </li>
                    <li className="page-item" ><a className="page-link" href="#" aria-label="Previous" onClick={(e)=>{handlePrevNextChange('decrement')}}><span aria-hidden="true">&laquo;</span></a></li>
                    <li className="page-item"> <a className="page-link active" href="#">{currentPage}</a> </li>
                    <li className="page-item" ><a className="page-link" href="#" aria-label="Next" onClick={(e)=>{handlePrevNextChange('increment')}}><span aria-hidden="true">&raquo;</span></a></li>
                    <li className="page-item" onClick={(e)=>{ handlePageChange(e)}}> <a className="page-link active" href="#">{lastPage}</a> </li>

                </ul>
            </nav>
            </div>
        </div>}
        
        </>
    );
};

export default Pagination;