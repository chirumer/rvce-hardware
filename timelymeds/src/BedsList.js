import React from 'react';
import { Card } from 'react-bootstrap';

function BedCard(props) {
  const handleClick = () => {
    // Access the id prop when the div is clicked
    alert(props.id);
    console.log('Clicked id:', props.id);
  };

  return (
    <Card className="shadow d-flex flex-row">
      <div className="d-flex m-2 flex-column align-items-center">
        <img src="/bed.png" alt="bed" width="60" height="60" />
        <div className="h2 text-center m-2" style={{ color: '#89CFF0' }}>
          {props.name}
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <div
          style={{ color: 'lightblue' }}
          className="h2 flex-grow-1 d-flex align-items-center justify-content-center"
          onClick={handleClick}
        >
          (click to view)
        </div>

        <div className="text-center">
          <span
            style={
              props.status === 'online'
                ? { color: '#48A040' }
                : { color: '#FF0000' }
            }
          >
            status: {props.status}
          </span>
        </div>
      </div>
    </Card>
  );
}

function BedsList() {
  return (
    <Card style={{backgroundColor: "#89CFF0", width: 700 + 'px', height: 500 + 'px', display: "inline-block"}} className="shadow d-flex p-2">
    <h1 class="m-3 text-center" style={{fontSize: "30px", color: 'white'}}>Dispensers</h1>
      <Card style={{overflowY: "scroll", backgroundColor: "white", display: "inline-block"}} className="shadow flex-grow-1">
      
        <BedCard name="Bed Number: 1" status="online" id="1" />
        <BedCard name="Bed Number: 2" status="offline" id="2" />
        <BedCard name="Bed Number: 3" status="offline" id="3" />
        <BedCard name="Bed Number: 4" status="offline" id="4" />
        <BedCard name="Bed Number: 5" status="offline" id="5" />
        <BedCard name="Bed Number: 6" status="offline" id="6" />
        <BedCard name="Bed Number: 7" status="offline" id="7" />
        <BedCard name="Bed Number: 8" status="offline" id="8" />
        <BedCard name="Bed Number: 9" status="offline" id="9" />

      </Card>
    </Card>
  );
};

export default BedsList;