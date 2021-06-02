import React from 'react';
import { post } from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  hidden: {
    display: 'none'
  }
})


class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
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
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    })
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    })
  }

  handleValueChange = (e) => {
    //nextState 이용을 통해 valueChange함수를 하나로 통합.
    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((res) => {
      this.props.stateRefresh();
    })
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    })
    // window.location.reload();

  }

  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('gender', this.state.gender);
    formData.append('birthday', this.state.birthday);
    formData.append('job', this.state.job);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Add Customer</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
                {this.state.fileName === "" ? "Select Profile Img" : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField label="Name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
            <TextField label="Birth" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
            <TextField label="Gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
            <TextField label="Job" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit} >Add</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose} >Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(CustomerAdd);