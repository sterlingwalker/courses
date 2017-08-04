// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Paper from "material-ui/Paper"
import Tabs, { Tab } from "material-ui/Tabs"
import { translate } from "react-i18next"
import Advising from "./Advising"
import Calendar from "reactjs-calendar"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Assignment from "material-ui-icons/Assignment"
import Event from "material-ui-icons/Event"
import TermsDialog from "./TermsDialog"

const TabContainer = props =>
  <div style={{ padding: 20 }}>
    {props.children}
  </div>

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styleSheet = createStyleSheet("BasicTabs", theme => ({
  root: {
    minHeight: 0
  },

  inner: {
    marginTop: 30,
    width: "100%"
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500])
  },

  flex: {
    flex: 1
  },

  button: {
    color: "#FFFFFF"
  }
}))

class AdvisingTabs extends Component {
  state = {
    index: 0
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {
    const classes = this.props.classes
    const { t } = this.props
    return (
      <Paper className={classes.inner}>
        <AppBar position="static">
          <Toolbar disableGutters={true} className={classes.root}>
            {Object.is(this.props.mobile, true) &&
              <Tabs
                className={classes.flex}
                index={this.state.index}
                onChange={this.handleChange}
              >
                <Tab
                  aria-label={t("courses", {})}
                  icon={
                    <Assignment
                      className={classes.button}
                      alt="View your courses for the selected term"
                    />
                  }
                  tabIndex="0"
                />
                <Tab
                  aria-label={t("calendar", {})}
                  icon={<Event className={classes.button} />}
                  alt="View your calendar events"
                  tabIndex="0"
                />
              </Tabs>}
            {Object.is(this.props.mobile, false) &&
              <Tabs
                className={classes.flex}
                index={this.state.index}
                onChange={this.handleChange}
              >
                <Tab label={t("courses", {})} tabIndex="0" />
                <Tab label={t("calendar", {})} tabIndex="0" />
              </Tabs>}
            <TermsDialog
              terms={this.props.terms}
              currentTermDescription={this.props.currentTermDescription}
              currentTermCode={this.props.currentTermCode}
              updateTerm={this.props.updateTerm}
              mobile={this.props.mobile}
            />
          </Toolbar>
        </AppBar>
        {Object.is(this.state.index, 0) &&
          <TabContainer>
            <div>
              {!Object.is(this.props.courses, null) &&
                <Advising
                  tabIndex="0"
                  currentTermCode={this.props.currentTermCode}
                  courses={this.props.courses}
                  mobile={this.props.mobile}
                  gradesURL={this.props.gradesURL}
                />}
            </div>
          </TabContainer>}
        {Object.is(this.state.index, 1) &&
          <TabContainer>
            <Calendar
              eventsURLObj={this.props.calendarURL}
              termBounds={this.props.termBounds}
              rootID={this.props.rootElement}
              translateURL="/translations/api-v1/locales/calendar/{{lng}}/{{ns}}.json"
            />
          </TabContainer>}
      </Paper>
    )
  }
}

AdvisingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(AdvisingTabs)
)