import { useState, useEffect } from 'react';
import { fetchData } from './fetchData';
import { scaleLinear, extent, zoom, zoomTransform, select } from 'd3';
import { AxisBottom } from './Components/AxisBottom';
import { AxisLeft } from './Components/AxisLeft';
import { Marks } from './Components/Marks';
import { Legend } from './Components/Legend.jsx';
import './App.css';

// Define the margins for the visualization
const margin = {
  top: 20, // Top margin
  right: 280, // Right margin
  bottom: 100, // Bottom margin
  left: 100 // Left margin
};

// The offset for the x axis label
const xAxisLabelOffset = 50;

// The offset for the y axis label
const yAxisLabelOffset = 60;

// The density of the ticks on both x and y axis
const tickDensity = 30;

// The opacity value used in the Marks and Legend components
const fadeOpacity = 0.2;

// The main component that renders the visualization
export default function App() {
  // Fetch the data and parse it
  const { parsedData, cellMetaData } = fetchData();
  
  // State to store the hovered cell type in the legend
  const [hoveredValue, setHoveredValue] = useState(null);

  // State to store the hovered cell in the graph
  const [cellHoveredValue, setCellHoveredValue] = useState(null);

  // State to store the window height and width
  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });  

  // State to store the circle radius
  const [circleRadius, setCircleRadius] = useState(1.5);

  // If the data has not finished being parsed, return the loading screen
  if (!parsedData) {
    return <pre>Loading...</pre>
  }

  // Filter the data based on the hovered cell type in the legend
  const filteredData = parsedData.filter(d => hoveredValue === d.cellType);

  // Use the useEffect hook to handle the window resize event
  useEffect(() => {
    // Function to handle the window resize event
    const handleResize = () => {
      // Update the windowDimensions state with the new inner height and width values
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    // Add the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove the event listener for window resize when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the useEffect hook only runs on component mount

  // Calculate the inner height and width based on the margin convention
  const innerHeight = windowDimensions.height - margin.top - margin.bottom;
  const innerWidth = windowDimensions.width - margin.left - margin.right;

  // Accessor functions to retrieve the x and y values from the data object
  const xValue = d => d.x;
  const yValue = d => d.y;

  // Axis labels for the x and y values
  const xAxisLabel = 'xumap';
  const yAxisLabel = 'yumap';

 // Creating x and y scales
// We use the scaleLinear() method from d3 to create linear scales
const xScale = scaleLinear()
  // Set the domain of the scale using the extent utility function, which returns the minimum and maximum values in the data array
  .domain(extent(parsedData, xValue))
  // Set the range of the scale, which determines the pixel values to use for the scale
  .range([0, innerWidth])
  // Use the nice() method to round the domain values to the nearest nice value, such as a whole number, to make the scale more readable
  .nice();

const yScale = scaleLinear()
  // Set the domain of the scale using the extent utility function, which returns the minimum and maximum values in the data array
  .domain(extent(parsedData, yValue))
  // Set the range of the scale, which determines the pixel values to use for the scale
  .range([0, innerHeight])
  // Use the nice() method to round the domain values to the nearest nice value, such as a whole number, to make the scale more readable
  .nice();


return (
  <>
    <svg
      width={windowDimensions.width}
      height={windowDimensions.height}
      style={{overflow:'hidden'}}
      >
      {/* Translate the `g` element by the margin values defined above */}
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Render the bottom x-axis using the xScale and innerHeight */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickDensity={tickDensity}
        />
        {/* Render the x-axis label */}
        <text
          className='axis-label'
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor='middle'
        >
          {xAxisLabel}
        </text>
        {/* Render the left y-axis using the yScale, innerWidth and margin */}
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          margin={margin}
          tickDensity={tickDensity}
        />
        {/* Render the y-axis label */}
        <text
          className='axis-label'
          textAnchor='middle'
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        {/* Translate the `g` element for the legend component */}
        <g transform={`translate(${innerWidth + 30}, 35)`}>
          {/* Render the legend label */}
          <text
            className='legend-label'
            textAnchor='middle'
            x={40}
            y={-25}
          >
            Cell Type Legend
          </text>
          {/* Render the Legend component */}
          <Legend
            cellMetaData={cellMetaData}
            circleRadius= {8} 
            tickSpacing = {28}
            tickTextOffset = {20}
            onHover = {setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        {/* Render the Marks component with opacity defined by the hovered value */}
        <g opacity={hoveredValue ? fadeOpacity: 1}>
          <Marks
            parsedData={parsedData}
            yScale={yScale}
            yValue={yValue}
            xScale={xScale}
            xValue={xValue}
            circleRadius={circleRadius}
            onHover = {setCellHoveredValue}
        />
        </g>
        {/* Render the filtered Marks component */}
        <Marks
          parsedData={filteredData}
          yScale={yScale}
          yValue={yValue}
          xScale={xScale}
          xValue={xValue}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  </>
  )
}
