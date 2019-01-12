import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchComments } from '../../redux/reducers/comments_reducer';

const styles = theme => ({
  posts: {
    marginTop: 30,
    width: '100%'
  },
  item: {
    width: 800,
    [theme.breakpoints.down('sm')]: {
      width: 300
    }
  },
  email: {
    marginRight: 15
  }
})

class PostsView extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array
  }

  state = {
    showComments: false,
    postNumber: null,
    commentList: null,
    isCommentsFetchingSucceed: false,
    isCommentsFetchingFailed: false,
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.comments.isSucceed !== this.state.isCommentsFetchingSucceed) {
      this.setState({
        isCommentsFetchingSucceed: true,
        isCommentsFetchingFailed: false,
        commentList: nextProps.comments.data,
        showComments: true,
        postNumber: nextProps.comments.data[0].postId
      })
    }

    if (nextProps.comments.isFailed !== this.state.isCommentsFetchingFailed) {
      this.setState({
        isCommentsFetchingSucceed: false,
        isCommentsFetchingFailed: true,
        commentList: null,
        showComments: false,
        postNumber: null
      })
    }
    return true
  }

  handleViewComments = (id) => {
    if (this.state.postNumber) {
      if (id !== this.state.postNumber) {
        this.setState({
          isCommentsFetchingFailed: false,
          isCommentsFetchingSucceed: false
        }, () => {
          this.props.fetchComments(id)
        })
      } else {
        this.setState({
          showComments: !this.state.showComments
        })
      }
    } else {
      this.props.fetchComments(id)
    }
  }

  render() {
    const { classes, data } = this.props
    const { commentList } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.posts}
      >
        <List>
          {
            !data &&
            <Typography component="p">There is no posts yet</Typography>
          }
          {
            data &&
            data.map(post => (
              <div key={post.id} className={classes.item} >
                <ListItem>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={post.title} secondary={post.body} />
                </ListItem>
                <ExpansionPanel
                  onChange={() => this.handleViewComments(post.id)}
                  expanded={
                    (post.id === this.state.postNumber && this.state.showComments) ? true : false
                  }
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>
                      {(post.id === this.state.postNumber && this.state.showComments) ? 'Hide comments' : 'View comments'}
                    </Typography>
                  </ExpansionPanelSummary>
                  {
                    !commentList &&
                    <ExpansionPanelDetails>
                      <Typography>There is no comments yet</Typography>
                    </ExpansionPanelDetails>
                  }
                  {
                    commentList &&
                    commentList.map(comment => (
                      <ExpansionPanelDetails key={comment.id}>
                        <div>
                          <b className={classes.email}>{comment.email.split('@')[0]}</b>
                          <br />
                          <Typography>
                            {comment.body}
                          </Typography>
                        </div>
                      </ExpansionPanelDetails>)
                    )
                  }
                </ExpansionPanel>
              </div>
            ))
          }
        </List>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments
})

const mapDispatchToProps = {
  fetchComments
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PostsView))
