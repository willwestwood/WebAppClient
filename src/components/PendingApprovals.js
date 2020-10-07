import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./PendingApprovals.css"
var Utils = require('./../utils/Utils');

export default function PendingApprovals(props) {
  const [users, setUsers] = useState([]);

  async function loadPendingUsers() {
    const param = {
      isPending: 1
    }

    let data = await Utils.serverGetRequest('users', true, props.history, param)
    if (Utils.isEmpty(data))
      return data
    else if (data.users.length > 0)
      return data.users
    else
      return null
  }

  useEffect(() => {
    async function load() {
      var result = await loadPendingUsers()
      setUsers(result)
    }
    load()
  }, []);

  return (
    <div className="PendingApprovals">
      <ListGroup className="Items">
          { users.length > 0 ? 
              users.map((value, index) => {
              return <ListGroupItem className="approval" key={index}>
                      <div className="description">
                        <h4>{value.firstName + " " + value.secondName}</h4>
                        <p>{value.emailAddress}</p>
                      </div>
                      <LoaderButton className="buttons" bsSize="large" bsStyle="primary">Approve</LoaderButton>
                      <LoaderButton className="buttons" bsSize="large" bsStyle="danger">Reject</LoaderButton>
                    </ListGroupItem>
          })
        : <ListGroupItem className="approval" key={0}>
            <h4>No pending approvals...</h4>
          </ListGroupItem>
        }
      </ListGroup>
    </div>
  );
}
