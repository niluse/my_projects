import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

const Homepage = () => {
    const [backendData,setBackendData] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000').then(
            response => response.json()
        ).then(
            data => {
                console.log('recevied data: ',data)
                if(data.result && Array.isArray(data.result.rows)){
                    setBackendData(data.result.rows)
                } else {
                    console.log('unexpected data format: ', data)
                }
            }
        )
        .catch(error => {
            console.error('there was a problem with the fetch operation')
        })
    }, [])
  return (
    <div>
        <Header/>
        <div className="container">
            {
                (backendData.length === 0) ? (
                    <p>Loading...</p>
                ) : (
                    backendData.map((data) => (
                            <ProductCard {...data} key={data.id} />
                    ))
                )
            }
        </div>
    </div>

  )
}

export default Homepage