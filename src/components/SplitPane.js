import React from "react";
import "./SplitPane.css";

export default function SplitPane(props) {
  return (
    <div className="SplitPane">
        <div className="split left" style={{flex: props.leftFlex}}>
            {props.left}
        </div>
        <div className="split right" style={{flex: props.rightFlex}}>
            {props.right}
        </div>
    </div>
  );
}