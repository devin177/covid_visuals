import React, { useState } from 'react';
import * as d3 from 'd3';

let div = d3.select("body").append("div").attr("class", "mt")

const MouseTracker = () => {
  const [coordinates, setCoordinates] = useState({x: null, y: null});

  const mouseHandler = (e) => {
    setCoordinates({x: e.screenX, y: e.screenY});
    console.log(coordinates);
  }


  return(
    <div
      onMouseMove={() => mouseHandler()}
      className="MT"
    ></div>
  )

}

export default MouseTracker;
