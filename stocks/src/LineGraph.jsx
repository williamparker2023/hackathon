import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

const LineGraph = () => {

  

  useEffect(() => {
    Chart.register(CategoryScale);
  }, []);

  return (
    <div style={{ width: '900px', height: '600px' }}>
      <Line
        data={{
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Real Data',
              data: [null, null, null, 412, 435],
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'Estimated Data',
              data: [77, 5, 573, 412, null],
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              yAxisID: 'y',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          responsive:true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default LineGraph;
