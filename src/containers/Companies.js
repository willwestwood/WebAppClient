import React, { useState, useEffect } from "react";
import { FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Companies.css";
var Utils = require('./../utils/Utils');
var companyTypes = require('./../utils/StaticData').companyTypes;

export default function Companies(props) {
  const isNew = !('id' in props.match.params)

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState(companyTypes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleCompanyTypeSelect(eventKey, event) {
    setType(companyTypes[eventKey])
  }

  useEffect(() => {
    if (!isNew)
    {
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
          setName(company.name)
          setIndustry(company.industry)
          setType(company.type)
        } catch (e) {
          alert(e);
        }
      }

      onLoad()
    }
  }, [props.match.params.id]);

  function validateForm() {
    return name.length > 0;
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (isNew)
      handleCreate()
    else
      handleSave()
  }

  async function handleCreate() {
    try {
      await createCompany(name, industry, type);
    } catch (e) {
        alert(e);
        setIsLoading(false);
    }
    props.history.push("/home");
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

  async function handleSave() {
    const company = {
      id: props.match.params.id,
      name: name,
      type: type,
      industry: industry
    }

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
      <h1 className="description">{isNew ? "New Company" : "Edit Company"}</h1>
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
          <ControlLabel>Type</ControlLabel>
          <FormGroup controlId="companyType">
          <DropdownButton
            title={type}
            id = "documentType"
            onSelect={handleCompanyTypeSelect.bind(this)}
            className="companyType">
            {companyTypes.map((opt, i) => (
              <MenuItem key={i} eventKey={i}>
                {opt}
              </MenuItem>
            ))}
          </DropdownButton>
        </FormGroup>
          {!isNew && <LoaderButton className="buttons"
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>}
          {isNew && <LoaderButton className="buttons"
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>}
          {!isNew && <LoaderButton className="buttons"
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>}
        </form>
    </div>
  );
}