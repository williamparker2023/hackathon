import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

const LineGraph = () => {
  useEffect(() => {
    Chart.register(CategoryScale);
  }, []);

  // State to store the data from the CSV files
  const [realData, setRealData] = useState([]);
  const [estimatedData, setEstimatedData] = useState([]);

  // Function to fetch and parse CSV data
  const fetchData = async () => {
    try {
      const response1 = await fetch('old_stonks.csv');
      const response2 = await fetch('new_stonks.csv');

      const csvData1 = await response1.text();
      const csvData2 = await response2.text();

      const parsedData1 = Papa.parse(csvData1, { header: true });
      const parsedData2 = Papa.parse(csvData2, { header: true });

      // Extract the first number in each column and store it in an array
      const realDataValues = parsedData1.data.map((column) => parseFloat(column[Object.keys(column)[2]]));
      const estimatedDataValues = parsedData2.data.map((column) => parseFloat(column[Object.keys(column)[2]]));

      setRealData(realDataValues);
      setEstimatedData(estimatedDataValues);
    } catch (error) {
      console.error('Error fetching or parsing CSV data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const resultArray = [];

for (let i = 0; i < 100; i++) {
  resultArray.push(i);
}

const mergedString = resultArray.join(', ');

  return (
    <div style={{ width: '66em', height: '44em' }}>
      <Line
        data={{
          labels: [],
          datasets: [
            {
              label: 'Real Data',
              data: realData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'Estimated Data',
              data: estimatedData,
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              yAxisID: 'y',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default LineGraph;