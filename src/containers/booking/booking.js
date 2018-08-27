import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Badge } from 'reactstrap';

import * as actions from './booking-actions';
import ModalEditStatus from './modal-status';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Bookings extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        booking: {
          id: '',
          status: ''
        }
      }
    }
    componentDidMount() {
      this.props.onFetchBooking();
    }
    showModalEditStatus = (dataModal) => {
      const booking = {...this.state.booking};
      booking.id = dataModal.id;
      booking.status = dataModal.state;

      this.setState({
        showModal: true,
        booking: booking
      })
    }
    closeModalEditStatus = () => {
      this.setState({showModal: false})
    }
    handleChange = (event) => {
      const booking = {...this.state.booking};
      booking[event.target.name] = event.target.value;
      this.setState({ booking: booking });
    }
    updateStatusHandler = async () => {
      this.setState({
        showModal: false
      })
      try {
        await this.props.onUpdateStatus(this.state.booking);
        toast("Update success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchBooking();
      } catch (err) {
        console.log(err)
      }
    }
    render() {
        return(
          <div className="animated fadeIn">
            <ModalEditStatus showModal={this.state.showModal}
                closeModal={this.closeModalEditStatus}
                onChangeStatus={this.handleChange}
                onSubmit={this.updateStatusHandler}
                booking={this.state.booking} />
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Booking List
              </div>
              <div className="card-body">
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th className="center">Status</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Nb person</th>
                      <th>Email</th>
                      <th>Restaurants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.bookings.map(booking => {
                      return (
                        <tr key={booking.id}>
                          <td className="coutor" align="center" onClick={(e) => this.showModalEditStatus(booking)} >
                            <Badge className="text-capitalize" color={booking.state === "confirmed" ? "success" : booking.state === "waiting" ? "warning" : "danger"}>{booking.state}</Badge>
                          </td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.date}</td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.time}</td>
                          <td className="center" onClick={(e) => this.showModalEditStatus(booking)} >{booking.numberPerson}</td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.user.email}</td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.shop.name} - {booking.shop.address} - {booking.shop.district}</td>
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
    onFetchBooking: () => dispatch(actions.fetchBooking()),
    onUpdateStatus: (statusUpdate) => dispatch(actions.updateStatus(statusUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);