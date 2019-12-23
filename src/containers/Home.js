import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
var Utils = require('./../utils/Utils');

export default function Home(props) {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const companies = await loadCompanies();
        await Utils.sortArray(companies, 'name')
        setIsLoading(false);
        setCompanies(companies);
      } catch (e) {
        alert(e);
      }
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  async function loadCompanies() {
    let data = await Utils.serverGetRequest('companies', true, props.history)
    if (Utils.isEmpty(data))
      return data
    else
      return data.companies
  }

  function renderCompaniesList(companies) {
    return [{}].concat(companies).map((company, i) =>
      i !== 0 ? (
        <LinkContainer key={company.id} to={`/companies/${company.id}`}>
          <ListGroupItem header={company.name.trim().split("\n")[0]}>
            {company.industry === null ? "" : (company.industry + " - ")}
            {company.type}
            {/* {"Created: " + new Date().toLocaleString()} */}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/companies/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new company
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>CRM</h1>
        <p>A customer relationship management tool</p>
      </div>
    );
  }

  function renderCompanies() {
    return (
      <div className="companies">
        <PageHeader>Companies</PageHeader>
        <ListGroup>
          {!isLoading && renderCompaniesList(companies)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderCompanies() : renderLander()}
    </div>
  );
}