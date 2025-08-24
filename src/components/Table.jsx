import React from 'react'
import { useState } from 'react';

function Table({allTableData, currentData, setCurrentData ,currentPage, setCurrentPage, recordsPerPage}) {

    const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order is ascending
    
    const handleNext = () => {
        const nextPage = currentPage + 1;
        const startIndex = nextPage * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        if(startIndex < allTableData.length){
          setCurrentData(allTableData.slice(startIndex,endIndex));
          setCurrentPage(nextPage);
        }
      }
    
      const handlePrevious = () => {
        const prevPage = currentPage - 1;
        const startIndex = prevPage * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        if(prevPage >= 0){
          setCurrentData(allTableData.slice(startIndex,endIndex));
          setCurrentPage(prevPage);
        }
      }
      
    //   const handleSort = (field) => {
    //     const sortedtable = [...currentData].sort((a,b) => a[field].localeCompare(b[field]));
    //     setCurrentData(sortedtable);
    //   } //only for ascending

    const handleSort = (field) => {
        const sortedTable = [...currentData].sort((a, b) => {
          if (sortOrder === "asc") {
            return a[field].localeCompare(b[field]);
          } else {
            return b[field].localeCompare(a[field]);
          }
        });
        
        setCurrentData(sortedTable);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
      };

  return (
    <>
      <h2>Data Table</h2>
      <div className='handleButton' >
        <button onClick={handlePrevious} disabled={currentPage === 0} >Previous</button>
        <button onClick={handleNext} disabled={(currentPage + 1) * recordsPerPage >= allTableData.length} >Next</button>
      </div>
      <table>
        <thead>
        <tr>
          <th onClick={() => handleSort('sender')} >Sender</th>
          <th onClick={() => handleSort('receiver')} >Receiver</th>
          <th onClick={() => handleSort('timestamp')} >Time Stamp</th>
          <th onClick={() => handleSort('message')} >Message</th>
          <th onClick={() => handleSort('ip_address')} >ip_address</th>
          <th onClick={() => handleSort('seen')} >seen</th>
        </tr>
        </thead>
        <tbody>
          {/* dynamically add table rows first 20 records.... */} 
          {currentData.map((value,index) => (
            <tr key = {index}>
              <td>{value.sender}</td>
              <td>{value.receiver}</td>
              <td>{value.timestamp}</td>
              <td>{value.message}</td>
              <td>{value.ip_address}</td>
              <td>{value.seen.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table