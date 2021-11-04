import React from 'react'
import { Container, Col, Card, Row } from 'react-bootstrap'
import fetchData from '../api/api';
import Pageheading from './PageHeading';

import millify from "millify";

//ES6 syntax to import dotenv - dotenv is used to store priavte variables
import dotenv from "dotenv";

//Usually the dotenv function looks in the same directory for .env file but you can specify the path
dotenv.config({path: '../../.env'});


const HomePage = () => {
    const [stats, setStats] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    
    
    //Fetch only once after first render
    React.useEffect(() => {

        //This is an async function to fetch data
        const globalStats = fetchData('global-stats');
        globalStats.then((data)=>{
            console.log(data);
            // console.dir(data);
            if(data.hasOwnProperty("totalCoins") & !data.isAxiosError){
                setStats({  
                    data
                })
                setIsLoading(false);
                setIsError(false);
                return;
            } else if(data.isAxiosError){
                setIsError(true);
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <div className="main-content-container">
            <div className="main-content mt-4">
                <Pageheading >Crypto World</Pageheading>
                <SummaryText stats={stats} isLoading={isLoading} isError={isError}></SummaryText>    
                <CurrentStats stats={stats}/>
                <div className="container btn-container">
                    <div className="row justify-content-center">
                        <a href="#cryptos"><button className="button">View Cryptos</button></a>
                    </div>
                </div>
            </div>
            
        </div>

    )
}




//This component will fetch data
const SummaryText = (props) => {
    const  {stats, isLoading, isError} = (props);
  
   
    return(
        <>
        
            <h2 className="text-center sub-heading">
                {isError && "Error fetching data"}
                {isLoading && "....Loading data"}
                {stats !== null && `The total Market Cap today is $${millify(stats.data.totalMarketCap)}`}
            </h2>
        
          
        </>
    )
}


const CurrentStats = (props) => {
    const  stats = (props.stats);
    if(stats !== null) {
        return (
            <Container>
            <Row className="justify-content-center">
                <Col md={4} className="h-100">
                    <Card className="stat-card h-100">
                        <Card.Body>
                        <Card.Title className="text-center">Cryptos</Card.Title>
                        <Card.Text className="text-center">
                            {millify(stats.data.totalCoins)}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="h-100">
                    <Card className="stat-card h-100">
                        <Card.Body>
                        <Card.Title className="text-center">Exchanges</Card.Title>
                        <Card.Text className="text-center">
                            {millify(stats.data.totalExchanges)}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={4} className="h-100">
                    <Card className="stat-card h-100">
                        <Card.Body>
                        <Card.Title className="text-center">24 hr Volume</Card.Title>
                        <Card.Text className="text-center">
                            ${millify(stats.data.total24hVolume)}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="h-100">
                    <Card className="stat-card h-100">
                        <Card.Body>
                        <Card.Title className="text-center">Total Markets</Card.Title>
                        <Card.Text className="text-center">
                            {millify(stats.data.totalMarkets)}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        )
    } else {
        return <></>
    }
}








export{
    HomePage,
    SummaryText,
    CurrentStats,
}
