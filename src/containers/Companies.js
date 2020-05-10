import React, { useRef, useState, useEffect } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Companies.css";
var Utils = require('./../utils/Utils');

export default function Companies(props) {
  const file = useRef(null);
  const [company, setCompany] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadCompany() {
      const company = {
        id: props.match.params.id
      }

      let data = await Utils.serverGetRequest('companies', true, props.history, company)
      if (Utils.isEmpty(data))
        return data
      else
        return data.companies
    }

    async function onLoad() {
      try {
        const company = await loadCompany();
        const { content } = company;

        setContent(content);
        setCompany(company[0]);
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
    let attachment;
  
    event.preventDefault();
  
    setIsLoading(true);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  }
  
  return (
    <div className="Companies">
      {company && (
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <FormGroup controlId="content">
            <FormControl
              value={company.name}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          <p>Industry</p>
          </FormGroup>
          <FormGroup controlId="content">
            <FormControl
              value={company.industry}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {company.attachment && (
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
          )}
          {/* <FormGroup controlId="file">
            {!company.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup> */}
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
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