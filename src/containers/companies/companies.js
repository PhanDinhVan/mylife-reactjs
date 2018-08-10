import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap'

import * as actions from './company-actions';

class Companies extends Component {
  componentDidMount() {
    this.props.onFetchCompany();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-map"></i> Company List
          </div>
          <div className="card-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.companies.map(company => {
                  return (
                    <tr key={company.id}>
                      <td>{company.name}</td>
                      <td>{company.type}</td>
                      <td>{company.description}</td>
                      <td align="center">
                        <Button color="dark" size="xs">Edit</Button>
                        <Button className="ml-1" color="danger" size="xs">Delete</Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.companyState.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCompany: () => dispatch(actions.fetchCompany())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
