import React from "react";
import deleteBtn from "../../images/logos/trash-2 9.png";
const AllEvents = props => {
  const { name, email, date, events } = props.event;
  return (
    <>
      <tr
        style={{
          fontSize: ".9rem",
        }}>
        <td> {name} </td>
        <td>{email} </td>
        <td>{date} </td>
        <td>{events}</td>
        <td>
          <img
            style={{
              backgroundColor: "red",
              width: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => props.deleteEvent(props.event._id)}
            src={deleteBtn}
            alt=''
          />
        </td>
      </tr>
    </>
  );
};

export default AllEvents;
