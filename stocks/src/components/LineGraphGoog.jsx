import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

const LineGraphGoog = () => {
  useEffect(() => {
    Chart.register(CategoryScale);
  }, []);

  // State to store the data from the CSV files
  const [xValues, setXValues] = useState([]);
  const [yRealData, setYRealData] = useState([]);
  const [yEstimatedData, setYEstimatedData] = useState([]);

  // Function to fetch and parse CSV data
  const fetchDataFromCSV = async (csvFilePath) => {
    try {
      const response = await fetch(csvFilePath);
      const csvData = await response.text();
      const parsedData = Papa.parse(csvData, { header: true });

      // Extract x-values from the first column
      const xDataValues = parsedData.data.map((row) => parseFloat(row[Object.keys(row)[0]]));
      // Extract y-values from the second column
      const yDataValues = parsedData.data.map((row) => parseFloat(row[Object.keys(row)[4]]));

      return { x: xDataValues, y: yDataValues };
    } catch (error) {
      console.error('Error fetching or parsing CSV data:', error);
      return { x: [], y: [] };
    }
  };

  useEffect(() => {
    async function fetchData() {
      const realDataValues = await fetchDataFromCSV('old_stonks.csv');
      const estimatedDataValues = await fetchDataFromCSV('new_stonks.csv');

      // Add 2067 to the x-values from "new_stonks.csv"
      const adjustedXValues = estimatedDataValues.x.map((x) => x + 2067);

      setXValues([...realDataValues.x, ...adjustedXValues]);
      setYRealData(realDataValues.y);
      setYEstimatedData(estimatedDataValues.y);
    }

    fetchData();
  }, []);

  const generateEstimatedValues = () => {
    const xValues = [];
    for (let i = 0; i < 300; i++) {
      xValues.push(undefined);
    }
    return xValues.concat(yEstimatedData);
  };

  const yReallyData= yRealData.slice(1767,2068);
  const xAxis = xValues.slice(1767,2096);

  return (
    <div style={{ width: '66em', height: '44em' }}>
      <Line
        data={{
          labels: xAxis,
          datasets: [
            {
              label: 'Real Data',
              data: yReallyData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'Estimated Data',
              data: generateEstimatedValues(),
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

export default LineGraphGoog;