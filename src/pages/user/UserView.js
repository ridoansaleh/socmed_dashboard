import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Albums from './AlbumsView';
import Posts from './PostsView';
import DefaultProfile from '../../static/default_profile.png';
import { fetchUser } from '../../redux/reducers/user_reducer';

const styles = {
  root: {
    flexGrow: 1,
    minWidth: 500
  },
  grow: {
    flexGrow: 1,
  },
  profile: {
    marginTop: 30
  },
  photo: {
    marginRight: 10,
    height: 60,
    width: 60
  }
}

class UserView extends Component {
  static propTypes = {
    albums: PropTypes.object,
    fetchUser: PropTypes.func,
    posts: PropTypes.object,
    profile: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
  }

  goHome = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    const { albums, classes, posts, profile } = this.props;

    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              onClick={this.goHome}
            >
              Social Media Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        {
          profile.isSucceed &&
          (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.profile}
            >
              <Avatar
                alt="User photo"
                src={DefaultProfile}
                className={classes.photo}
              />
              <h2>{profile.data && profile.data.name}</h2>
            </Grid>
          )
        }
        {
          albums.isSucceed &&
          <Albums data={albums.data} />
        }
        {
          posts.isSucceed &&
          <Posts data={posts.data} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
  posts: state.posts,
  profile: state.user_profile
})

const mapDispatchToProps = {
  fetchUser
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(UserView))
