import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DefaultAlbum from '../../static/default_album.jpg';

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

class AlbumsView extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array
  }

  state = {
    albums: this.props.data ? this.props.data.slice(0, 4) : null,
    showAll: false
  }

  showAllAlbums = () => {
    if (!this.state.showAll) {
      this.setState({
        albums: this.props.data,
        showAll: true
      })
    } else {
      window.scrollTo(0, 0);
      this.setState({
        albums: this.props.data.slice(0, 4),
        showAll: false
      })
    }
  }

  render() {
    const { classes, data } = this.props
    const { albums, showAll } = this.state

    return (
      <Fragment>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.albums}
        >
          {
            !albums &&
            <Typography component="p">There is no albums yet</Typography>
          }
          {
            albums &&
            albums.map((album, i) => (
              <Card className={classes.card} key={album.id}>
                <CardMedia
                  className={classes.media}
                  image={DefaultAlbum}
                  title={`Album ${i + 1}`}
                />
                <CardContent>
                  <Typography component="p">
                    <Link to={`/album/${album.id}`}>{album.title}</Link>
                  </Typography>
                </CardContent>
              </Card>)
            )
          }
        </Grid>
        {
          data.length > 4 &&
          (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.btn}
            >
              <Button
                variant="outlined"
                onClick={this.showAllAlbums}
              >
                { !showAll ? 'Show all albums' : 'Show less album' }
              </Button>
            </Grid>
          )
        }
      </Fragment>
    )
  }
}

export default withStyles(styles)(AlbumsView)
