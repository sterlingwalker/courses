import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import amber from '@material-ui/core/colors/amber'
import { withStyles } from '@material-ui/core/styles'
import { is_off_campus } from '../utils/offCampus'

const styles = theme => ({
  classHeader: {
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center'
  },

  classHeaderWaitList: {
    backgroundColor: amber[200],
    textAlign: 'center'
  },

  classHeaderOffCampus: {
    backgroundColor: "#D79873",
    textAlign: 'center'
  },

  classHeaderSpanDiv: {
    display: 'flex',
    flexDirection: 'column'
  },

  classHeaderSpanWaitList: {
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.75)'
  },

  subHeaderDiv: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center'
  },

  subHeaderDivMobile: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center'
  },

  courseTitle: {
    fontWeight: "bolder",
    fontSize: "16px !important"
  },

  courseInfo: {
    fontWeight: '500',
    color: '#000'
  }
})

class CourseHeader extends React.Component {

  getHeader() {
    const { classes, course, t } = this.props
    if (!Object.is(course.waitList, '0')) {
      return (
        <CardHeader
          className={classes.classHeaderWaitList}
          title={
            <Typography tabIndex="0" className={classes.courseTitle}>
              {course.courseTitle}
            </Typography>
          }
          key={course.crn + 0 + 3}
          subheader={
            <div className={classes.classHeaderSpanDiv}>
              <span tabIndex="0" className={classes.courseInfo}>
                {course.subjectCode +
                  '-' +
                  course.subjectNumber +
                  '-' +
                  course.section +
                  '-' +
                  course.crn}
              </span>
              <div className={classes.subHeaderDiv}>
                <span tabIndex="0" className={classes.courseInfo}>
                  {t('credits', {}) + ': ' + course.credit}
                </span>
                <span tabIndex="0" className={classes.courseInfo}>
                  {t('waitlist', {}) + ': ' + course.waitList}
                </span>
              </div>
            </div>
          }
        />
      )
    } else if (course.meetings[0] && is_off_campus(course.meetings[0].campus)) {
      return (
        <CardHeader
          className={classes.classHeaderOffCampus}
          title={
            <Typography
              variant="subtitle1"
              tabIndex="0"
              className={classes.courseTitle}
            >
              {course.courseTitle}
            </Typography>
          }
          subheader={
            <div className={classes.classHeaderSpanDiv}>
              <span tabIndex="0" className={classes.courseInfo}>
                {course.subjectCode +
                  '-' +
                  course.subjectNumber +
                  '-' +
                  course.section +
                  '-' +
                  course.crn}
              </span>
              <span tabIndex="0" className={classes.courseInfo}>
                {t('credits', {}) + ': ' + course.credit}
              </span>
            </div>
          }
        />
      )
    } else {
      return (
        <CardHeader
          className={classes.classHeader}
          title={
            <Typography
              variant="subtitle1"
              tabIndex="0"
              className={classes.courseTitle}
            >
              {course.courseTitle}
            </Typography>
          }
          subheader={
            <div className={classes.classHeaderSpanDiv}>
              <span tabIndex="0" className={classes.courseInfo}>
                {course.subjectCode +
                  '-' +
                  course.subjectNumber +
                  '-' +
                  course.section +
                  '-' +
                  course.crn}
              </span>
              <span tabIndex="0" className={classes.courseInfo}>
                {t('credits', {}) + ': ' + course.credit}
              </span>
            </div>
          }
        />
      )
    }
  } 
  render() {
    return <div>{this.getHeader()}</div>
  }
}

CourseHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'CourseHeader' })(
  translate('view', { wait: true })(CourseHeader)
)
