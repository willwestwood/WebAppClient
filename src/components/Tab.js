import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import SplitPane from "./SplitPane.js"
import "./Tab.css"

export default function Tab(props) {
  const [ref, setRef] = useState(0)

  var tabs = (
    <div className="Tabs">
      <ListGroup className="tablist">
          {props.items.map((value, index) => {
              return <ListGroupItem className="tab"
                    key={index}
                    style={{"backgroundColor": index == ref ? "rgb(200,200,200)" : "white"}} 
                    action="" onClick={() => setRef(index)}>
                        <h4>{value.tabName}</h4>
                    </ListGroupItem>
          })}
      </ListGroup>
    </div>
  );

  return (
    <SplitPane left={tabs} right={props.items.length > 0 ? props.items[ref].window : <div>No options</div>} leftFlex="0.3" rightFlex="0.7"/>
  );
}
