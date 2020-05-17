import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewCompany.css";
var Utils = require('./../utils/Utils');
var companyTypes = require('./../utils/StaticData').companyTypes;

export default function NewCompany(props) {
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyType, setCompanyType] = useState(companyTypes[0]);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return companyName.length > 0;
  }

  async function handleCompanyTypeSelect(eventKey, event) {
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
  
  async function createCompany(name, industry, type) {
    try {
      const company = {
          name: name,
          type: type,
          industry: industry
      }

      await Utils.serverPostRequest('companies', true, props.history, company)

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
            onSelect={handleCompanyTypeSelect.bind(this)}
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