import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import Input from './components/Input';
import Labels from './components/LabelNav';
import './App.css';

export default function App() {
  const [ticketsList, setTicketsList] = useState([]);

  const importTickets = () => {
    axios.get('/api/tickets')
      .then((res) => {
        setTicketsList(res.data);
      })
      .catch((e) => alert(e));
  };
  // first load
  useEffect(() => {
    importTickets();
  }, []);

  const [reset, setReset] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <div className="app">
      <navbar className="navbar">
        <Input importTickets={importTickets} setTicketsList={setTicketsList} />
        <div className="counter">
          Hidden Results:
          <counter id="hideTicketsCounter">{counter}</counter>
          <button id="restoreHideTickets" onClick={() => setReset(true)}>Restore</button>
        </div>
      </navbar>
      <h1 className="title">Ticket Manager</h1>
      <grid className="labelsNav">
        <button className="all" onClick={() => { importTickets(); }}>All</button>
        <Labels ticketsList={ticketsList} setTicketsList={setTicketsList} />
      </grid>
      <main className="tickets">
        {ticketsList.map((ticket) => (
          <Ticket
            ticket={ticket}
            counter={counter}
            setCounter={setCounter}
            reset={reset}
            setReset={setReset}
          />
        ))}
      </main>
    </div>
  );
}
