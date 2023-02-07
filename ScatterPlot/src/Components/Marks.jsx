export const Marks = ({ 
  parsedData, 
  yScale, 
  yValue, 
  xScale, 
  xValue, 
  onHover, 
  hoveredValue,
  circleRadius = 3}) => {
  // loop through each item in parsedData array
  return parsedData.map((d, i) => {
    // create a circle for each item
    return (
      <circle
        // set unique key for each circle using the cell id sequence
        key={d.cellIdSeq}
        // set class name for the circle using the cell type
        className={d.cellType.replace(/[^a-zA-Z0-9]+/g, '')}
        // set the y position using y scale and y value
        cy={yScale(yValue(d))}
        // set the x position using x scale and x value
        cx={xScale(xValue(d))}
        // set the radius of the circle
        r={circleRadius} 
      >
        <title className='tooltip'>CELL TYPE: {d.cellType}; CELL ID: {d.cellIdSeq}</title>
      </circle>
    );
  });
};
