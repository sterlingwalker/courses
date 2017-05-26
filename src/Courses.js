// @flow weak

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import { getCourses } from "./fetchData"
import Instructors from "./Instructors"
import ExpandableCourse from "./ExpandableCourse"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"

const styleSheet = createStyleSheet("Courses", theme => ({
  cardDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  card: {
    width: 345,
    backgroundColor: "#fafafa"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.secondary
  },

  classHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  classHeaderSpan: {
    fontWeight: 600
  },

  content: {
    paddingTop: 0
  }
}))

class Courses extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  handleResize = () => {
    if (window.innerWidth <= 790) {
      this.setState({
        mobile: true
      })
    } else {
      this.setState({
        mobile: false
      })
    }
  }

  state = {
    mobile: false
  }

  getCourses = () => {
    const classes = this.props.classes
    let elements = []
    for (let i = 0, total = this.props.courses.length; i < total; i++) {
      if (
        this.props.courses[i].meetings.length >= 2 ||
        this.props.courses[i].instructors.length >= 2
      ) {
        elements.push(
          <ExpandableCourse
            course={this.props.courses[i]}
            key={"expandable" + i}
          />
        )
      } else {
        elements.push(
          <div key={this.props.courses[i].crn + i}>
            <div style={{ marginTop: "1em" }}>
              <Card
                className={classes.card}
                key={this.props.courses[i].crn + i + 1}
              >
                <CardHeader
                  className={classes.classHeader}
                  title={
                    <span
                      tabIndex="0"
                      className={classes.classHeaderSpan}
                      style={{ fontSize: "20px" }}
                    >
                      {this.props.courses[i].courseTitle}
                    </span>
                  }
                  key={this.props.courses[i].crn + i + 2}
                  subheader={
                    <span tabIndex="0" className={classes.classHeaderSpan}>
                      {this.props.courses[i].subjectCode +
                        "-" +
                        this.props.courses[i].subjectNumber +
                        "-" +
                        this.props.courses[i].section}
                    </span>
                  }
                />
                <CardContent
                  className={classes.content}
                  key={this.props.courses[i].crn + i + 3}
                >
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={this.props.courses[i].crn + i + 4}
                  >
                    {"Section: " + this.props.courses[i].section}
                  </Typography>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={this.props.courses[i].crn + i + 5}
                  >
                    {" CRN: " + this.props.courses[i].crn}
                  </Typography>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={this.props.courses[i].crn + i + 6}
                  >
                    {"Credits: " + this.props.courses[i].credit}
                  </Typography>
                  <div
                    style={{ marginTop: "1em" }}
                    key={this.props.courses[i].crn + i + 7}
                  >
                    <Meetings meetings={this.props.courses[i].meetings} />
                  </div>
                  <div
                    style={{ marginTop: "1em" }}
                    key={this.props.courses[i].crn + i + 8}
                  >
                    <Instructors teachers={this.props.courses[i].instructors} />
                  </div>
                </CardContent>
                <CardActions key={this.props.courses[i].crn + i + 9}>
                  <CourseDetails course={this.props.courses[i]} />
                </CardActions>
              </Card>
            </div>
          </div>
        )
      }
    }
    return elements
  }

  render() {
    if (this.props.courses === null) {
      return <div />
    } else if (!this.state.mobile) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "wrap"
          }}
        >
          {this.getCourses()}
        </div>
      )
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {this.getCourses()}
        </div>
      )
    }
  }
}

Courses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Courses)
