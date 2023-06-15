import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import pills_info from './pills_info';


function BedCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [updatedPillInfo, setUpdatedPillInfo] = useState({});

  const handleClick = () => {
    if (props.status === 'offline') {
      // Show offline device popup
      alert('Device is offline');
    } else {
      setShowModal(true);
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedPillInfo({});
  };

  const handleInputChange = (slot, field, value) => {
    setUpdatedPillInfo((prevInfo) => ({
      ...prevInfo,
      [slot]: {
        ...prevInfo[slot],
        [field]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    // Update the global pills_info variable
    const updatedSlots = Object.keys(updatedPillInfo);
    updatedSlots.forEach((slot) => {
      pills_info[props.id][slot] = {
        ...pills_info[props.id][slot],
        ...updatedPillInfo[slot]
      };
    });

    console.log(pills_info);
    handleCloseModal();
  };

  const pillInfo = pills_info[props.id];

  return (
    <>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pillInfo && (
            <ul>
              {Object.entries(pillInfo).map(([slot, data]) => (
                <li key={slot}>
                  <h3>Slot {slot}:</h3>
                  <div>
                    Pill Name:{' '}
                    <input
                      type="text"
                      value={updatedPillInfo[slot]?.name || data.name}
                      onChange={(e) =>
                        handleInputChange(slot, 'name', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    Stock Left:{' '}
                    <input
                      type="number"
                      value={updatedPillInfo[slot]?.stock_left || data.stock_left}
                      onChange={(e) =>
                        handleInputChange(slot, 'stock_left', parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    Timings:{' '}
                    <input
                      type="text"
                      value={updatedPillInfo[slot]?.timings || data.timings}
                      onChange={(e) =>
                        handleInputChange(slot, 'timings', e.target.value)
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function BedsList() {
  return (
    <Card
      style={{
        backgroundColor: '#89CFF0',
        width: 700 + 'px',
        height: 500 + 'px',
        display: 'inline-block',
      }}
      className="shadow d-flex p-2"
    >
      <h1 className="m-3 text-center" style={{ fontSize: '30px', color: 'white' }}>
        Dispensers
      </h1>
      <Card
        style={{
          overflowY: 'scroll',
          backgroundColor: 'white',
          display: 'inline-block',
        }}
        className="shadow flex-grow-1"
      >
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
}

export default BedsList;