import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Badge, Button } from 'reactstrap';

import * as actions from './review-bmanager-actions';
import * as actionsBManager from '../booking_manager/booking-mamager-actions';
import * as actionsShop from '../restaurants/restaurant-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modals from './modal';


class ReviewBManager extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        reviewManager: {
          id: '',
          userId: '',
          shopId: '',
          passDelete: '',
          disableOk: true,
        },
        idDelete: '',
        showInputPass: 'none',
      }
    }
    componentDidMount() {
      this.props.onFetchReviewBManager();
      this.props.onFetchUserBooking();
      this.props.onFetchRestaurant();
    }
    showModalAdd = () => {
      this.setState({showModal: true})
    }
    closeModal = () => {
      var reviewManager = {...this.state.reviewManager};
      reviewManager.shopId = '';
      reviewManager.userId = '';
      reviewManager.id = '';
      this.setState({
        showModal: false, 
        reviewManager: reviewManager,
        showInputPass: 'none',
      })
    }
    showModalEdit = (dataModal) => {
      const reviewManager = {...this.state.reviewManager};
      reviewManager.id = dataModal.id;
      reviewManager.userId = dataModal.userId;
      reviewManager.shopId = dataModal.shop.id;
      let idDelete = dataModal.id;
      this.setState({
        showModal: true,
        reviewManager: reviewManager,
        idDelete: idDelete
      })
    }
    deleteReviewPermissionHandler = async () => {
      try {
        await this.props.onDeleteReviewManager(this.state.idDelete);
        // show notification after delete success
        toast("Delete success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchReviewBManager();
        this.setState({showInputPass: 'none'})
      } catch (err) {
        console.log(err)
      }
      this.setState({
        showModal: false,
      })
    }
    showTextPasswordDelete = () => {
      this.setState({
        showInputPass: '',
      })
    }
    handleChange = (event) => {
      const item = {...this.state.reviewManager};
      item[event.target.name] = event.target.value;
      this.setState({ reviewManager: item });
    }
    handleAddReviewManager = async () => {
      try {
        await this.props.onAddReviewManager(this.state.reviewManager);
        toast("Add success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchReviewBManager();
      } catch (err) {
        console.log(err)
      }
      var reviewManager = {...this.state.reviewManager};
      reviewManager.shopId = '';
      reviewManager.userId = '';
      reviewManager.id = '';
      
      this.setState({
        showModal: false,
        reviewManager: reviewManager
      })
    }
    handleUpdateReviewManager = async () => {
      try {
        await this.props.onUpdateReviewManager(this.state.reviewManager);
        toast("Update success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchReviewBManager();
      } catch (err) {
        if(err === "exits") {
          toast.error("Review permissions is exits!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        console.log(err)
      }
      var reviewManager = {...this.state.reviewManager};
      reviewManager.shopId = '';
      reviewManager.userId = '';
      reviewManager.id = '';
      
      this.setState({
        showModal: false,
        reviewManager: reviewManager
      })
    }
    
    render() {
        return(
          <div className="animated fadeIn">
            <Modals showModal={this.state.showModal} closeModal={this.closeModal}
              onChangeInput={this.handleChange.bind()}
              reviewManager={this.state.reviewManager}
              userBookings={this.props.userBookings}
              restaurants={this.props.restaurants}
              onSubmitAdd={this.handleAddReviewManager}
              onSubmitEdit={this.handleUpdateReviewManager}
              showInputPass={this.state.showInputPass}
              showTextDelete={this.showTextPasswordDelete}
              deleteReviewPermission={this.deleteReviewPermissionHandler} />
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Review Permissions List
              </div>
              <div className="card-body">
                <Button onClick={this.showModalAdd} color="primary" 
                  style={{marginBottom: '20px'}} >Add review manager</Button>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>User name</th>
                      <th>Restaurant</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.reviewBManager.map(review => {
                      return (
                        <tr key={review.id}>
                          <td>{review.profile.name}</td>
                          <td>{review.shop.name + " - " + review.shop.district + " - " + review.shop.city}</td>
                          <td align="center" className="edit_delete">
                            <span>
                              <i onClick={(e) => this.showModalEdit(review)} className="fa fa-edit fa-lg mt-4 icon_edit_del" ></i>
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
    reviewBManager: state.reviewBManagerState.reviewBManager,
    userBookings: state.bookingMangerState.userBookings,
    restaurants: state.restaurantState.restaurants,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchReviewBManager: () => dispatch(actions.fetchReviewBManager()),
    onFetchUserBooking:() => dispatch(actionsBManager.fetchUserBooking()),
    onFetchRestaurant: () => dispatch(actionsShop.fetchRestaurant()),
    onAddReviewManager: (reviewManager) => dispatch(actions.addReviewManager(reviewManager)),
    onUpdateReviewManager: (updateReview) => dispatch(actions.updateReviewManager(updateReview)),
    onDeleteReviewManager: (idDelete) => dispatch(actions.deleteReviewManager(idDelete)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewBManager);