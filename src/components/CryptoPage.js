import React, { useState, useEffect } from 'react';
import Pageheading from './PageHeading';
import { Container, Col, Card, Row } from 'react-bootstrap'
import Cryptos from './Cryptos';
import Pagination from './Pagination';

const CryptoPage = () => {
    //Fetch data her and then send down as props
    const [cryptosData, setCryptosData] = useState(['crypto1', 'crypto2','crypto3','crypto4','crypto5','crypto6',]);
    const [itemsPerPage, setItemsPerPage] = useState(6);


 



    return (
    
        <div className="main-content-container">
            <div className="main-content mt-4">
                <Pageheading>Crypto Currencies</Pageheading>
                <Pagination data={cryptosData} itemsPerPage={itemsPerPage} />
            
            </div>
        </div>
    );
};

export default CryptoPage;