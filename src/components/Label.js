import React from 'react';

export default function Label({ ticket }) {
  const findLabels = (obj) => {
    if (obj.hasOwnProperty('labels')) {
      return (
        <>
          {obj.labels.map((label) => <button className="label" id={label} key={label.id}>{label}</button>)}
        </>
      );
    }
  };

  return (
    <lables>{findLabels(ticket)}</lables>
  );
}
