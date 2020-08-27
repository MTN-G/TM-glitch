import React from 'react';

export default function Labels({ ticketsList, setTicketsList }) {
  const gotLabels = [];
  const tabsArr = [];

  ticketsList.forEach((ticket) => {
    if (ticket.labels) {
      gotLabels.push(ticket);
      ticket.labels.forEach((label) => {
        if (!tabsArr.includes(label)) tabsArr.push(label);
      });
    }
  });

  const filterFunc = (arr, value) => {
    const result = arr.filter((ticket) => ticket.labels.includes(value));
    setTicketsList(result);
  };

  return (
    <>
      {tabsArr.map((label) => (
        <button
          onClick={() => { filterFunc(gotLabels, label); }}
          id={label}
        >
          {label}
        </button>
      ))}
    </>
  );
}
