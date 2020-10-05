import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import SplitPane from "./SplitPane.js"
import "./Tab.css"

export default function Tab(props) {
  const [ref, setRef] = useState(0)
  const [window, setWindow] = useState()

  var tabs = (
    <div className="Tabs">
      <ListGroup className="tablist">
          {props.tabs.map((value, index) => {
              return <ListGroupItem className="tab" action onClick={() => setRef(index)}>
                        <h4>{value}</h4>
                    </ListGroupItem>
          })}
      </ListGroup>
    </div>
  );

  useEffect(() => {
    setWindow(props.windows[ref])
  }, [ref]);

  return (
    <SplitPane left={tabs} right={window} leftFlex="0.3" rightFlex="0.7"/>
  );
}
