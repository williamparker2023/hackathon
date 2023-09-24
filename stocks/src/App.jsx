import React from 'react';
import LineGraph from './components/LineGraph';
import LineGraphAppl from './components/LineGraphAppl';
import LineGraphMsft from './components/LineGraphMsft';
import LineGraphGoog from './components/LineGraphGoog';
import LineGraphAmzn from './components/LineGraphAmzn';
import Button from "./components/Button";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Nasdaq</h1>
      <LineGraph />
      <h1>Apple</h1>
      <LineGraphAppl />
      <h1>Microsoft</h1>
      <LineGraphMsft />
      <h1>Google</h1>
      <LineGraphGoog />  
      <h1>Amazon</h1>
      <LineGraphAmzn />
    </div>
  );
}

export default App;