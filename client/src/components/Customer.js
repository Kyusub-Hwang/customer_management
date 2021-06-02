import { TableCell, TableRow } from '@material-ui/core';
import React from "react";
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image} alt="img" /></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
      </TableRow>
    )
  };
}

export default Customer;