import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Tab from "../components/Tab.js";
import "./Admin.css";
import SplitPane from "../components/SplitPane.js"
import PendingApprovals from "../components/PendingApprovals.js"

export default function Admin(props) {
  const [optionNum, setOptionNum] = useState(0)
  const [option, setOption] = useState()

  var leftComponent = (
    <div className="Admin">
      <ListGroup className="Options">
          <ListGroupItem className="item" action onClick={() => setOptionNum(0)}>
            <h4>Pending approval</h4>
          </ListGroupItem>
          <ListGroupItem className="item" action onClick={() => setOptionNum(1)}>
            <h4>Option 2</h4>
          </ListGroupItem>
          <ListGroupItem className="item" action onClick={() => setOptionNum(2)}>
            <h4>Option 3</h4>
          </ListGroupItem>
      </ListGroup>
    </div>
  );

  useEffect(() => {
    switch(optionNum)
    {
      case 0: setOption(PendingApprovals())
      break
      default: setOption(<div>Empty</div>)
      break
    }
  }, [optionNum]);

  let childProps = {
    tabs: ["Pending Approvals", "Option 2", "Option 3", "Option 4"],
    windows: [PendingApprovals(), <div>Empty 2</div>, <div>Empty 3</div>, <div>Empty 4</div>]
  }

  return Tab(childProps);

  /*return (
    <SplitPane left={leftComponent} right={option} leftWidth="30" rightWidth="70"/>
  );*/
}
