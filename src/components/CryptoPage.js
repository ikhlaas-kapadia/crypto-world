import React, { useState, useEffect } from 'react';
import Pageheading from './PageHeading';
import { Container, Col, Card, Row } from 'react-bootstrap'
import fetchData from '../api/api';
import Pagination from './Pagination';

const CryptoPage = () => {
    //Fetch data her and then send down as props
    const [cryptosData, setCryptosData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    useEffect(() => {
        const coins = fetchData('coins');
        coins.then((data)=>{
            console.log(data);
            // console.dir(data);
            if(data.coins.length > 0 & !data.isAxiosError){
                setCryptosData(
                    data
                )
                setIsLoading(false);
                setIsError(false);
                return;
            } else if(data.isAxiosError){
                setIsError(true);
                setIsLoading(false);
            }
        });
    }, [])

    



    return (
    
        <div className="main-content-container">
            <div className="main-content mt-4">
                <Pageheading>Crypto Currencies</Pageheading>
                {cryptosData ?<Pagination data={cryptosData}  itemsPerPage={itemsPerPage} /> : '...loading'}
            
            </div>
        </div>
    );
};

export default CryptoPage;