import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import SplitPane from 'react-split-pane';
import TopBar from './common/containers/TopBar'
import RowViewer from './common/containers/RowViewer';

class App extends Component {
  render() {
    return (
      <div id="App">
        <TopBar />
        <div id="AppContent">
          <SplitPane split="horizontal" defaultSize={500} minSize={100} primary="second">
            <div>
            </div>
            <RowViewer/>
          </SplitPane>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

export default connect(mapStateToProps)(App);
