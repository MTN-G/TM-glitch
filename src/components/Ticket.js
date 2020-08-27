import React, { useState, useEffect } from 'react';
import Label from './Label';

export default function Ticket({
  ticket, counter, setCounter, reset, setReset,
}) {
  const [classT, setClassT] = useState('ticket');

  useEffect(() => {
    setCounter(0);
    setClassT('ticket');
  }, [reset]);

  setReset(false);

  return (
    <ticket className={classT} key={ticket.id}>
      <header className="t-title">{ticket.title}</header>
      <h6 className="content">{ticket.content}</h6>
      <btns className="buttons">
        <Label ticket={ticket} />
        <button
          className="hideTicketButton"
          onClick={() => {
            setClassT('hideTicket');
            setCounter(counter + 1);
          }}
        >
          Hide
        </button>
      </btns>
      <footer className="t-footer">
        By
        {ticket.userEmail}
        {' '}
        |
        {new Date(ticket.creationTime).toUTCString().slice(0, 26)}
      </footer>
    </ticket>
  );
}
