import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import Modal from './modal';

import * as actions from './promotion-actions';

class Promotions extends Component {
    constructor(props) {
      super(props);

      this.state = {
        promotion: {
          name: '',
          user: '',
          startDate: '',
          endDate: '',
          status: ''
        },
        showModal: false
      }
    }
    componentDidMount() {
      this.props.onFetchPromotion();
    }
    addPromotion = () => {
      this.setState({
        showModal: true
      })
    }
    closeModal = () => {
      this.setState({
        showModal: false
      })
    }
    render () {
        let modal = null;
        if (this.state.promotion != null) {
          modal = <Modal show_Modal={this.state.showModal} 
                    close_Modal={this.closeModal} />;
        }
        return (
          <div className="animated fadeIn">
            {modal}
            <div className="card">
              <div className="card-header">
                <i className="icon-people"></i> Promotion List
              </div>
              <div className="card-body">
                <Button onClick={this.addPromotion} color="success" style={{marginBottom: '20px'}} >Add promotion</Button>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>User</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.promotions.map(promotion => {
                      return (
                        <tr key={promotion.id}>
                          <td>{promotion.id}</td>
                          <td>{promotion.name}</td>
                          <td>{promotion.user}</td>
                          <td>{promotion.startDate ? promotion.startDate : ''}</td>
                          <td>{promotion.endDate ? promotion.endDate : ''}</td>
                          <td>{promotion.status}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    promotions: state.promotionState.promotions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPromotion: () => dispatch(actions.fetchPromotion())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);