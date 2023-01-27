import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { isIPV4Address, isIPV6Address } from 'ip-address-validator';

class Result extends React.Component {
  render() {
    return this.props.result;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }
 
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
      return;
    }

    // submit to backend!
    const formData = new FormData(e.target);
    const data = [...formData.entries()];

    const qryString = data
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');
    
    console.log("API call: api/mapReq?" + qryString);

    fetch("/api/mapReq?" + qryString)
    .then(response => response.text())
    .then(data => data);

    _data.statusCode = "Success";
    _data.result = data;

    const dom = document.getElementById("resultcontainer");
    const element = <Result result={data}/>;
    ReactDOM.render(element, dom);
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
      <form id="nameform" className="nameform" onSubmit= {this.handleSubmit.bind(this)}>
        <fieldset>
          <legend> Enter IP Address and a routing method!</legend>
          <input name="ip" type="text" size="30" onChange={this.handleChange.bind(this, "ip")} value={this.state.fields["ip"]}/>
          <span className="error">{this.state.errors["ip"]}</span>
          <select name="routingMethod" id="routingMethod-select">
            <option value="">--Please choose an option</option>
            <option value="geo">Geo</option>
            <option value="default">Default(Perf)</option>
          </select>
        </fieldset>
        <button type="submit" class="buttonClass">Submit</button>
      </form>

      <div id="resultcontainer">

      </div>
    </div>
    )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
