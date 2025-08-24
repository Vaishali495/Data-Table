import { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '../src/components/Table'
import './App.css'

function App() {
  const [allTableData, setAllTableData] = useState([]);
  const [currentData, setCurrentData] = useState([]);     //data that is shown on the page
  const [currentPage, setCurrentPage] = useState(0);      //current page number

  const recordsPerPage = 20;

  useEffect(() => {
    axios.get('http://cqtestga.com:4000/data/messages')
    .then(res => {
      console.log("res: ",res)
      setAllTableData(res.data)
      setCurrentData(res.data.slice(0,recordsPerPage));
    })
    .catch(err => console.log(err))
},[])

  return (
    <>
      <Table allTableData={allTableData} currentData={currentData} setCurrentData={setCurrentData} currentPage={currentPage} setCurrentPage={setCurrentPage} recordsPerPage = {recordsPerPage} />
    </>
  )
}

export default App