import { useState, useEffect, useMemo } from 'react';

export const fetchData = () => {
  // Use state hook to initialize state variables to store the data fetched from the API
  const [cellMetaData, setCellMetaData] = useState(null);
  const [xCoords, setXCoords] = useState(null);
  const [yCoords, setYCoords] = useState(null);
  const [cellIds, setCellIds] = useState(null);
  const [cellTypePoints, setCellTypePoints] = useState(null);

  // useEffect hook to fetch data from the API when the component is mounted
  useEffect(() => {
    // Async function to fetch data from the API
    const fetchData = async () => {
      // Fetch the data from the API
      const response = await fetch('./public/testData.json');

      // Destructure the returned data from the API
      const { 
        celltypes, 
        celltypenums, 
        celltypepercents, 
        xumap, 
        yumap, 
        cellid, 
        celltype 
      } = await response.json();

      // Update the cellMetaData state variable with the destructured data
      setCellMetaData({
        cellTypes : [...celltypes], 
        numberOfCellsByType: [...celltypenums], 
        percentageOfCellsByType: [...celltypepercents]
      });
      
      // Update the xCoords state variable with the xumap data
      setXCoords(xumap);

      // Update the yCoords state variable with the yumap data
      setYCoords(yumap);

      // Update the cellIds state variable with the cellid data
      setCellIds(cellid);

      // Update the cellTypePoints state variable with the celltype data
      setCellTypePoints(celltype);
    }

    // Call the fetchData function and catch any errors
    fetchData().catch(console.error);
  }, []);

  // Use useMemo hook to create the parsedData array
  const parsedData = useMemo(() => {
    // Return an empty array if xCoords state variable is null
    if (xCoords === null) return [];

    // Array to store the parsed data
    const result = [];

    // Loop through all xCoords and create an object with the corresponding values of cellIds, cellTypePoints, and yCoords
    for (let i = 0; i < xCoords.length; i++) {
      result.push({
        'cellIdSeq': cellIds[i],
        'cellType': cellTypePoints[i],
        'x': xCoords[i],
        'y': yCoords[i]
      })
    }

    // Return the parsed data
    return result;
  }, [cellTypePoints, cellIds, xCoords, yCoords]);

  // Return the parsedData and cellMetaData
  return { parsedData, cellMetaData };
};
