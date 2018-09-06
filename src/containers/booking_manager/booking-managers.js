import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Badge, Button } from 'reactstrap';

import * as actions from './booking-mamager-actions';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import moment from 'moment';


class BookingManagers extends Component {
    constructor(props) {
      super(props);

      this.state = {
        
      }
    }
    componentDidMount() {
      this.props.onFetchBookingManager();
    }
    
    render() {
        return(
          <div className="animated fadeIn">
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Booking Manager List
              </div>
              <div className="card-body">
                {/* <Button onClick={this.showModalAddBooking} color="primary" 
                  style={{marginBottom: '20px'}} >Add booking</Button> */}
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>User name</th>
                      <th>Restaurant</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.bookingManagers.map(booking => {
                      return (
                        <tr key={booking.id}>
                            <td>{booking.fullname} </td>
                          <td className="coutor" >{booking.nameshop} - {booking.address} - {booking.district}</td>
                          <td align="center" className="edit_delete">
                            <span>
                              <i className="fa fa-edit fa-lg mt-4 icon_edit_del" ></i>
                            </span>
                        </td>
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
    bookingManagers: state.bookingMangerState.bookingManagers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBookingManager: () => dispatch(actions.fetchBookingManger()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingManagers);