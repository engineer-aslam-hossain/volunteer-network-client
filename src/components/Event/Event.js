import React from "react";
import { Button, Card } from "react-bootstrap";

const Event = props => {
  const { img, events, date } = props.event;
  return (
    <div className='col-md-6 d-flex justify-content-center align-items-center my-3'>
      <Card style={{ width: "30rem" }}>
        <Card.Body className='d-flex'>
          <Card.Img
            style={{ width: "6rem", margin: "0 1rem" }}
            variant='top'
            src={img}
          />
          <div className='eventDetails'>
            <Card.Title> {events} </Card.Title>
            <Card.Text>{date}</Card.Text>
            <Button
              onClick={() => props.cancelHandler(props.event._id)}
              className='btn btn-danger'>
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Event;
