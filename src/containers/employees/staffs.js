import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Table, Button } from 'reactstrap';

import * as actions from './staff-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Modal from './modal-edit';
import * as actionRoles from '../roles/role-actions';


class Staffs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      // showModalDelete: false,
      staff: {
        id: '',
        profileId: '',
        roleId: '',
        name: '',
        status: '',
        gender: null,
        email: '',
        birthday: moment(),
        nationality: '',
        phone: '',
        passDelete: '',
        disableOk: true,
      },
      idStaffDelete: '',
      loading: false,
      showInputPass: 'none',
    };
  }
  componentDidMount() {
    this.props.onFetchStaff();
    this.props.onFetchRole();
  }

  showModalAddStaff = () => {
    const staff = {...this.props.staff};
    staff.id = '';
    staff.birthday = moment();
    this.setState({
      showModal: true,
      staff: staff
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  }
  showModalEditStaff = (dataModal) => {
    const staff_temp = { ...this.state.user};
    staff_temp.id = dataModal.id;
    staff_temp.profileId = dataModal.profile.id;
    staff_temp.roleId = dataModal.role.id;
    staff_temp.status = dataModal.status;
    staff_temp.gender = dataModal.profile.gender;
    staff_temp.name = dataModal.profile.name;
    staff_temp.email = dataModal.email;
    staff_temp.phone = dataModal.profile.phone;
    staff_temp.nationality = dataModal.profile.nationality;
    staff_temp.birthday = moment(dataModal.profile.birthday);
    let idDelete = dataModal.id;
    this.setState({
      showModal: true,
      staff: staff_temp,
      idStaffDelete: idDelete,
    });
  }
  handleChangeBirthday = (date) => {
    const staff = {...this.state.staff};
    staff.birthday = date;
    this.setState({
      staff: staff
    });
  }
  handleChange = (event) => {
    const staff = {...this.state.staff};
    staff[event.target.name] = event.target.value;
    this.setState({ staff: staff });
  }
  handleAddStaff = async () => {
    const staff = {...this.state.staff};
    Object.keys(staff).map(function(key, index) {
      if (staff[key]._d) {
        staff[key] = staff[key]._d.toISOString().slice(0,10);
      }
    });
    try {
      this.setState({loading: true})
      await this.props.onAddStaff(staff);
      this.setState({loading: false})
      toast("Add employee success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({
        showModal: false
      })
      this.props.onFetchStaff();
    } catch (err) {
      this.setState({loading: false})
      let obj = JSON.parse(err.request.response);
      let email = obj.error.email[0];
      if ( email === "The email has already been taken." ) {
        toast.error("Email is exits!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  }
  handlerUpdateStaff = async () => {
    
    const staff = {...this.state.staff};
    Object.keys(staff).map(function(key, index) {
      if (staff[key]._d) {
        staff[key] = staff[key]._d.toISOString().slice(0,10);
      }
    });
    this.setState({
      showModal: false,
    })
    try {
      this.setState({loading: true})
      await this.props.onUpdateStaff(staff);
      this.setState({loading: false})
      toast("Update success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchStaff();
    } catch (err) {
      this.setState({loading: false})
      console.log(err)
    }
  }
  showTextPasswordDelete = () => {
    this.setState({
      showInputPass: '',
    })
  }
  handlerDeleteStaff = async () => {
    try {
      await this.props.onDeleteStaff(this.state.idStaffDelete);
      // show notification after delete success
      toast("Delete success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchStaff();
      this.setState({showInputPass: 'none'})
    } catch (err) {
      console.log(err)
    }

    this.setState({
      showModal: false,
    })
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Modal showModals={this.state.showModal} closeModal={this.closeModal}
          objStaff={this.state.staff} roles={this.props.roles}
          onChangeBirthday={this.handleChangeBirthday}
          onChangeInput={this.handleChange} onSubmitAdd={this.handleAddStaff}
          load={this.state.loading} onSubmitEdit={this.handlerUpdateStaff}
          showInputPass={this.state.showInputPass}
          showTextDelete={this.showTextPasswordDelete}
          deleteStaff={this.handlerDeleteStaff} />
        <div className="card">
          <div className="card-header">
            <i className="icon-people"></i> Employees List
          </div>
          <div className="card-body">
          <Button color="primary" onClick={this.showModalAddStaff}
              style={{marginBottom: '20px'}} >Add employee</Button>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Birthday</th>
                <th>Status</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
                {this.props.staffs.map(staff => {
                  return (
                    <tr key={staff.id}>
                      <td>{staff.profile ? staff.profile.name : '' }</td>
                      <td>{staff.email}</td>
                      <td className="text-capitalize">{staff.profile ? staff.profile.gender : ''}</td>
                      <td className="text-capitalize">{staff.role.name}</td>
                      <td>{staff.profile ? staff.profile.birthday : ''}</td>
                      <td align="center">
                        <Badge className="text-capitalize" color={staff.status === "active" ? "success" : staff.status === "inactive" ? "warning" : "secondary"}>{staff.status}</Badge>
                      </td>
                      <td align="center" className="edit_delete">
                        <span>
                          <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalEditStaff(staff)} ></i>
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
    );
  }
}


const mapStateToProps = state => {
  return {
    staffs: state.staffState.staffs,
    roles: state.roleState.roles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchStaff: () => dispatch(actions.fetchStaff()),
    onFetchRole: () => dispatch(actionRoles.fetchRole()),
    onDeleteStaff: (idStaffDelete) => dispatch(actions.deleteStaff(idStaffDelete)),
    onUpdateStaff: (staffUpdate) => dispatch(actions.updateStaff(staffUpdate)),
    onAddStaff: (staffAdd) => dispatch(actions.addStaff(staffAdd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staffs);
