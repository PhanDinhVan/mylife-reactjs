import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import * as actions from './booking-actions';

class Bookings extends Component {
    componentDidMount() {
        this.props.onFetchBooking();
    }
    render() {
        return(
          <div className="animated fadeIn">
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Booking List
              </div>
              <div className="card-body">
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>District</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.bookings.map(booking => {
                      return (
                        <tr key={booking.id}>
                          <td>{booking.user.email}</td>
                          <td>{booking.shop.name}</td>
                          <td>{booking.shop.address}</td>
                          <td>{booking.shop.district}</td>
                          <td>{booking.date}</td>
                          <td>{booking.time}</td>
                          <td>{booking.state}</td>
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
    bookings: state.bookingState.bookings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooking: () => dispatch(actions.fetchBooking())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);