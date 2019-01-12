import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DefaultAlbum from '../../static/default_album.jpg';

const styles = {
  albums: {
    marginTop: 30
  },
  card: {
    height: 300,
    width: 260,
    padding: 10
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

  render() {
    const { classes, data } = this.props
    const albums = data ? data.slice(0, 4) : []

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.albums}
      >
        {
          !data &&
          <Typography component="p">There is no albums yet</Typography>
        }
        {
          data &&
          albums.map((album, i) => (
            <Card className={classes.card} key={album.id}>
              <CardMedia
                className={classes.media}
                image={DefaultAlbum}
                title={`Album ${i+1}`}
              />
              <CardContent>
                <Typography component="p">
                  {album.title}
                </Typography>
              </CardContent>
            </Card>)
          )
        }
      </Grid>
    )
  }
}

export default withStyles(styles)(AlbumsView)
