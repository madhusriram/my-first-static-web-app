import React from 'react';
//import {useNavigate} from 'react-router-dom';

function App() {
  //const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()];

    const qryString = data
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');
    console.log("/api/mapReq/" + qryString);
    fetch("/api/mapReq/" + qryString);
    //navigate("/api/mapReq/" + qryString);

    // const qryString = new URLSearchParams(formData).toString();
    // console.log(qryString);
    // fetch(qryString);
    // fetch(qryString)
    // .then(response => response.json())
    // .then(response => {
      // Do something with response.
    // })
    // as an improvement, implement caching of URI to serve previously returned answers
    // maybe set a timer to purge the cache regularly
  }

  return (
    <div className="wrapper">
    <h1>ATM Mapper</h1>
    <form id="nameform" onSubmit={handleSubmit}>
      <fieldset>
        <legend> Enter IP Address and a routing method!</legend>
        <label for="ip">IP:</label>
        <input type="text" id="ip" name="ip" required></input>
        <label for="routingmethod-select">Routing Method: </label>
        <select name="routingMethod" id="routingmethod-select">
          <option value="">--Please choose an option--</option>
          <option value="geo">Geo</option>
          <option value="default">Default(Perf)</option>
        </select>
      </fieldset>
      <button type="submit" class="buttonClass">Submit</button>
    </form>
    </div>
  )
}

export default App;
