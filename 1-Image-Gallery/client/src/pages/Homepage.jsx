import { useEffect, useState } from 'react';
import React from 'react'
import Picture from '../components/Picture';
import "../styles/style.css"

const Homepage = () => {
    const [backendData, setBackendData] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000").then(
      response => response.json()
    ).then(
      data => {
        console.log("Received data:",data)
        if(data.result && Array.isArray(data.result.rows)){
          setBackendData(data.result.rows)  
        } else {
          console.error("Unexpected data format:", data)
        }
        
      }
    )
    .catch(error=>{
      console.error("there was a problem with the fetch operation")
    })
  },[])

  return (
    <div>
      <header>IMAGE GALLERY</header>
      <div className='container'>
        {( backendData.length === 0) ? (
          <p>Loading...   -ADD IN SKELETHON-</p>
        ) : (
          backendData.map((data) => (
            <Picture data = {data} />
          )
          )
        )}
      </div>
    </div>

  )
}

export default Homepage