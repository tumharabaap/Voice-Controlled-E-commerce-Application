import React from "react";

function Card(props) {
  return (
    <React.Fragment>
      <div className="cards">
        <div className="card">
          <h3 className="">{props.name} </h3>
          <div className="card__info">
            <h3 className="card__category">{props.price}</h3>
            <h3 className="card__title">{props.category}</h3>
            <button>BUY NOW</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Card;
