import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Badge } from 'reactstrap';

import * as actions from './restaurant-actions';
import Modal from './modal';

class Restaurants extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showModal: false,
        restaurant: {
          name: '',
          address: '',
          phone: '',
          type: '',
          description: ''
        }
    };
  }
  componentDidMount() {
    this.props.onFetchRestaurant();
    this.props.onFetchRestaurantBooking();
  }
  showModalAddRestaurant = () => {
    this.setState({showModal: true})
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  handleChange = (event) => {
    const restaurant = {...this.state.restaurant};
    restaurant[event.target.name] = event.target.value;
    this.setState({ restaurant: restaurant });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Modal show_Modal={this.state.showModal}
          close_Modal={this.closeModal}
          on_Change={this.handleChange} />
        <div className="card">
          <div className="card-header">
            <i className="icon-map"></i> Restaurant List
          </div>
          <div className="card-body">
          <Button onClick={this.showModalAddRestaurant} color="primary" 
              style={{marginBottom: '20px'}} >Add Restaurant</Button>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Ward</th>
                <th>District</th>
                <th>City</th>
                <th>Phone</th>
                <th>Type</th>
                <th className="openTime">Mon-Friday</th>
                <th className="openTime">Weekend</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.restaurants.map(restaurant => {
                  return (
                    <tr key={restaurant.id}>
                      {/* {console.log(restaurant)} */}
                      <td>{restaurant.name}</td>
                      <td>{restaurant.address}</td>
                      <td>{restaurant.ward}</td>
                      <td>{restaurant.district}</td>
                      <td>{restaurant.city}</td>
                      <td>{restaurant.phone}</td>
                      <td align="center" >
                        <Badge className="text-capitalize" color={restaurant.type === "coffee" ? "warning" : restaurant.type === "sushi" ? "success" : "primary"}>{restaurant.type}</Badge>
                      </td>
                      {/* {console.log(restaurant.openTime.mon_friday[0].end)} */}
                      <td>
                        <span>{restaurant.openTime.mon_friday[0] ? restaurant.openTime.mon_friday[0].start : ''} - {restaurant.openTime.mon_friday[0] ? restaurant.openTime.mon_friday[0].end : ''}</span> <br/>
                        <span>{restaurant.openTime.mon_friday[1] ? restaurant.openTime.mon_friday[1].start : ''} - {restaurant.openTime.mon_friday[1] ? restaurant.openTime.mon_friday[1].end : ''}</span>
                      </td>
                      <td>
                        <span>{restaurant.openTime.weekend[0].start} - {restaurant.openTime.weekend[0].end}</span> <br/>
                        <span>{restaurant.openTime.weekend[1].start} - {restaurant.openTime.weekend[1].end}</span>
                      </td>
                      <td>{restaurant.description}</td>
                      <td align="center" className="edit_delete">
                        <span>
                          <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={() => {alert("A A' AA")}} ></i>
                        </span>
                        <span>
                          <i className="fa fa-trash-o fa-lg mt-4 icon_edit_del"></i>
                        </span>
                        {/* <Button color="dark" size="xs">Edit</Button>
                        <Button className="ml-1" color="danger" size="xs">Delete</Button> */}
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
    restaurants: state.restaurantState.restaurants,
    restaurantBooking: state.restaurantState.restaurantBooking
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRestaurant: () => dispatch(actions.fetchRestaurant()),
    onFetchRestaurantBooking: () => dispatch(actions.fetchRestaurantBooking())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
