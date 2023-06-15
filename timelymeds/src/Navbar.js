import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import pills_info from './pills_info';

function Nav() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [passedPills, setPassedPills] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!initialRender && passedPills.length > 0) {
      console.log('Passed Pills:', passedPills);
    } else {
      setInitialRender(false);
    }
  }, [passedPills]);

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleTimeIncrease = (increaseAmount) => {
    setCurrentTime((prevTime) => {
      const currentTime = (prevTime + increaseAmount) % (24 * 60 * 60 * 1000);
      const updatedPassedPills = [];

      // Iterate over each bed and its slots
      Object.entries(pills_info).forEach(([bed, slots]) => {
        Object.entries(slots).forEach(([slot, pill]) => {
          const timings = pill.timings.split(', ');
          const pillTimes = timings.map((timing) => {
            const [hours, minutes] = timing.split(':');
            const pillTime = new Date();
            pillTime.setHours(hours, minutes, 0, 0); // Set the hours and minutes, reset other fields to zero
            return pillTime.getTime() % (24 * 60 * 60 * 1000); // Apply modulo 24 hours to get the time of day
          });

          // Check if any pill's timing falls within the interval
          if (
            pillTimes.some(
              (pillTime) =>
                (pillTime > prevTime && pillTime <= currentTime) ||
                (currentTime < prevTime && (pillTime <= currentTime || pillTime > prevTime))
            )
          ) {
            updatedPassedPills.push({
              bed,
              slot,
              name: pill.name,
            });
          }
        });
      });

      setPassedPills(updatedPassedPills);
      return currentTime;
    });
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#89CFF0' }} variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="36"
              height="36"
              className="d-inline-block align-top"
              style={{ marginRight: '4px' }}
            />
            <h1 className="m-0" style={{ display: 'inline-block', fontSize: '30px' }}>
              TimelyMeds
            </h1>
          </Navbar.Brand>
          <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <div style={{ marginRight: '10px' }}>Current Time: {formatTime(currentTime)}</div>
            <button
              className="btn btn-light btn-sm"
              style={{ marginRight: 10 + 'px', backgroundColor: '#C0E8F4', borderColor: '#C0E8F4' }}
              onClick={() => handleTimeIncrease(10 * 1000 * 60)}
            >
              +10m
            </button>
            <button
              className="btn btn-light btn-sm"
              style={{ backgroundColor: '#C0E8F4', borderColor: '#C0E8F4' }}
              onClick={() => handleTimeIncrease(1000 * 60 * 60)}
            >
              +1h
            </button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
