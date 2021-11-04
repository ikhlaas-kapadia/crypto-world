import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Row } from 'react-bootstrap';

const CryptoList = (props) => {
   const paginatedData = props.paginatedData;
  
   
    return (
            <Container className="crypto-list-container">
                <Row>
                    
                        {paginatedData && paginatedData.map((item, index) => (
                            <Col sm={6} md={6} lg={4} xl={3} className="mb-4" key={item.rank}>
                                <Card className="crypto-card">
                                    <Card.Header className="text-center d-flex justify-content-between">
                                        <span>{item.rank}. {item.data}</span> <span>logo</span>
                                    </Card.Header>
                                    <Card.Body  >
                                        <Card.Text className="text-left">
                                        <p>Price: <span className="list-value">46k</span></p>
                                        <p>Market Cap: <span className="list-value">3b</span></p>
                                        <p>Daily change: <span className="list-value">25%</span></p>
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
    const [itemsPerPage, setItemsPerPage] = useState(props.itemsPerPage);
    const [firstPage, setFirstPage] = useState(null);
    const [lastPage, setLastPage] = useState(null);
    const [endIndex, setEndIndex] = useState(null);
    const [startIndex, setStartIndex] = useState(null);
    const [paginatedData, setPaginatedData] = useState([]);
    


    useEffect(()=>{
        if(props.data) {
            setPages(Math.ceil(props.data.length / props.itemsPerPage));
            setItemsPerPage(props.itemsPerPage);
            setFirstPage(props.data.length - (props.data.length - 1));
            setLastPage(Math.ceil(props.data.length / props.itemsPerPage));
            let endIndex = (currentPage * itemsPerPage) - 1;
            let startIndex = (endIndex - itemsPerPage) + 1;
            let paginatedData = [];
            for (let i = startIndex; i <= endIndex; i++) {
                const element = {'rank': i + 1, 'data': props.data[i]};
                paginatedData.push(element);
                
            }
            setEndIndex(endIndex);
            setStartIndex(startIndex);
            setPaginatedData(paginatedData);
           
        }
    },[currentPage]);

    const handlePageChange = (e) => {

            console.log('clicked');
            console.dir(e);
            setCurrentPage(e.target.value);
        
    }

    const handlePrevNextChange = (direction) => {
           if(direction === 'increment') {
             console.log('incremented');
            setCurrentPage((currentPage) => {
                return currentPage + 1;
            })
        } else if(direction === 'decrement'){
             console.log('decremented');
      
             setCurrentPage((currentPage) => {
                return currentPage - 1;
            })
        }
    }

 
    return (
        <>
        <CryptoList paginatedData={paginatedData}/>
        {pages > 1 &&  
        <div className="container">
            <div className="row pagination-container justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onclick={(e)=>{ handlePageChange(e)}}> <a className="page-link active" href="#">{firstPage}</a> </li>
                    <li className="page-item" ><a className="page-link" href="#" aria-label="Previous" onClick={(e)=>{handlePrevNextChange('decrement')}} ><span aria-hidden="true">&laquo;</span></a></li>
                    <li className="page-item"> <a className="page-link active" href="#">{currentPage}</a> </li>
                    <li className="page-item" ><a className="page-link" href="#" aria-label="Next" onClick={(e)=>{handlePrevNextChange('increment')}}><span aria-hidden="true">&raquo;</span></a></li>
                    <li className="page-item" onclick={(e)=>{ handlePageChange()}}> <a className="page-link active" href="#" >{lastPage}</a> </li>

                </ul>
            </nav>
            </div>
        </div>}
       
        </>
    );
};

export default Pagination;