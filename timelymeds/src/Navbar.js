import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav() {
  return (
    <>
      <Navbar style={{backgroundColor: "#89CFF0"}} variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{marginRight: "10px"}}
            />{' '}
  
              <h1 style={{display: "inline-block", fontSize: "30px"}}>TimelyMeds</h1>

          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;