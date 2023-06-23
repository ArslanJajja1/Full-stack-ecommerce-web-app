import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;
    return (
      <div className="text-center">
        <span>
          <StarRating
            starDimension="15px"
            starSpacing="1px"
            starRatedColor="yellow"
            rating={result}
            editing={false}
          />
          {"  "}
          <span className="text-white">({p.ratings.length})</span>
        </span>
      </div>
    );
  }
};
