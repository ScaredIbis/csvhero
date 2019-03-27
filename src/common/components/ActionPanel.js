import React, { Component } from 'react'
import '../styles/ActionPanel.css';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import NavItems from './NavItems';
import Filter from '../../filter/containers/Filter';
import Edit from '../../edit/containers/Edit';
import Visualise from '../../visualise/containers/Visualise';
import Export from '../../export/containers/Export';

class ActionPanel extends Component {
  render() {
    return (
      <Router>
        <NavItems/>
        <div className="action-panel-content">
          <Route path="/app/filter" exact component={Filter} />
          <Route path="/app/edit" exact component={Edit} />
          <Route path="/app/visualise" exact component={Visualise} />
          <Route path="/app/export" exact component={Export} />
          <Route path="/app" exact render={() => (<Redirect to="/app/filter"></Redirect>)}/>
        </div>
      </Router>
    )
  }
}

export default ActionPanel;