import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Badge, Button } from 'reactstrap';

import * as actions from './booking-actions';
import ModalEditStatus from './modal-status';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import ModalAddBooking from './modal-add-booking';
import * as actionsRestaurant from '../restaurants/restaurant-actions';
import ModalDelete from './modal-delete';

class Bookings extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        booking: {
          id: '',
          status: '',
          time: moment(),
          numberPerson: '',
          date: '',
          restaurants: ''
        },
        showModalAdd: false,
        bookingAdd: {
          shopId: '',
          status: 'waiting',
          time: moment(),
          numberPerson: 1,
          date: moment()
        },
        idBookingDelete: '',
        showModalDelete: false,
      }
    }
    componentDidMount() {
      this.props.onFetchBooking();
    }
    showModalEditStatus = (dataModal) => {
      const booking = {...this.state.booking};
      booking.id = dataModal.id;
      booking.status = dataModal.state;
      booking.time = dataModal.time.slice(0,5);
      booking.numberPerson = dataModal.numberPerson;
      booking.date = dataModal.date;
      booking.restaurants = dataModal.shop.name +" - "+ dataModal.shop.address +" - "+ dataModal.shop.district;
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
    handleChangeTime = (event) => {
      const booking = {...this.state.booking};
      booking.time = moment(event._d).format('HH:mm');
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
    showModalAddBooking = () => {
      this.props.onFetchRestaurant();
      this.setState({
        showModalAdd: true,
      });
    }
    closeModalAddBooking = () => {
      this.setState({showModalAdd: false})
    }
    handleChangeDate = (date) => {
      const booking_add = {...this.state.bookingAdd};
      booking_add.date = date;
      this.setState({
        bookingAdd: booking_add
      });
    }
    handleChangeTimeAdd = (event) => {
      const bookingAdd = {...this.state.bookingAdd};
      bookingAdd.time = moment(event._d).format('HH:mm');
      this.setState({ bookingAdd: bookingAdd });
    }
    handleChangeAdd = (event) => {
      const bookingAdd = {...this.state.bookingAdd};
      bookingAdd[event.target.name] = event.target.value;
      this.setState({ bookingAdd: bookingAdd });
    }
    handleAddBooking = async () => {
      this.setState({showModalAdd: false});
      const booking = {...this.state.bookingAdd}
      Object.keys(booking).map(function(key, index) {
        if (booking[key]._d) {
          booking[key] = booking[key]._d.toISOString().slice(0,10);
        }
      });
      try {
        await this.props.onAddBookings(booking);
        toast("Add success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchBooking();
      } catch (err) {
        console.log(err)
      }
    }
    showModalDeleteBooking = (bookingDelete) => {
      console.log(bookingDelete.id)
      this.setState({
        idBookingDelete: bookingDelete.id,
        showModalDelete: true
      })
    }
    closeModalDeleteBooking = () => {
      this.setState({showModalDelete: false})
    }
    deleteNewsHandle = async () => {
      this.setState({
        showModalDelete: false
      })
      try {
        await this.props.onDeleteBooking(this.state.idBookingDelete);
        toast("Delete success !", {
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
                booking={this.state.booking}
                onChangeTime={this.handleChangeTime} />
            <ModalAddBooking showModalAdd={this.state.showModalAdd}
              closeModalAdd={this.closeModalAddBooking}
              listRestaurant={this.props.restaurants}
              bookingAdd={this.state.bookingAdd}
              onChangeDate={this.handleChangeDate}
              onChangeTime={this.handleChangeTimeAdd}
              onChangeInput={this.handleChangeAdd}
              onChangeStatus={this.handleChangeAdd}
              submitAdd={this.handleAddBooking} />
            <ModalDelete showModalDelete={this.state.showModalDelete}
              closeModalDelete={this.closeModalDeleteBooking}
              deleteSubmit={this.deleteNewsHandle} />
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Booking List
              </div>
              <div className="card-body">
                <Button onClick={this.showModalAddBooking} color="primary" 
                  style={{marginBottom: '20px'}} >Add booking</Button>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th className="center">Status</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Nb person</th>
                      <th>Email</th>
                      <th>Restaurants</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.bookings.map(booking => {
                      return (
                        <tr key={booking.id}>
                          <td className="coutor" align="center" onClick={(e) => this.showModalEditStatus(booking)} >
                            <Badge className="text-capitalize" color={booking.state === "confirmed" ? "success" : booking.state === "waiting" ? "warning" : booking.state === "suggest" ? "primary" : "danger"}>{booking.state}</Badge>
                          </td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.date}</td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.time.slice(0,5)}</td>
                          <td className="center" onClick={(e) => this.showModalEditStatus(booking)} >{booking.numberPerson}</td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.user.email}</td>
                          <td className="coutor" onClick={(e) => this.showModalEditStatus(booking)} >{booking.shop.name} - {booking.shop.address} - {booking.shop.district}</td>
                          <td align="center" className="edit_delete">
                            <span>
                              <i className="fa fa-trash-o fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalDeleteBooking(booking)} ></i>
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
    bookings: state.bookingState.bookings,
    restaurants: state.restaurantState.restaurants,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooking: () => dispatch(actions.fetchBooking()),
    onUpdateStatus: (statusUpdate) => dispatch(actions.updateStatus(statusUpdate)),
    onFetchRestaurant: () => dispatch(actionsRestaurant.fetchRestaurant()),
    onAddBookings: (bookingAdd) => dispatch(actions.addBooking(bookingAdd)),
    onDeleteBooking: (bookingDelete) => dispatch(actions.deleteBooking(bookingDelete)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);