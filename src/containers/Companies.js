import React, { useRef, useState, useEffect } from "react";
import { FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Companies.css";
var Utils = require('./../utils/Utils');
var companyTypes = require('./../utils/StaticData').companyTypes;

export default function Companies(props) {
  const file = useRef(null);
  const [company, setCompany] = useState(null);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [companyType, setCompanyType] = useState(companyTypes[0]);

  async function handleCompanyTypeSelect(eventKey, event) {
    setType(companyTypes[eventKey])
  }

  useEffect(() => {
    async function loadCompany() {
      const company = {
        id: props.match.params.id
      }

      let data = await Utils.serverGetRequest('companies', true, props.history, company)
      if (Utils.isEmpty(data))
        return data
      else if (data.companies.length > 0)
        return data.companies[0]
      else
        throw new Error('Company not found')
    }

    async function onLoad() {
      try {
        const company = await loadCompany();
        setCompany(company);
        setName(company.name)
        setIndustry(company.industry)
        setType(company.type)
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return true //content.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  }

  async function handleSave(event) {
    event.preventDefault();
  
    setIsLoading(true);

    const company = {
      id: props.match.params.id,
      name: name,
      type: type,
      industry: industry
    }

    console.log(company)
    await Utils.serverPostRequest('companies', true, props.history, company, 'update')
    
    props.history.push("/home");
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm("Are you sure you want to delete this company?");
  
    if (!confirmed)
      return;
  
    setIsDeleting(true);

    const company = {
      id: props.match.params.id
    }

    await Utils.serverPostRequest('companies', true, props.history, company, 'delete')
    
    props.history.push("/home");
  }
  
  return (
    <div className="Companies">
      {company && (
        <form onSubmit={handleSubmit}>
          <ControlLabel>Name</ControlLabel>
          <FormGroup controlId="content">
            <FormControl
              value={name}
              componentClass="textarea"
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <ControlLabel>Industry</ControlLabel>
          <FormGroup controlId="content">
            <FormControl
              value={industry}
              componentClass="textarea"
              onChange={e => setIndustry(e.target.value)}
            />
          </FormGroup>
          {/* {company.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={company.attachmentURL}
                >
                  {formatFilename(company.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )} */}
          {/* <FormGroup controlId="file">
            {!company.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup> */}
          <ControlLabel>Type</ControlLabel>
          <FormGroup controlId="companyType">
          <DropdownButton
            title={type}
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
            onClick={handleSave}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}