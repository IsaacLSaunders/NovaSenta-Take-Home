// AxisBottom component to render the x-axis of a chart
export const AxisBottom = ({ xScale, innerHeight, tickDensity }) =>
  // use the xScale and tickDensity props to generate an array of tick values
  xScale.ticks(tickDensity).map(tickValue => (
  // render a <g> element for each tick value in the tickValues array
    <g 
      key={tickValue} 
      className='tick' 
      style={{ opacity: 1 }} 
      transform={`translate(${xScale(tickValue)},0)`}
    >
      {/* render a line that extends from the bottom of the chart to the y2 coordinate */}
      <line y2={innerHeight} />
      {/* render a text element with the tick value as its content */}
      <text 
        y={innerHeight + 3} 
        dy=".71em" 
        style={{ textAnchor: 'middle' }}
      >
        {tickValue}
      </text>
    </g>
  ));