import React from 'react';
import { Card } from 'react-bootstrap';

function BedsList() {
  return (
    <Card style={{backgroundColor: "#89CFF0", width: 700 + 'px', height: 500 + 'px', display: "inline-block"}} className="shadow d-flex p-2">
    <h1 class="m-3 text-center" style={{fontSize: "30px", color: 'white'}}>Dispensers</h1>
      <Card style={{backgroundColor: "white", display: "inline-block"}} className="shadow flex-grow-1">
      </Card>
    </Card>
  );
};

export default BedsList;