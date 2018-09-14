import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Badge, Button } from 'reactstrap';

import * as actions from './review-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modals from './modal';


class Reviews extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        review: {
          id: '',
          name: '',
          email: '',
          phone: '',
          score: '',
          comment: '',
          restaurant: '',
          review_date: '',
          passDelete: '',
          disableOk: true,
        },
        idDelete: '',
        showInputPass: 'none',
      }
    }
    componentDidMount() {
      this.props.onFetchReviews();
    }
    closeModal = () => {
      this.setState({
        showModal: false, 
        showInputPass: 'none',
        review: {
          id: '',
          name: '',
          email: '',
          phone: '',
          score: '',
          comment: '',
          restaurant: '',
          review_date: '',
          passDelete: '',
          disableOk: true,
        },
      })
    }
    showModalReview = (dataModal) => {
      const review = {...this.state.review};
      review.id = dataModal.id;
      review.name = dataModal.profile.name;
      review.email = dataModal.user.email;
      review.phone = dataModal.profile.phone;
      review.score = dataModal.score;
      review.comment = dataModal.comments;
      review.restaurant = dataModal.shop.name;
      review.review_date = dataModal.review_date;
      let idDelete = dataModal.id;
      this.setState({
        showModal: true,
        review: review,
        idDelete: idDelete
      })
    }
    deleteReviewHandler = async () => {
      try {
        await this.props.onDeleteReview(this.state.idDelete);
        // show notification after delete success
        toast("Delete success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.onFetchReviews();
        this.setState({showInputPass: 'none'})
      } catch (err) {
        console.log(err)
      }
      this.setState({
        showModal: false,
        review: {
          id: '',
          name: '',
          email: '',
          phone: '',
          score: '',
          comment: '',
          restaurant: '',
          review_date: '',
          passDelete: '',
          disableOk: true,
        },
      })
    }
    showTextPasswordDelete = () => {
      this.setState({
        showInputPass: '',
      })
    }
    handleChange = (event) => {
      const review = {...this.state.review};
      review[event.target.name] = event.target.value;
      this.setState({ review: review });
    }
    
    render() {
        return(
          <div className="animated fadeIn">
            <Modals showModal={this.state.showModal} closeModal={this.closeModal}
              review={this.state.review} 
              showInputPass={this.state.showInputPass}
              showTextDelete={this.showTextPasswordDelete}
              onChangeInput={this.handleChange.bind()}
              deleteReview={this.deleteReviewHandler} />
            <div className="card">
              <div className="card-header">
                <i className="icon-map"></i> Reviews List
              </div>
              <div className="card-body">
                {/* <Button onClick={this.showModalAdd} color="primary" 
                  style={{marginBottom: '20px'}} >Add review</Button> */}
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Score</th>
                      <th>Comment</th>
                      <th>Restaurant</th>
                      <th>Review date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.reviews.map(review => {
                      return (
                        <tr key={review.id}>
                          <td onClick={(e) => this.showModalReview(review)}>{review.profile.name}</td>
                          <td onClick={(e) => this.showModalReview(review)}>{review.user.email}</td>
                          <td onClick={(e) => this.showModalReview(review)}>{review.profile.phone}</td>
                          <td onClick={(e) => this.showModalReview(review)}>{review.score}</td>
                          <td onClick={(e) => this.showModalReview(review)}>{review.comments}</td>
                          <td onClick={(e) => this.showModalReview(review)}>{review.shop.name}</td>
                          <td onClick={(e) => this.showModalReview(review)}>{review.review_date.slice(0,10)}</td>
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
    reviews: state.reviewState.reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchReviews: () => dispatch(actions.fetchReviews()),
    onDeleteReview: (idDelete) => dispatch(actions.deleteReview(idDelete)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);