import './App.css';
import Nav from './Navbar.js';
import BedsList from './BedsList';

function App() {
  return (
    <div className="App d-flex flex-column">
      <Nav />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <BedsList />
      </div>
    </div>
  );
}

export default App;
