import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from 'axios';
import "./NewCompany.css";
var Session = require('./../utils/Session');
var Utils = require('./../utils/Utils');

const companyTypes = ["Customer", "Supplier"];

export default function NewCompany(props) {
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyType, setCompanyType] = useState(companyTypes[0]);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return companyName.length > 0;
  }

  async function handleSelect(eventKey, event) {
    setCompanyType(companyTypes[eventKey]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
        await createCompany(companyName, companyIndustry, companyType);
        props.history.push("/home");
    } catch (e) {
        alert(e);
        setIsLoading(false);
    }
  }
    
  function createCompany(name, industry, type) {
    try {
      const company = {
          name: name,
          type: type,
          industry: industry
      }

      let params = {
        'x-access-token': Session.getSessionCookie().token
      }

      axios.post(Utils.getServerConnectionStr('companies', company), {}, { headers: params })
      .then(response => {
          console.log(response)
          if (response.data.success == true)
          {
            alert("Success!")
          }
          else
              alert(response.data.message)
      })
      .catch(e => console.log(e))

      //await Auth.signIn(this.state.email, this.state.password);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="NewCompany">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="companyName">
          <ControlLabel>Company Name</ControlLabel>
          {/* <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          /> */}
          <FormControl
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
            />
        </FormGroup>
        <FormGroup controlId="companyIndustry">
          <ControlLabel>Industry</ControlLabel>
          <FormControl
              value={companyIndustry}
              onChange={e => setCompanyIndustry(e.target.value)}
            />
        </FormGroup>
        <FormGroup controlId="companyType">
          <ControlLabel>Type</ControlLabel>
          <DropdownButton
            title={companyType}
            id = "documentType"
            onSelect={handleSelect.bind(this)}
            className="companyType"
          >
            {companyTypes.map((opt, i) => (
              <MenuItem key={i} eventKey={i}>
                {opt}
              </MenuItem>
            ))}
          </DropdownButton>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}