import React, { useState, useEffect } from 'react';
import Pageheading from './PageHeading';
import { useHistory, useParams } from 'react-router-dom'
import fetchData from '../api/api';
import millify from 'millify';
import PriceChart from './PriceChart';

   
const SingleCrypto = () => {
    const { id } = useParams()
    const [cryptoInfo, setCryptoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [timeFrame, setTimeFrame] = useState("24h");
    const timePeriods = ["24h", "7d", "30d", "3m", "1y", "3y", "5y" ];

    
    useEffect(() => {
        const coinData = fetchData('coin', id);
        coinData.then((data)=>{
            const coinInfo = data.data.coin;
            console.log(coinInfo);
            // console.dir(data);
            if(data.status === "success"){
                setCryptoInfo(coinInfo);
                setIsLoading(false);
                setIsError(false);
                return;
            } else {
                setIsError(true);
                setIsLoading(false);
            }
        }).catch((err)=>{console.log(err)});
    }, [])

    
    return (
        
        <div className="main-content-container">
            <div className="main-content mt-4">
            {cryptoInfo && 
            <>
                <Pageheading>{cryptoInfo.name}</Pageheading>            
                <div className="container crypto-info-container p-4">
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <h3 className="text-center pt-2 mb-4">{cryptoInfo.symbol} <img className="crypto-info-img" src={cryptoInfo.iconUrl} alt="" /> </h3>
                                <table class="table stat-table">
                                 
                                    <tbody>
                                        <tr>
                                        <th scope="row"># Rank</th>
                                        <td>{cryptoInfo.rank}</td>
                                        </tr>

                                        <tr>
                                        <th scope="row">Price in USD</th>
                                        <td>${millify(cryptoInfo.price)}</td>
                                        </tr>

                                        <tr>
                                        <th scope="row">24 Hr Change</th>
                                        <td>{cryptoInfo.change < 0 ? <span className="bg-danger rounded-pill p-2"> {cryptoInfo.change}%</span> : <span className="bg-success rounded-pill p-2">{ '+' + cryptoInfo.change}%</span> }</td>
                                
                                        </tr>
                                        <tr>
                                        <th scope="row">Market Cap</th>
                                        <td>${millify(cryptoInfo.marketCap)}</td>
                                        </tr>

                                        <tr>
                                        <th scope="row">Total Supply</th>
                                        <td>${millify(cryptoInfo.totalSupply)}</td>
                                        </tr>

                                        <tr>
                                        <th scope="row">ATH Price</th>
                                        <td>${millify(cryptoInfo.allTimeHigh.price)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <h3 className="text-center pt-2 mb-2">Links</h3>
                                <div class="text-center d-flex flex-column">
                                {cryptoInfo && cryptoInfo.links.map((link) => {
                                    return <a key={link.name} class=" btn crypto-info-links" href={link.url} target="_blank">{link.type.toUpperCase()}</a>;
                                })}    
                                </div>
                            </div>

                               <div className="col mt-2">
                                    <h3 className="text-left pt-2 mb-2 mt-2">What is {cryptoInfo.name} ?</h3>
                                    <div class="text-left d-flex flex-column to-parse-html">
                                    {cryptoInfo && <div dangerouslySetInnerHTML={{__html: cryptoInfo.description}}></div>}    
                                </div>
                            </div>
                        
                    </div>
                </div>
                <div className="container chart-container">
                    <select  className="select-timeframe form-select" placeholder="Select Time Frame" value={timeFrame} onChange={(e)=>{setTimeFrame(e.target.value)}}>
                        {timePeriods.map((timePeriod)=>{return <option value={timePeriod}>{timePeriod} </option>})}
                    </select>
                    <div className="charts">
                       <PriceChart timeFrame={timeFrame} id={id}/>

                    </div>
                </div>
            </>
            }
            </div>
        </div>
        
    );
};



export default SingleCrypto;