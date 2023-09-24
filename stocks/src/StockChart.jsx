import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './App.css'; // Import the CSS file

const StockChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const labels = data.map((item) => item.date);
      const prices = data.map((item) => item.price);

      new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Stock Price',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="card">
      <canvas ref={chartRef} width={800} height={400}></canvas>
    </div>
  );
};

export default StockChart;