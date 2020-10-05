import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Event from "../Event/Event";
import Header from "../Header/Header";

const Events = () => {
  const { LoggedInUser, SetLoggedInUser } = useContext(UserContext);
  const [eventFields, SetEventFields] = useState([]);
  useEffect(() => {
    fetch(
      `https://lit-harbor-47521.herokuapp.com/getEvents?email=${LoggedInUser.email}`
    )
      .then(res => res.json())
      .then(events => SetEventFields(events));
  }, []);

  ////////// cancel event from the database and ui ///////////

  const cancelHandler = id => {
    const remainingEvents = eventFields.filter(items => items._id !== id);
    fetch(`https://lit-harbor-47521.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        res.json();
      })
      .then(data => {
        console.log("Event Delete Successfully");
        SetEventFields(remainingEvents);
      });
  };
  return (
    <div
      className=''
      style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Header />
      <div className='row' style={{ padding: "4rem" }}>
        {eventFields.map(event => (
          <Event key={event._id} event={event} cancelHandler={cancelHandler} />
        ))}
      </div>
    </div>
  );
};

export default Events;
