import React from 'react';

function App() {
  const handleSubmit = event => {
    event.preventDefault();
  }

  return (
    <div className="wrapper">
    <h1>ATM Mapper</h1>
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend> Enter IP Address and a routing method!</legend>
        <label for="ip">IP:</label>
        <input type="text" id="ip" name="ip" required></input>
        <label for="routingmethod-select">Routing Method: </label>
        <select name="routingMethod" id="routing-method">
          <option value="">--Please choose an option--</option>
          <option value="geo">Geo</option>
          <option value="default">Default(Perf)</option>
        </select>
      </fieldset>
      <button class="buttonclass" type="button">Submit</button>
    </form>
    </div>
  )
}

export default App;
