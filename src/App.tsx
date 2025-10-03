import './App.css'
import SearchAddress from "./components/SearchAddress.tsx";

function App() {

  return (
    <>
   <nav className="navbar">
  <div className="navbar-brand">
    {/* <img src="logo.png" alt="Logo" className="navbar-logo" /> */}
    <div className="navbar-text">
      <h1>Solana Explorer</h1>
      <span>Track blockchain transactions in real-time</span>
    </div>
  </div>
</nav>


      <div className="container">
        <SearchAddress />
      </div>
    </>
  )
}

export default App
