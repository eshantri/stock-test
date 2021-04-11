import React from "react";
import Cards from "./Cards";

export default function CardList(props) {
  let cardData = props.cardData;
  return (
    <div className="card-con">
      {cardData.map((card) => (
        <Cards data={card} />
      ))}
    </div>
  );
}
