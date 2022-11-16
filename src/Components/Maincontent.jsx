import axios from "axios";
import React, { useEffect, useState } from "react";

function Maincontent() {

  const [sample, setSample] = useState([])

  const [img, setImg] = useState('')

  const [load, setLoad] = useState(false)

  const [change, setChange] = useState([])

  const searchApiCall = (search) => {
    setLoad(false)
    const searchConst = search ? search : 'people'
    const url = `https://api.pexels.com/v1/search/?query=${searchConst}`
    const access_token = "563492ad6f91700001000001e93dc3c91a3849268be82f8cfc9b9534"
    axios.get(url, {
      headers: {
        'Authorization': `${access_token}`
      }
    }).then((response) => {
      console.log(response.data);
      setSample(response.data.photos)
      setChange(response.data.photos)
      setLoad(true)
    })
  }

  useEffect(() => {
    searchApiCall()
  }, [])

  function onChange(e) {
    const searchvalue = e.target.value
    setImg(searchvalue)
  }

  function buttonHandler() {
    searchApiCall(img)
  }

  function newHandler(e) {
    if (e.target.value === '') {
      setChange(sample)
    } else {
      const newValues = sample.filter((arrow) => arrow.photographer === e.target.value)
      setChange(newValues)
    }
  }

  return (
    <div>
      <div style={{ textAlign: "center", width: "25vw", margin: "150px auto 0" }}>
        <h1>Images</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search....."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={onChange}
            value={img}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={buttonHandler} >
              Search
            </button>
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter here....."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={newHandler}

          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" className="btn btn-dark" onClick={() => searchApiCall('mountains')}>Mountains</button>
          <button type="button" className="btn btn-dark" onClick={() => searchApiCall('beaches')}>Beaches</button>
          <button type="button" className="btn btn-dark" onClick={() => searchApiCall('birds')}>Birds</button>
          <button type="button" className="btn btn-dark" onClick={() => searchApiCall('food')}>Food</button>
        </div>
        <h4 style={{ marginTop: '40px' }}>Pictures</h4>
      </div>
      <div style={{ display: 'flex', width: '60vw', margin: 'auto', flexWrap: 'wrap' }}>
        {load ? change.map((images) =>
          <div style={{ margin: '15px' }} key={images.id}>
            <img src={images.src.small} alt="" style={{ height: '150px', width: '150px' }} />
          </div>
        ) : <div className="spinner-border" role="status" style={{ margin: 'auto' }}>
          <span className="sr-only"></span>
        </div>
        }
      </div>

    </div>
  );
}

export default Maincontent;
