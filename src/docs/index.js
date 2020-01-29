/*  eslint-disable import/no-extraneous-dependencies */

import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import "./styles.css";
import Report from "../lib";

const initialState = {
  embedType: "report",
  tokenType: "Embed",
  accessToken: "",
  embedUrl: "",
  embedId: "",
  pageName: "",
  dashboardId: "",
  permissions: "All",
  filterPaneEnabled: "filter-false",
  navContentPaneEnabled: "nav-false",
  visualHeaderFlag: true,
  flag: false
};

class Demo extends Component {
  constructor(props) {
    super(props);
    this.report = null;
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.getCode = this.getCode.bind(this);
    this.toggleAllVisualHeaders = this.toggleAllVisualHeaders.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  getCode(view = true) {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
      dashboardId,
      pageName
    } = this.state;
    const viewAccessToken = accessToken && `${accessToken.slice(0, 10)}...`;

    const viewEmbedUrl = embedUrl && `${embedUrl.slice(0, 10)}...`;

    return `<Report embedType="${embedType}"
    tokenType="${tokenType}"
    accessToken="${view ? viewAccessToken : accessToken}"
    accessToken={accessToken}
    embedUrl="${view ? viewEmbedUrl : embedUrl}"
    embedId="${embedId}"
    dashboardId="${dashboardId}"
    pageName="${pageName}"
    extraSettings={{
      filterPaneEnabled: ${this.state.filterPaneEnabled === "filter-true"},
      navContentPaneEnabled: ${this.state.navContentPaneEnabled === "nav-true"},
    }}
    permissions="${permissions}"
    style={{
      height: '100%',
      border: '0',
      padding: '20px',
      background: '#eee'
    }}
    onLoad={(report) => {
      /*
      you can set filters onLoad using:
      this.report.setFilters([filter]).catch((errors) => {
        console.log(errors);
      });*/
      console.log('Report Loaded!');
      //this.report = report (Read docs to know how to use report object that is returned)
    }}
    onSelectData={(data) => { 
      window.alert('You clicked chart:' + data.visual.title); 
    }}
    onPageChange={(data) => { 
      console.log('You changed page to:' + data.newPage.displayName); 
    }}
    onTileClicked={data => {
      console.log('Data from tile', data);
    }}
  />`;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSelect = state => option => {
    const { value } = option;
    this.resetState(() => this.setState({ [state]: value }));
  };

  toggleAllVisualHeaders() {
    const newSettings = {
      visualSettings: {
        visualHeaders: [
          {
            settings: {
              visible: !this.state.visualHeaderFlag
            }
          }
        ]
      }
    };
    if (this.report) {
      this.report
        .updateSettings(newSettings)
        .then(() => {
          console.log(
            "Visual header was successfully hidden for all the visuals in the report."
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState({
      visualHeaderFlag: !this.state.visualHeaderFlag
    });
  }

  resetState(callback) {
    this.setState(initialState, callback);
  }

  render() {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
      pageName,
      dashboardId,
      flag
    } = this.state;
    const style = {
      report: {
        height: "100%",
        border: "0"
      }
    };

    const embedTypeOptions = ["report", "dashboard"];

    const extraSettings = {
      filterPaneEnabled: this.state.filterPaneEnabled === "filter-true",
      navContentPaneEnabled: this.state.navContentPaneEnabled === "nav-true"
    };

    const filter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Geo",
        column: "Region"
      },
      operator: "In",
      values: ["West"]
    };

    const reportFlag = embedType === "report";

    return (
      <div className="root">
        <SplitterLayout percentage secondaryInitialSize={70}>
          {this.state.flag ? (
            <Report
              embedType={embedType}
              tokenType={tokenType}
              accessToken={accessToken}
              embedUrl={embedUrl}
              embedId={embedId}
              dashboardId={dashboardId}
              extraSettings={extraSettings}
              permissions={permissions}
              pageName={pageName}
              style={style.report}
              onLoad={report => {
                console.log("Report Loaded!");
                this.report = report;
              }}
              onRender={report => {
                console.log("Report Redered!");
                this.report = report;
              }}
              onSelectData={data => {
                window.alert(`You clicked chart: ${data.visual.name}`);
              }}
              onPageChange={data => {
                console.log(`You changed page to: ${data.newPage.displayName}`);
              }}
              onTileClicked={data => {
                console.log("Data from tile", data);
              }}
            />
          ) : (
            <div className="placeholder">
              <h1>Report will be displayed in this section</h1>
              <div>
                <h3>Instructions</h3>
                <ol>
                  <li>Fill in the details on the right</li>
                  <li>Click on Run</li>
                  <li>Drag the bar on the right to resize the sections</li>
                </ol>
              </div>
            </div>
          )}
          <div className="container">
            <div className="config">
              <span className="header">PowerBi Report App</span>
              {/* <span>
                <b className="fieldName">Embed Type</b>
                <Dropdown
                  options={embedTypeOptions}
                  onChange={this.onSelect("embedType")}
                  value={embedType}
                />
              </span>
              <span>
                <b className="fieldName">Token Type</b>
                <input
                  name="tokenType"
                  onChange={this.handleChange}
                  value={tokenType}
                  required
                />
              </span> */}
              <div>
                <b className="fieldName">Token</b>
                <input
                  name="accessToken"
                  onChange={this.handleChange}
                  value={accessToken}
                  required
                />
              </div>
              <div>
                <b className="fieldName">Embed Url</b>
                <input
                  name="embedUrl"
                  onChange={this.handleChange}
                  value={embedUrl}
                  required
                />
              </div>
              <div>
                <b className="fieldName">Embed Id</b>
                <input
                  name="embedId"
                  onChange={this.handleChange}
                  value={embedId}
                  required
                />
              </div>
              {/* {reportFlag && (
                <Fragment>
                  <span>
                    <b className="fieldName">Page Name (optional)</b>
                    <input
                      name="pageName"
                      onChange={this.handleChange}
                      value={pageName}
                      required
                    />
                  </span>
                  <span>
                    <b className="fieldName">Permissions</b>
                    <input
                      name="permissions"
                      onChange={this.handleChange}
                      value={permissions}
                      required
                    />
                  </span>
                  <span>
                    <b className="fieldName">Display Nav Pane</b>
                    <span>
                      <input
                        checked={
                          this.state.navContentPaneEnabled === "nav-true"
                        }
                        type="radio"
                        value="nav-true"
                        name="navContentPaneEnabled"
                        onChange={this.handleChange}
                      />
                      True
                    </span>
                    <span>
                      <input
                        checked={
                          this.state.navContentPaneEnabled === "nav-false"
                        }
                        type="radio"
                        value="nav-false"
                        name="navContentPaneEnabled"
                        onChange={this.handleChange}
                      />
                      False
                    </span>
                  </span>
                  <span>
                    <b className="fieldName">Display Filter Pane</b>
                    <span>
                      <input
                        checked={this.state.filterPaneEnabled === "filter-true"}
                        type="radio"
                        value="filter-true"
                        name="filterPaneEnabled"
                        onChange={this.handleChange}
                      />
                      True
                    </span>
                    <span>
                      <input
                        checked={
                          this.state.filterPaneEnabled === "filter-false"
                        }
                        type="radio"
                        value="filter-false"
                        name="filterPaneEnabled"
                        onChange={this.handleChange}
                      />
                      False
                    </span>
                  </span>
                </Fragment>
              )} */}
              {/* <span className="interactions">
                <button
                  className="interactionBtn"
                  disabled={!flag}
                  onClick={() => {
                    if (this.report) {
                      this.report.fullscreen();
                    }
                  }}
                >
                  Fullscreen
                </button>
                <button
                  className="interactionBtn"
                  disabled={!reportFlag || !flag}
                  onClick={() => {
                    if (this.report) {
                      this.report.switchMode("edit");
                    }
                  }}
                >
                  Edit Mode
                </button>
                <button
                  className="interactionBtn"
                  disabled={!reportFlag || !flag}
                  onClick={() => {
                    if (this.report) {
                      this.report.switchMode("view");
                    }
                  }}
                >
                  View Mode
                </button>
                <button
                  className="interactionBtn"
                  disabled={!reportFlag || !flag}
                  onClick={() => {
                    if (this.report) {
                      this.report.setFilters([filter]).catch(errors => {
                        console.log(errors);
                      });
                    }
                  }}
                >
                  Set Filter
                </button>
                <button
                  className="interactionBtn"
                  disabled={!reportFlag || !flag}
                  onClick={() => {
                    if (this.report) {
                      this.report.removeFilters().catch(errors => {
                        console.log(errors);
                      });
                    }
                  }}
                >
                  Remove Filter
                </button>
                <button
                  className="interactionBtn"
                  disabled={!reportFlag || !flag}
                  onClick={() => this.toggleAllVisualHeaders()}
                >
                  Toggle Visual Header
                </button>
                <button
                  className="interactionBtn"
                  disabled={!reportFlag || !flag}
                  onClick={() => {
                    if (this.report) {
                      this.report.print();
                    }
                  }}
                >
                  Print
                </button>
              </span> */}
              <div className="runBtnHolder">
                <button
                  className="runBtn"
                  onClick={() => {
                    if (!flag) {
                      this.setState({
                        flag: true
                      });
                    }
                  }}
                >
                  Run
                </button>
              </div>
            </div>
            {/* <div className="code">
              <CopyToClipboard text={this.getCode(false)}>
                <button className="copyBtn">Copy</button>
              </CopyToClipboard>
              <pre>
                <code className="language-css">{this.getCode()}</code>
              </pre>
            </div> */}
          </div>
        </SplitterLayout>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
