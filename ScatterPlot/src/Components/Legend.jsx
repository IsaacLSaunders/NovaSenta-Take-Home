export const Legend = ({
  cellMetaData, 
  circleRadius=8, 
  tickSpacing = 20, 
  tickTextOffset = 15,
  onHover,
  hoveredValue,
  fadeOpacity
}) => {
  // Check if cellMetaData exists. If it doesn't, return null.
  if (!cellMetaData) return null;

  // Destructure the cellMetaData object into variables
  const {cellTypes, numberOfCellsByType, percentageOfCellsByType} = cellMetaData;

  // Map over the cellTypes array, return a group of elements for each item in the array
  return cellTypes.slice(0, cellTypes.length - 1).map((d, index) => ( 
        <g 
          // Add a unique key for each group
          key={d} 
          // Use transform to position each group based on its index in the array
          transform={`translate(0,${index * tickSpacing})`}
          // Set opacity based on hover state using short circuit evaluation
          opacity={hoveredValue && d !== hoveredValue ? fadeOpacity : 1}
          // Add mouse event listeners to update hoveredValue
          onMouseEnter={() => {
            onHover(d)
          }}
          onMouseLeave={() => {
            onHover(null)
          }}
        >
          // Add a circle for each group, with a class based on the name of the cell type
          <circle className={d.replace(/[^a-zA-Z0-9]+/g, '')} r={circleRadius}/>
          // Add a label for each group, with the name of the cell type
          <text
            x={tickTextOffset}
            dy=".32em" 
          >{d}</text>
        </g>
      ));
}
