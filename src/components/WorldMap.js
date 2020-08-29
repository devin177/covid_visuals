import React, { useState, useEffect } from "react"
import { geoPath, geoAlbers } from "d3-geo"
import { feature } from "topojson-client"
import styles from "../styles/WorldMap.module.css"
import * as d3 from "d3";
import axios from 'axios';

console.log(window.location.href);
const projection = geoAlbers()
  .scale(3000)
  .center([-25, 38])

var div = d3.select("body").append("div")
  .attr("width", "50")
  .attr("class", "infoBox")
  .style("display", "none");

const WorldMap = () => {
  // state array will hold our county GeoJSON objects
  const [counties, setCounties] = useState([]);
  const [chosen, setChosen] = useState();
  const [covidInfo, setCovidInfo] = useState();

  // fetch the json data from our public directory
  useEffect(() => {
    fetch("/caCountiesTopo.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        // Populate the state array using topojson's feature fx
        response.json().then(worlddata => {
          setCounties(feature(worlddata, worlddata.objects.subunits).features);
        })
      })
  }, [])

  // click handler
  const clickHandler = async (e, index) => {
    setChosen(counties[index].properties.name);
    div.style("display", "none");

    // Move the text box
    d3.select(".textBox")
      .style("display", "inline")

    d3.select(".dataBox")
      .style("display", "inline");
    
    axios.get(`${window.location.href}data/?county=${counties[index].properties.name}`)
      .then(res => {
        setCovidInfo(res.data[0]);
        console.log(res.data[0]);
      })
  }

  // Updates label based on mouse
  const hoverHandler = (index) => {
    div
      .style("display", "inline")
      .text(counties[index].properties.fullName);
  }

  // Removes hover label when not on any county
  const mouseOutHandler = () => {
    div.style("display", "none");
    d3.select(".textBox")
      .style("display", "none");
    d3.select(".dataBox")
      .style("display", "none");
  }

  return (
    <svg width={ 1000 } height={ 650 } viewBox="0 0 1000 650">
      <g className="counties">
        {/*Fills in counties with white*/}
        {/*Creates black outline*/}
        {counties.map((section, index) => (
            <path
              key={ `path-${ index }` }
              d={ geoPath().projection(projection)(section) }
              className={styles.county}
              fill={ `rgba(255,255,255)` }
              stroke="#000000"
              strokeWidth={ 0.5 }
              onClick={ (e) => clickHandler(e, index) }
              onMouseOver={ () => hoverHandler(index)}
              onMouseOut={ () => mouseOutHandler() }
            />
          ))
        }
      </g>
      <text className="instructions" x="0" y="20">
        Click on a county for more information!
      </text>
      <text className="textBox" x="0" y="100">{chosen}</text>
      <text className="dataBox" x="0" y="200">{JSON.stringify(covidInfo)}</text>
    </svg>
  )
}

export default WorldMap
