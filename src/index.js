import { render } from '@testing-library/react/dist/pure';
import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import { isIPV4Address } from 'ip-address-validator';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }
/*
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()];

    // TODO validate v4/v6 address
    const qryString = data
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');
    
    // validate address

    console.log("/api/mapReq?" + qryString);

    return fetch("/api/mapReq?" + qryString)
    .then(response => response.text())
    .then(data => console.log(data));

    // const qryString = new URLSearchParams(formData).toString();
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
*/
  
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["ip"]) {
      formIsValid = false;
      errors["ip"] = "IP cannot be empty";
    }

    if (!isIPV4Address(fields["ip"]) && !isIPV6Address(fields["ip"])) {
      formIsValid = false;
      errors["ip"] = "Invalid IP. Please enter a valid IPv4/IPv6 address";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.handleValidation()) {
      alert("Form has errors!")
    }
  }

  handleChange(field, e){
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  render() {
    return (
    <div className="wrapper">
      <h1>ATM Mapper</h1>
      <form id="nameform" className="nameform" onSubmit= {this.contactSubmit.bind(this)}>
        <fieldset>
          <legend> Enter IP Address and a routing method!</legend>
          <input ref="ip" type="text" size="30" onChange={this.handleChange.bind(this, "ip")} value={this.state.fields["ip"]}/>
          <span className="error">{this.state.errors["name"]}</span>
          <select name="routingMethod" id="routingMethod-select">
            <option value="">--Please choose an option</option>
            <option value="geo">Geo</option>
            <option value="default">Default(Perf)</option>
          </select>
        </fieldset>
        <button type="submit" class="buttonClass">Submit</button>
      </form>
    </div>
    )
    }
}

//export default App;

ReactDOM.render(<App />, document.getElementById('root'));
