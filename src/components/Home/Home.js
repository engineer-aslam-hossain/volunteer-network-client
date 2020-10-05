import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import VolunteerCategory from "../VolunteerCategory/VolunteerCategory";
import Header from "../Header/Header";
import { Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
const Home = () => {
  const { RegisterEvents, SetRegisterEvents } = useContext(UserContext);

  let history = useHistory();
  const eventHandler = category => {
    SetRegisterEvents(category);
    history.push(`/register/${category.category}`);
  };

  // ////////// data load from database /////////

  const [Fields, SetFields] = useState([]);

  useEffect(() => {
    fetch("https://lit-harbor-47521.herokuapp.com/eventFields")
      .then(res => res.json())
      .then(fields => SetFields(fields));
  }, []);

  return (
    <div className='home'>
      <div className='upperSide'>
        <Header />
        <h1 className='text-center text-uppercase my-5 font-weight-bold'>
          i grow by helping people in need
        </h1>
        <div className='search row justify-content-center my-5'>
          <FormControl
            style={{ width: "30rem" }}
            type='text'
            placeholder='Search....'
          />
          <Button>Search</Button>
        </div>
      </div>
      <div className='row eventRow'>
        {Fields.map(category => (
          <VolunteerCategory
            key={category._id}
            category={category}
            eventHandler={eventHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
