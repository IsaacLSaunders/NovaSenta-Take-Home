// AxisLeft component to render the y-axis of a chart
export const AxisLeft = ({ yScale, innerWidth, margin, tickDensity }) => 
  // use the yScale and tickDensity props to generate an array of tick values
  yScale.ticks(tickDensity).map(tickValue => (
  // render a <g> element for each tick value in the tickValues array
    <g 
      key={tickValue} 
      className='tick' 
      style={{ opacity: 1 }} 
      transform={`translate(0,${yScale(tickValue)})`}
    >
      {/* render a line that extends from the left of the chart to the x2 coordinate */}
      <line x2={innerWidth} />
      {/* render a text element with the tick value as its content */}
      <text 
        x={-margin.left / 3} 
        dy=".71em" 
        style={{ textAnchor: 'end' }}
      >
        {tickValue}
      </text>
    </g>
  ));