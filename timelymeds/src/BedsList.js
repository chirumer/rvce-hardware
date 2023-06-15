import React from 'react';
import { Card } from 'react-bootstrap';

function BedsList() {
  return (
    <Card style={{backgroundColor: "#89CFF0", width: 700 + 'px', height: 500 + 'px', display: "inline-block"}} className="shadow">
    <h1 class="m-3 text-center" style={{fontSize: "30px", color: 'white'}}>Dispensers</h1>
    </Card>
  );
};

export default BedsList;