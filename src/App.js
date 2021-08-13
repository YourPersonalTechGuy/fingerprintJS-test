import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

function App() {

  FingerprintJS.load({token: 'vRAfqZN2JkpjoXL6tAaM'})
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
  );
}

export default App;
