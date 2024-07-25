import React from 'react'

const Picture = ({data}) => {
  return (
    <div className='picture' key = {data.id}>
          <img
            src={data.src}
            alt={data.photographer}
            />
          <p> Photograph by {data.photographer} </p>
        </div>
  )
}

export default Picture