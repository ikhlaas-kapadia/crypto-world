import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import fetchData from '../api/api';



const PriceChart = (props) => {
    const { timeFrame, id } = props;
    const [pricesArray, setPricesArray] = useState(null);
    const [datesArray, setDatesArray] = useState(null);
    useEffect(() => {
        const param = `${id}/history/${timeFrame}`;
        const coinHistory = fetchData('coin', param);
        coinHistory.then((data)=>{
            const { history } = data.data;
            let pricesArray = [];
            let datesArray = [];
            // console.log(history);
            history.forEach(item => {
                pricesArray.push(item.price);
                datesArray.push(new Date(item.timestamp).toLocaleDateString());
            });
            
            // console.log(pricesArray);
            // console.log(datesArray);
            
            if(data.status === "success"){
                setPricesArray(pricesArray);
                setDatesArray(datesArray);
               
                return;
            } 
        }).catch((err)=>{console.log(err)});
    }, [timeFrame, id]);
    const data = {
        labels: datesArray,
        datasets: [
            {
            label:  'Price in USD',
            data: pricesArray,
            fill: false,
            backgroundColor: "yellow",
            borderColor: "yellow"
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    color:'white',
                    size: 20
                }
            },
          x: {
                ticks: {
                    beginAtZero: true,
                    color:'white',
                    size: 20
                }
            }
            
        }
    };
    return (
        <>
            <div className='header'>
            <h1 className='title text-center'>Price chart</h1>
         
            </div>
            <Line data={data} options={options} />
        </>)

}
    


export default PriceChart;