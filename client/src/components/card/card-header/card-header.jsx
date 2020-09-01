import React, { useState } from "react";

import "../card.scss";

const CardHeaderContent = ({card, deleteCard,setCard, handleUpdate}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-content">
      <h1 className="card-title">{card.card.cardTitle}</h1>
      {console.log(card)}
      <p className="dots" onClick={() => setOpen(!open)}>
        ...
      </p>

      <div className={`dots-div ${open ? "open" : "d-none"}`}>
        <button onClick={()=>{deleteCard(); setOpen(!open)}}>
          delete
        </button>

        <button
          onClick={() => {
            setCard()
            handleUpdate()
            setOpen(!open)
          }}
        >
          edit
        </button>
      </div>
    </div>
  );
};
 export default CardHeaderContent;