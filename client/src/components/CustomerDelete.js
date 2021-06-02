import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, Typography } from '@material-ui/core';

class CustomerDelete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  deleteCustomer(id) {
    const url = '/api/customers/' + id;
    return fetch(url, {
      method: 'DELETE'
    });

  }

  // (e) => { e.preventDefault(); this.deleteCustomer(this.props.id).then(this.props.stateRefresh()) }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>Delete</Button>
        <Dialog open={this.state.open}>
          <DialogTitle onClose={this.handleClose}>
            Warning!
        </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Delete Customer Information
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={(e) => { e.preventDefault(); this.deleteCustomer(this.props.id).then(this.props.stateRefresh()) }}>Delete</Button>
            <Button varaint="outlined" color="secondary" onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CustomerDelete;