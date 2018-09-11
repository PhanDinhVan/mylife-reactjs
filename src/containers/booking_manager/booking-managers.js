import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';

import * as actions from './booking-mamager-actions';
import ModalAdd from './modal';
import * as actionRestaurant from '../restaurants/restaurant-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class BookingManagers extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        userBooking: {
          id: '',
          userId: '',
          restaurants: [],
        },
        multiSelect: [],
      }
    }
    componentDidMount() {
      this.props.onFetchBookingManager();
      this.props.onFetchUserBooking();
      this.props.onFetchRestaurant();

      var listRestaurant = new Array();
      
      let restaurants = this.props.restaurants;
      restaurants.forEach(function(element) {
        var temp = new Object();
        temp.id = element.id;
        temp.label = element.name + " - " + element.address + " - " + element.district;
        temp.value = false;

        listRestaurant.push(temp)
      });

      this.setState({multiSelect: listRestaurant})
    }
    showModalAdd = () => {
      this.setState({showModal: true})
    }
    closeModal = () => {
      var listMultiSelect = this.state.multiSelect;
      listMultiSelect.forEach(function(element) {
        element.value = false;
      });
      var userbooking = this.state.userBooking;
      userbooking.restaurants = [];
      userbooking.userId = '';
      this.setState({
        showModal: false,
        multiSelect: listMultiSelect,
        userBooking: userbooking
      })
    }
    handleChange = (event) => {
      const userBooking = {...this.state.userBooking};
      userBooking[event.target.name] = event.target.value;
      this.setState({ userBooking: userBooking });
    }
    optionClicked(optionsList) {
      this.setState({ multiSelect: optionsList });
    }
    selectedBadgeClicked(optionsList) {
      this.setState({ multiSelect: optionsList });
    }
    handleAddBookingManager = async () => {
      var listIdRestaurant = new Array();
      let listMultiSelect = this.state.multiSelect;
      listMultiSelect.forEach(function(element) {
        if (element.value) {
          listIdRestaurant.push(element.id)
        }
      });

      const userBooking = {...this.state.userBooking};
      userBooking.restaurants = listIdRestaurant;
      
      try {
        await this.props.onAddBookingManager(userBooking);
        toast("Add success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchBookingManager();
      } catch (err) {
        console.log(err)
      }
      
      // xet lai gia tri false cho multiselect
      var multiSelect = this.state.multiSelect;
      multiSelect.forEach(function(element) {
        if (element.value) {
          element.value = false;
        }
      });

      this.setState({
        showModal: false,
        multiSelect: multiSelect
      })
    }

    showModalEdit = (dataModal) => {
      const userbooking = {...this.state.userBooking};
      userbooking.id = dataModal.id;
      userbooking.userId = dataModal.userId;
      userbooking.restaurants.push(dataModal.shopId);

      var listMultiSelect = this.state.multiSelect;
      listMultiSelect.forEach(function(element) {
        if (element.id === dataModal.shopId) {
          element.value = true;
        }
      });

      this.setState({
        showModal: true,
        userBooking: userbooking,
        multiSelect: listMultiSelect
      })
    }
    handleUpdateBookingManager = async () => {
      var listIdRestaurant = new Array();
      let listMultiSelect = this.state.multiSelect;
      listMultiSelect.forEach(function(element) {
        if (element.value) {
          listIdRestaurant.push(element.id)
        }
      });

      const userBooking = {...this.state.userBooking};
      userBooking.restaurants = listIdRestaurant;

      this.setState({
        showModal: false
      })
      console.log(userBooking)
      // try {
      //   await this.props.onUpdateBookingManager(userBooking);
      //   toast("Update success !", {
      //     position: toast.POSITION.TOP_RIGHT
      //   });
      //   this.props.onFetchBookingManager();
      // } catch (err) {
      //   console.log(err)
      // }
    }
    
    render() {
      const selectedOptionsStyles = {
        color: "#3c763d",
        backgroundColor: "#dff0d8"
      };
      const optionsListStyles = {
          backgroundColor: "#dff0d8",
          color: "#3c763d"
      };
        return(
          <div className="animated fadeIn">
            <ModalAdd showModal={this.state.showModal} closeModal={this.closeModal}
              userBookings={this.props.userBookings} onChangeInput={this.handleChange}
              multiSelect={this.state.multiSelect} optionClick={this.optionClicked.bind(this)}
              selectedBadgeClick={this.selectedBadgeClicked.bind(this)}
              selectedOptionsStyle={selectedOptionsStyles} 
              optionsListStyle={optionsListStyles}
              onSubmitAdd={this.handleAddBookingManager}
              onSubmitEdit={this.handleUpdateBookingManager}
              objUserBooking={this.state.userBooking} />
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Booking Manager List
              </div>
              <div className="card-body">
                <Button color="primary" onClick={this.showModalAdd}
                  style={{marginBottom: '20px'}} >Add booking manager</Button>
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
                            <td>{booking.profile.name} </td>
                          <td className="coutor" >{booking.shop_user.map(shopuser => {
                            return ( 
                              <div key={shopuser.id} className="listBookingManager" >{shopuser.shop ? shopuser.shop.name + " - " + shopuser.shop.district + " - " + shopuser.shop.city : ""}</div>
                              )
                          })}</td>
                          <td align="center" className="edit_delete">
                            <span>
                              <i onClick={(e) => this.showModalEdit(booking)} className="fa fa-edit fa-lg mt-4 icon_edit_del" ></i>
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
    userBookings: state.bookingMangerState.userBookings,
    restaurants: state.restaurantState.restaurants,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBookingManager: () => dispatch(actions.fetchBookingManger()),
    onFetchUserBooking:() => dispatch(actions.fetchUserBooking()),
    onFetchRestaurant: () => dispatch(actionRestaurant.fetchRestaurant()),
    onAddBookingManager: (userBooking) => dispatch(actions.addBookingManager(userBooking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingManagers);