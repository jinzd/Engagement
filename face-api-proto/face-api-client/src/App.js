import React from 'react';
import WebcamComponent from './components/WebcamComponent'
import './App.css';


class App extends React.Component {
  render()
  {
    return (
      <>
      <div className="App">
      <header className="App-header">
        <WebcamComponent width='1280' height='720' faceingMode='user'/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn React
        </a>
      </header>
    </div>
    </>
    );
  }
}

export default App;
