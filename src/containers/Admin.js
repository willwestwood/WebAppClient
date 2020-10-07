import React from "react";
import Tab from "../components/Tab.js";
import "./Admin.css";
import PendingApprovals from "../components/PendingApprovals.js"

export default function Admin(props) {
  var items = [
    { tabName: "Pending Approvals", window: PendingApprovals(props) },
    { tabName: "Option 2", window: <div>Empty 2</div> },
    { tabName: "Option 3", window: <div>Empty 3</div> },
    { tabName: "Option 4", window: <div>Empty 4</div> }
  ]

  return Tab({items: items, ...props});
}
