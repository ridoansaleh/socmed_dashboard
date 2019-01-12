import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { fetchPhotos } from '../../redux/reducers/photos_reducer';

const styles = {
  albums: {
    marginTop: 30
  },
  btn: {
    marginTop: 10
  },
  card: {
    height: 300,
    width: 260,
    padding: 10,
    marginBottom: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}

class AlbumView extends Component {
  static propTypes = {
    fetchPhotos: PropTypes.func,
    photos: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.fetchPhotos(this.props.match.params.id)
  }

  goHome = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    const { classes, photos } = this.props;

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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.albums}
        >
          {
            !photos &&
            <Typography component="p">There is no albums yet</Typography>
          }
          {
            photos.isSucceed &&
            (photos.data.map((photo, i) => (
              <Card className={classes.card} key={photo.id}>
                <CardMedia
                  className={classes.media}
                  image={photo.thumbnailUrl}
                  title={`Album ${i + 1}`}
                />
                <CardContent>
                  <Typography component="p">
                    {photo.title}
                  </Typography>
                </CardContent>
              </Card>)
            ))
          }
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  photos: state.photos
})

const mapDispatchToProps = {
  fetchPhotos
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(AlbumView))
