import React from 'react';
import LineGraph from './components/LineGraph';
import LineGraphAppl from './components/LineGraphAppl';
import Button from "./components/Button";
import './App.css';

function App() {
  return (
    <div className="App">
      <LineGraph />
      <LineGraphAppl />
    </div>
  );
}

export default App;