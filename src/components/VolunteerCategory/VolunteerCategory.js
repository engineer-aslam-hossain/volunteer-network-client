import React from "react";
import { Card } from "react-bootstrap";
import "./VolunteerCategory.css";
const VolunteerCategory = props => {
  const { img, category } = props.category;

  return (
    <Card
      className='eventCard'
      onClick={() => props.eventHandler(props.category)}>
      <Card.Body className='p-0'>
        <Card.Img variant='top' src={img} alt='will upload in future' />
        <Card.Title
          className='eventTitle'
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}>
          {category}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default VolunteerCategory;
