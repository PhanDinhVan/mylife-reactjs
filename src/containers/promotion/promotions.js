import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Badge } from 'reactstrap';
import Modal from './modal';

import * as actions from './promotion-actions';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Promotions extends Component {
    constructor(props) {
      super(props);

      this.state = {
        promotion: {
          name: '',
          startDate: moment(),
          endDate: moment(),
          status: '',
          url: '',
          photo: null
        },
        showModal: false,
        loading: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
      this.props.onFetchPromotion();
    }
    showAddPromotion = () => {
      this.setState({
        showModal: true
      })
    }
    closeModal = () => {
      this.setState({
        showModal: false
      })
    }
    handleChange = (event) => {
      const pro = {...this.state.promotion};
      pro[event.target.name] = event.target.value;
      this.setState({ promotion: pro });
    }
    handleChangeImage = (event) => {
      const pro = {...this.state.promotion};
      pro.photo = event.target.files[0];
      this.setState({ promotion: pro});
    }
    handleChangeStartDate = (date) => {
      const pro = {...this.state.promotion};
      pro.startDate = date;
      this.setState({
        promotion: pro
      });
    }
    handleChangeEndDate = (date) => {
      const pro = {...this.state.promotion};
      pro.endDate = date;
      this.setState({
        promotion: pro
      });
    }
    addPromotionHandle = async () => {
      const promo = {...this.state.promotion};
      Object.keys(promo).map(function(key, index) {
        if (promo[key]._d) {
          promo[key] = promo[key]._d.toISOString().slice(0,10);
        }
      });
      try {
        this.setState({loading: true})
        await this.props.onAddPromotion(promo)
        this.setState({loading: false})
        toast("Add promotion success !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.setState({
          showModal: false
        })
        this.props.onFetchPromotion();
      } catch (err) {
        this.setState({loading: false})
        console.log(err)
      }
    }
    render () {
        let modal = null;
        if (this.state.promotion != null) {
          modal = <Modal show_Modal={this.state.showModal} 
                    close_Modal={this.closeModal}
                    on_Change={this.handleChange.bind()}
                    change_Image={this.handleChangeImage.bind()}
                    obj_Pro={this.state.promotion}
                    on_ChangeStartDate={this.handleChangeStartDate.bind()}
                    on_ChangeEndDate={this.handleChangeEndDate.bind()}
                    on_Submit_Add={this.addPromotionHandle}
                    load={this.state.loading} />;
        }
        return (
          <div className="animated fadeIn">
            {modal} {console.log(this.state.promotion)}
            <div className="card">
              <div className="card-header">
                <i className="icon-people"></i> Promotion List
              </div>
              <div className="card-body">
                <Button onClick={this.showAddPromotion} color="primary" style={{marginBottom: '20px'}} >Add promotion</Button>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      {/* <th>Created by user</th> */}
                      <th>Start date</th>
                      <th>End date</th>
                      <th className="center">Status</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.promotions.map(promotion => {
                      return (
                        <tr key={promotion.id}>
                          <td>{promotion.id}</td>
                          <td>{promotion.name}</td>
                          {/* <td>{promotion.user}</td> */}
                          <td>{promotion.startDate ? promotion.startDate : ''}</td>
                          <td>{promotion.endDate ? promotion.endDate : ''}</td>
                          <td align="center" >
                            <Badge className="text-capitalize" color={promotion.status === "not_start" ? "warning" : promotion.status === "in_progress" ? "success" : promotion.status === "completed" ? "secondary" : "danger"}>{promotion.status}</Badge>
                          </td>
                          {/* <td align="center">
                            <Button color="dark" size="xs">Edit</Button>
                            <Button className="ml-1" color="danger" size="xs">Delete</Button>
                          </td> */}
                          <td align="center" className="edit_delete">
                            <span>
                              <i className="fa fa-edit fa-lg mt-4 icon_edit_del" ></i>
                            </span>
                            <span>
                              <i className="fa fa-trash-o fa-lg mt-4 icon_edit_del"></i>
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
    promotions: state.promotionState.promotions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPromotion: () => dispatch(actions.fetchPromotion()),
    onAddPromotion: (promotionAdd) => dispatch(actions.addPromotion(promotionAdd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);