import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DefaultProfile from '../../static/default_profile.png';
import { fetchUsers } from '../../redux/reducers/users_reducer';

const styles = {
  root: {
    flexGrow: 1,
    minWidth: 500
  },
  grow: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    maxWidth: 600,
    marginTop: 30
  }
}

class HomeView extends Component {
  static propTypes = {
    classes: PropTypes.object,
    fetchUsers: PropTypes.func
  }

  state = {
    isDataFetched: false,
    isFetchingSucceed: false,
    isFetchingFailed: false,
    isDataEmpty: true,
    users: null
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.users.isSucceed !== this.state.isFetchingSucceed) {
      this.setState({
        isDataFetched: true,
        isFetchingSucceed: true,
        isFetchingFailed: false,
        isDataEmpty: false,
        users: nextProps.users.data,
      })
    } else if (nextProps.users.isFailed !== this.state.isFetchingFailed) {
      this.setState({
        isDataFetched: true,
        isFetchingSucceed: false,
        isFetchingFailed: true,
        isDataEmpty: true,
        users: null
      })
    }
    return true
  }

  render() {
    const { classes } = this.props;
    const { isDataFetched, users } = this.state

    if (!isDataFetched) {
      return null
    }
    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Social Media Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <List dense className={classes.content}>
            {users.map(value => (
              <ListItem key={value.id} button>
                <ListItemAvatar>
                  <Avatar
                    alt={`Image of ${value.name}`}
                    src={DefaultProfile}
                  />
                </ListItemAvatar>
                <ListItemText primary={value.name} />
                <ListItemSecondaryAction>
                  <ListItemText primary={`${value.address.street}, ${value.address.city}`} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = {
  fetchUsers
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(HomeView))
