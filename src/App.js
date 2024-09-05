import logo from './logo.svg';
import './App.css';


function App() {
  return (
      <body className="App-body">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <div className="App-buttons">
            <button className="App-buttonSingUp">
              <a
                  href="https://youtube.com"
              >
                Sing Up
              </a>
            </button>
            <button className="App-buttonLogIn">
              <a
                  href="https://youtube.com"
              >
                Log In
              </a>
            </button>
          </div>
        </header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
      </body>
  )
      ;
}

export default App;
