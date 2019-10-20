import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import axios from 'axios';
var Utils = require('./../utils/Utils');
var Session = require('./../utils/Session');

// export default class Home extends Component {
//   render() {
//     console.log(Session.getSessionCookie())
//     return (
//       <div className="Home">
//         <div className="lander">
//           <h1>CRM</h1>
//           <p>A customer relationship management tool</p>
//         </div>
//       </div>
//     );
//   }
// }

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const _notes = await loadNotes();
        setIsLoading(false);
        console.log('notes:')
        console.log(_notes)
        setNotes(_notes);
      } catch (e) {
        alert(e);
      }
  
      //setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  async function loadNotes() {
    //return API.get("notes", "/notes");

    // return [{
    //   noteId: 1,
    //   content: "This is a test note",
    //   createdAt: "2015-01-01"
    // }]

    let body = {
      token: Session.getSessionCookie().token
    }

    var companies = []

    //try {
      await axios.get(Utils.getServerConnectionStr('companies', body))
      .then(response => {
        if (response.data.success === 'true')
          companies = response.data.companies
        else
          alert(response.data.message)
      })
      .catch(e => {
        console.log(e)
        this.props.history.push("/error");
      })

      return companies
  }

  function renderNotesList(notes) {
    console.log('HELLO')
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.id} to={`/notes/${note.id}`}>
          <ListGroupItem header={note.name.trim().split("\n")[0]}>
            {"Created: " + new Date().toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
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

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Companies</PageHeader>
        <ListGroup>
          {notes.length > 0 && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}