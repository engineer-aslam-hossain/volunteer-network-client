import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./AddNewEvent.css";
const AddNewEvent = () => {
  const [newEvent, SetNewEvent] = useState({
    category: "",
    date: "",
    des: "",
  });

  const handleValue = e => {
    e.preventDefault();
    let isInputValid;
    if (e.target.name === "category") {
      isInputValid = e.target.value;
    }
    if (e.target.name === "date") {
      isInputValid = e.target.value;
    }

    if (e.target.name === "des") {
      isInputValid = e.target.value;
    }

    if (isInputValid) {
      const new_event = { ...newEvent };
      new_event[e.target.name] = e.target.value;
      SetNewEvent(new_event);
    }
  };

  const newEventSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (newEvent.category && newEvent.date && newEvent.des) {
      fetch("https://lit-harbor-47521.herokuapp.com/createNewEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Added New Event SuccessFully");
          SetEventCreate(data);
        });
    }
    setValidated(true);
  };

  const [eventCreate, SetEventCreate] = useState([]);

  //////////////// validation ////////////////
  const [validated, setValidated] = useState(false);

  return (
    <div className='createEvent'>
      {eventCreate.insertedCount > 0 ? (
        <h3 className='text-center text-primary'>Event Create Successfully</h3>
      ) : (
        ""
      )}
      <h4 style={{ marginLeft: "9rem", fontWeight: "600" }}>Add Event</h4>
      <Card className='eventCreateForm'>
        <Card.Body className='formBody'>
          <Form
            noValidate
            validated={validated}
            className='d-flex justify-content-around eventForm'
            onSubmit={newEventSubmit}>
            <div className='d-flex flex-column'>
              <Form.Group controlId='formBasicText'>
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='category'
                  onBlur={handleValue}
                  placeholder='Event Title'
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide an Event Title
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formBasicText'>
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  onBlur={handleValue}
                  type='date'
                  name='date'
                  placeholder='Date'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please Select an Date
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className='eventFooter d-flex flex-column '>
              <Form.Group controlId='formBasicText'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onBlur={handleValue}
                  type='text'
                  name='des'
                  placeholder='Enter Description'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please Enter your Description
                </Form.Control.Feedback>
              </Form.Group>
              <Button type='submit'>Submit</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNewEvent;
