import logo from './logo.jpeg';
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
      </div>
      </body>
  )
      ;
}

export default App;
