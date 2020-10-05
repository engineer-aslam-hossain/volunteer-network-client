import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import logo from "../../images/logos/Group 1329.png";
import { Link, useHistory, useParams } from "react-router-dom";
import "./Register.css";
import { UserContext } from "../../App";

const Register = () => {
  const { LoggedInUser, SetLoggedInUser } = useContext(UserContext);
  const { RegisterEvents, SetRegisterEvents } = useContext(UserContext);
  const { eventName } = useParams();
  //////////////////////////////////////////////////////////
  const [RegisterUser, SetRegisterUser] = useState({
    name: `${LoggedInUser.displayName}`,
    email: `${LoggedInUser.email}`,
    date: "",
    des: "",
    events: `${eventName}`,
    img: `${RegisterEvents.img}`,
    field: `${JSON.stringify(RegisterEvents)}`,
  });
  const haldleInput = e => {
    e.preventDefault();
    let isInputValid;

    if (e.target.name === "date") {
      isInputValid = e.target.value;
    }
    if (e.target.name === "des") {
      isInputValid = e.target.value;
    }

    if (isInputValid) {
      const newUser = { ...RegisterUser };
      newUser[e.target.name] = e.target.value;
      SetRegisterUser(newUser);
    }
  };

  const handleRegistration = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (RegisterUser.des && RegisterUser.date) {
      fetch("https://lit-harbor-47521.herokuapp.com/addEvents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(RegisterUser),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log("Registration Successful");
          submitHandler();
        });
    }
    setValidated(true);
  };

  /////////// route change //////////

  let history = useHistory();
  const submitHandler = () => {
    history.push(`/events`);
  };

  //////////////// validation ////////////////
  const [validated, setValidated] = useState(false);

  return (
    <div className='register'>
      <Link to='/'>
        <img style={{ width: "10rem", margin: "0 auto" }} src={logo} alt='' />
      </Link>
      <Card style={{ width: "25rem" }} className='registerForm'>
        <Card.Body className=' formBody'>
          <h3>Register as a Volunteer</h3>
          <Form
            noValidate
            validated={validated}
            className='d-flex flex-column'
            onSubmit={handleRegistration}>
            <Form.Control
              type='name'
              name='name'
              readOnly
              placeholder='Full Name'
              defaultValue={LoggedInUser.displayName}
            />
            <Form.Control
              type='email'
              name='email'
              readOnly
              placeholder='Username or Email'
              defaultValue={LoggedInUser.email}
            />
            <Form.Group controlId='formBasicText'>
              <Form.Control
                onBlur={haldleInput}
                type='date'
                name='date'
                placeholder='Date'
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please Select an Date
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formBasicText'>
              <Form.Control
                onBlur={haldleInput}
                type='text'
                name='des'
                placeholder='Description'
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please Enter an Description
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Control
              type='text'
              name='events'
              defaultValue={eventName}
              readOnly
              placeholder='Organization books at the library'
            />
            <Button type='submit'>Registration</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
