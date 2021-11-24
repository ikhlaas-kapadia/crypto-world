import React from 'react'
import { Container, Col, Card, Row } from 'react-bootstrap'
import fetchData from '../api/api';
import Pageheading from './PageHeading';
import MiniPriceChart from './MiniPriceChart';



import millify from "millify";

//ES6 syntax to import dotenv - dotenv is used to store priavte variables
import dotenv from "dotenv";

//Usually the dotenv function looks in the same directory for .env file but you can specify the path
dotenv.config({path: '../../.env'});


const HomePage = () => {
    const [stats, setStats] = React.useState(null);
    const [top5Coins, setTop5Coins] = React.useState(null);
    const [top5Exchanges, setTop5Exchanges] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    
    
    //Fetch stats and top 5 coins data only once after first render
    React.useEffect(() => {

        //This is an async function to fetch data
        const getData = fetchData('top5-coins');
        getData.then((data)=>{
            const { stats, coins } = data.data ;
            const { status } = data;
       
            console.log(stats);
            console.log(coins);
            console.log(status);
            // console.dir(data);
            if(status === "success"){
                setStats(stats);
                setTop5Coins(coins);
                setIsLoading(false);
                setIsError(false);
                return;
            } else if(data.isAxiosError){
                setIsError(true);
                setIsLoading(false);
            }
        }).catch((err)=>{console.log(err)});
    }, []);

    //Fetch top5 exchanges data once after first render
    React.useEffect(() => {

        //This is an async function to fetch data
        const getData = fetchData('top5-exchanges');
        getData.then((data)=>{
            const { exchanges } = data.data ;
            const { status } = data;
            console.log(exchanges);
            // console.dir(data);
            if(status === "success"){
                setTop5Exchanges(exchanges);
                return;
            } 
        }).catch((err)=>{console.log(err)});
    }, []);


    return (
        <div className="main-content-container">
            <div className="main-content mt-4">
                <Pageheading >Crypto World</Pageheading>
                <SummaryText stats={stats} isLoading={isLoading} isError={isError}></SummaryText>    
                <CurrentStats stats={stats}/>
                {/* <Top5Crypto data={top5Coins}/> */}
                <div className="container btn-container">
                    <div className="row text-center">
                        <a href="#cryptos"><button className="button">View more Cryptos</button></a>
                    </div>
                </div>
                <Top5Pills data={top5Coins}/>
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
                {stats !== null && `The total Market Cap today is $${millify(stats.totalMarketCap)}`}
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
                        <Card.Title className="text-center">Total Cryptos</Card.Title>
                        <Card.Text className="text-center">
                            {millify(stats.total)}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="h-100">
                    <Card className="stat-card h-100">
                        <Card.Body>
                        <Card.Title className="text-center">Total Exchanges</Card.Title>
                        <Card.Text className="text-center">
                            {millify(stats.totalExchanges)}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                
                <Col md={4} className="h-100">
                    <Card className="stat-card h-100">
                        <Card.Body>
                        <Card.Title className="text-center">Total Markets</Card.Title>
                        <Card.Text className="text-center">
                            {millify(stats.totalMarkets)}
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

const Top5Crypto = (props) => {
    return (
        <Container className="top5-crypto-container">
            <h2 className="text-center"> Top 5 Cryptos</h2>
            {props.data && 
            <Row>
            {props.data.map((crypto, index) => {
                return(

                <Col key={crypto.id} md={4}>
                    <div class="card text-center mb-4">
                        <div class="card-header">{crypto.symbol} - {crypto.name}</div>
                        <div class="card-body">
                            <h5 class="card-title"><img src={crypto.iconUrl} alt={crypto.name + 'logo'} className="top5-crypto-img"></img></h5>
                            <div className="charts">
                                <MiniPriceChart data={crypto.history} />
                            </div>
                            <a href={"/crypto/" + crypto.id} target="_blank">More info</a>
                        </div>
                        <div class="card-footer">Price: ${millify(crypto.price)}</div>
                    </div>  
                </Col>
                )
            })}
            </Row>
            }
        </Container>
    )
}

const Top5Pills = (props) => {
    return (
        <>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="pills-top5-crypto-tab" data-toggle="pill" href="#pills-top5-crypto" role="tab" aria-controls="pills-top5-crypto" aria-selected="true">Top 5 Crypto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-top5-exchanges-tab" data-toggle="pill" href="#pills-top5-exchanges" role="tab" aria-controls="pills-top5-exchanges" aria-selected="false">Top 5 Exchanges</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-top5-crypto" role="tabpanel" aria-labelledby="pills-top5-crypto-tab">{<Top5Crypto data={props.data}/>}</div>
                <div class="tab-pane fade" id="pills-top5-exchanges" role="tabpanel" aria-labelledby="pills-top5-exchanges-tab">Top 5 exchanges</div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
            </div>
        </>
    )
}








export{
    HomePage,
    SummaryText,
    CurrentStats,
}
