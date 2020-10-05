import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/logos/Group 1329.png";
import user from "../../images/logos/users-alt 1.png";
import plus from "../../images/logos/plus 1.png";
import fakeData from "../../fakeData/fakeData";
import AllEvents from "../AllEvents/AllEvents";
import AddNewEvent from "../AddNewEvent/AddNewEvent";
import "./Admin.css";
const Admin = () => {
  //  add to database ///////////////////
  const addToDatabase = () => {
    fetch("https://lit-harbor-47521.herokuapp.com/addToDatabase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fakeData),
    })
      .then(res => res.json())
      .then(data => console.log(data));

    // after pushing data to database i disabled the button
  };

  // ///////////// all events from database //////////////
  const [allEvents, SetAllEvents] = useState([]);
  useEffect(() => {
    fetch(`https://lit-harbor-47521.herokuapp.com/allEvents`)
      .then(res => res.json())
      .then(events => SetAllEvents(events));
  }, []);

  // /////// re load all events on click ///////

  const loadAllEvents = () => {
    window.location.reload();
  };

  ///////////// create new event //////////////
  const createNewEvent = () => {
    document
      .querySelector(".allEventTable")
      .style.setProperty("display", "none");
    document
      .querySelector(".createEvent")
      .style.setProperty("display", "block");
  };

  ////////// delete event //////////////
  const deleteEvent = id => {
    const remainingEvents = allEvents.filter(items => items._id !== id);
    fetch(`https://lit-harbor-47521.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        res.json();
      })
      .then(data => {
        console.log("Deleted Succesfully");
        SetAllEvents(remainingEvents);
      });
  };

  return (
    <div>
      <div className='row ml-3 mt-5'>
        <div className='col-md-2'>
          <Link to='/'>
            <img className='siteLogo' src={logo} alt='' />
          </Link>

          <br />
          <Navbar className='p-0 d-block'>
            <Nav.Link onClick={loadAllEvents} className='sidebarLink'>
              <img className='userImg' src={user} alt='' />
              Volunteer register list
            </Nav.Link>

            <Nav.Link onClick={createNewEvent} className='sidebarLink'>
              <img className='userImg' src={plus} alt='' />
              Add event
            </Nav.Link>
          </Navbar>

          <br />
          <Button onClick={addToDatabase} className='my-3 mx-0' disabled>
            Add All Field to DB
          </Button>
        </div>
        <div className='col-md-10 detailsColumn'>
          <div className='allEventTable'>
            <h3>Volunteer Register List</h3>
            <Table responsive='lg'>
              <thead className='tableHead'>
                <tr>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Registration Date</th>
                  <th>Volunteer List</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allEvents.map(event => (
                  <AllEvents
                    key={event._id}
                    event={event}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <AddNewEvent />
        </div>
      </div>
    </div>
  );
};

export default Admin;
