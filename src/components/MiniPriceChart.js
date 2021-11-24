import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';




const MiniPriceChart = (props) => {
    const { data } = props;
    const [pricesArray, setPricesArray] = useState(null);
    const [labelsArray, setLabelsArray] = useState(null);
    useEffect(() => {
       if(data) {
           setPricesArray(data);
           let labels = [];
           for (let index = 1; index <= data.length; index++) {
               labels.push(index);
           }
           setLabelsArray(labels);
       }
    }, []);
        const miniChartData = {
        labels: labelsArray,
        datasets: [
            {
            label:  '',
            data: pricesArray,
            fill: false,
            backgroundColor: "black",
            borderColor: "black"
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    color:'white',
                    size: 10
                }
            },
          x: {
                ticks: {
                    beginAtZero: true,
                    color:'white',
                    size: 10
                }
            }
            
        }
    };
    return (
        <>
           {pricesArray && <Line data={miniChartData} options={options} />}
            
        </>)

}
    


export default MiniPriceChart;