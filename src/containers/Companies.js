import React, { useRef, useState, useEffect } from "react";
var Utils = require('./../utils/Utils');

export default function Companies(props) {
  const file = useRef(null);
  const [company, setCompany] = useState(null);
  const [content, setContent] = useState("");

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
        setCompany(company);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  return (
    <div className="Companies">
      <p>Companies</p>
    </div>
  );
}