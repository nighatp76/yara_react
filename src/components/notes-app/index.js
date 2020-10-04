

import React, { Component } from "react";
import "./index.css";

var notesValue = [
  {
    id: '1',
    task: 'Studying',
    status: 'Active'
  },
  {
    id: '2',
    task: 'Cooking',
    status: 'Completed'
  }
];

export default class NotesApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteStatus: '',
      notes: notesValue,
      completeNotes: notesValue
    };
  }

  /**
   * filter value
   */

  getNote = () => {
    if (this.state.noteName.trim().length > 0 && this.state.noteStatus.trim().length === 0) {
      let value = this.state.notes.filter((data) => {
        return data.task.trim() === this.state.noteName.trim()
      })
      this.setState(() => ({
        completeNotes: value
      }))
    } else if (this.state.noteStatus.trim().length > 0 && this.state.noteName.trim().length === 0) {
      let value = this.state.notes.filter((data) => {
        return data.status.trim() === this.state.noteStatus.trim()
      })
      this.setState(() => ({
        completeNotes: value
      }))
    } else if (this.state.noteName.trim().length > 0 && this.state.noteStatus.trim().length > 0) {
      let value = this.state.notes.filter((data) => {
        return (data.status.trim() === this.state.noteStatus.trim() && data.task.trim() === this.state.noteName.trim())
      })
      this.setState(() => ({
        completeNotes: value
      }))
    }
  }

  /**
   * tab switch
   */
  changeTab = (e) => {
    let value = e.currentTarget.dataset.id;
    if (value === '1') {
      this.setState(() => ({
        completeNotes: notesValue
      }))
    } else if (value === '2') {
      let valueActive = this.state.notes.filter((data) => {
        return (data.status.trim() === 'Active')
      })
      this.setState(() => ({
        completeNotes: valueActive
      }))
    } else if (value === '3') {
      let valueCompleted = this.state.notes.filter((data) => {
        return (data.status.trim() === 'Completed')
      })
      this.setState(() => ({
        completeNotes: valueCompleted
      }))
    }
  }


  render() {
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input data-testid="input-note-name" type="text" className="large mx-8"
            placeholder="Note Title" value={this.state.noteName}
            onChange={async (event) => await this.setState({ noteName: event.target.value })} />
          <input data-testid="input-note-status" type="text" className="large mx-8"
            placeholder="Note Status" value={this.state.noteStatus}
            onChange={async (event) => await this.setState({ noteStatus: event.target.value })} />
          <button className="" data-testid="submit-button" onClick={this.getNote}>Add Note</button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li className="tab-item slide-up-fade-in" data-id="1" onClick={this.changeTab}>All</li>
            <li className="tab-item slide-up-fade-in" data-id="2" onClick={this.changeTab}>Active</li>
            <li className="tab-item slide-up-fade-in" data-id="3" onClick={this.changeTab}>Completed</li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {this.state.completeNotes.map((item, i) => {
                return [
                  <tr key={i}>

                    <td>{item.task}</td>
                    <td>{item.status}</td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
