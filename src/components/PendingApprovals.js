import React from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./PendingApprovals.css"

export default function PendingApprovals(props) {
  return (
    <div className="PendingApprovals">
      <ListGroup className="Items">
        <ListGroupItem className="approval">
            <h4>Person 1</h4>
            <button>Approve</button>
        </ListGroupItem>
        <ListGroupItem className="approval">
            <h4>Person 2</h4>
            <button>Approve</button>
        </ListGroupItem>
        <ListGroupItem className="approval">
            <h4>Person 1</h4>
            <button>Approve</button>
        </ListGroupItem>
        <ListGroupItem className="approval">
            <h4>Person 2</h4>
            <button>Approve</button>
        </ListGroupItem>
        <ListGroupItem className="approval">
            <h4>Person 1</h4>
            <button>Approve</button>
        </ListGroupItem>
        <ListGroupItem className="approval">
            <h4>Person 2</h4>
            <button>Approve</button>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
