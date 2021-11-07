import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import fetchData from '../api/api';



const PriceChart = (props) => {
    const { timeFrame, id } = props;
    useEffect(() => {
        const param = `id/history/${timeFrame}`;
        const coinHistory = fetchData('coin', param);
        coinHistory.then((data)=>{
       
            // console.log(history);
            // console.dir(data);
            // if(data.status === "success"){
            //     setCryptoInfo(coinInfo);
            //     setIsLoading(false);
            //     setIsError(false);
            //     return;
            // } else {
            //     setIsError(true);
            //     setIsLoading(false);
            // }
        }).catch((err)=>{console.log(err)});
    }, [])
    const data = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
            beginAtZero: true
            }
        }
    };
    return (
        <>
            <div className='header'>
            <h1 className='title'>Line Chart</h1>
            <div className='links'>
                <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                >
                Github Source
                </a>
            </div>
            </div>
            <Line data={data} options={options} />
        </>)

}
    


export default PriceChart;