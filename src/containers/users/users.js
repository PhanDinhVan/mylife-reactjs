import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Table, Button } from 'reactstrap';

import * as actions from './user-actions';
import ModalEdit from './modal-edit';
import ModalDelete from './modal-delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showModal: false,
        showModalDelete: false,
        user: {
          id: '',
          profileId: '',
          roleId: '',
          name: '',
          status: '',
          gender: null,
          email: '',
          phone: '',
          birthday: moment(),
          passDelete: '',
          disableOk: true,
        },
        idUserDelete: '',
        loading: false,
        showInputPass: 'none',
    };
  }
  componentDidMount() {
    this.props.onFetchUser();
  }
  showModalEditUser = (dataModal) => {
    const user_temp = { ...this.state.user};
    user_temp.id = dataModal.id;
    user_temp.profileId = dataModal.profile.id;
    user_temp.roleId = dataModal.role.id;
    user_temp.status = dataModal.status;
    user_temp.gender = dataModal.profile.gender;
    user_temp.name = dataModal.profile.name;
    user_temp.email = dataModal.email;
    user_temp.phone = dataModal.profile.phone;
    user_temp.birthday = moment(dataModal.profile.birthday);
    let idDelete = dataModal.id;
    this.setState({
      showModal: true,
      user: user_temp,
      idUserDelete: idDelete,
    });
  }
  closeModal = () => {
    this.setState({
      showModal: false,
      showInputPass: 'none',
      user: {
        id: '',
        profileId: '',
        roleId: '',
        name: '',
        status: '',
        gender: null,
        email: '',
        phone: '',
        birthday: moment(),
        passDelete: '',
        disableOk: true,
      },
    });
  }
  handleChange = (event) => {
    const user = {...this.state.user};
    user[event.target.name] = event.target.value;
    this.setState({ user: user });
  }
  updateUserHandler = async () => {
    this.setState({
      showModal: false
    })
    const user = {...this.state.user};
    Object.keys(user).map(function(key, index) {
      if (user[key]._d) {
        user[key] = user[key]._d.toISOString().slice(0,10);
      }
    });
    try {
      await this.props.onUpdateUser(user);
      toast("Update success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchUser();
    } catch (err) {
      console.log(err)
    }
  }
  showModalDeleted = (userDelete) => {
    this.setState({
      showModalDelete: true,
      idUserDelete: userDelete.id
    })
  }
  closeModalDeleted = () => {
    this.setState({
      showModalDelete: false
    })
  }
  deleteUserHandler = async () => {
    try {
      await this.props.onDeleteUser(this.state.idUserDelete);
      // show notification after delete success
      toast("Delete success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchUser();
      this.setState({showInputPass: 'none'})
    } catch (err) {
      console.log(err)
    }
    this.setState({
      showModal: false,
      user: {
        id: '',
        profileId: '',
        roleId: '',
        name: '',
        status: '',
        gender: null,
        email: '',
        phone: '',
        birthday: '',
        passDelete: '',
        disableOk: true,
      }
    })
  }
  showModalAddUser = () => {
    const user_ = {...this.props.user};
    user_.id = '';
    user_.birthday = moment();
    this.setState({showModal: true, user: user_})
  }
  handleChangeBirthdayDate = (date) => {
   
    const user = {...this.state.user};
    user.birthday = date;
    this.setState({
      user: user
    });
  }
  addUserHandler = async () => {
    
    try {
      this.setState({loading: true})
      await this.props.onAddUser(this.state.user);
      this.setState({loading: false})
      toast("Add user success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({
        showModal: false
      })
      this.props.onFetchUser();
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
  showTextPasswordDelete = () => {
    this.setState({
      showInputPass: '',
    })
  }
  render() {
    let Modal = null;
    if (this.state.user != null) {
      Modal = <ModalEdit showModals={this.state.showModal} 
                closeModal={this.closeModal} 
                obj_Modal={this.state.user}
                on_Change={this.handleChange.bind()}
                changeBirthday={this.handleChangeBirthdayDate.bind()}
                on_Submit={this.updateUserHandler}
                on_Submit_Add={this.addUserHandler}
                load={this.state.loading}
                showInputPass={this.state.showInputPass}
                deleteUser={this.deleteUserHandler}
                showTextDelete={this.showTextPasswordDelete} />;
    }
    let Modal_Delete = null;
    if (this.state.showModalDelete) {
      Modal_Delete = <ModalDelete show_ModalDelete={this.state.showModalDelete}
                        close_ModalDelete={this.closeModalDeleted}
                        deleteUser={this.deleteUserHandler} />;
    }
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-people"></i> User List
          </div>
          <div className="card-body">
          <Button onClick={this.showModalAddUser} color="primary" 
              style={{marginBottom: '20px'}} >Add user</Button>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Birthday</th>
                <th className="center">Status</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
                {this.props.users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.profile ? user.profile.name : '' }</td>
                      <td>{user.email}</td>
                      <td>{user.profile ? user.profile.phone : ''}</td>
                      <td className="text-capitalize">{user.profile ? user.profile.gender : ''}</td>
                      <td>{user.profile ? user.profile.birthday : ''}</td>
                      <td align="center">
                        <Badge className="text-capitalize" color={user.status === "active" ? "success" : user.status === "inactive" ? "warning" : "secondary"}>{user.status}</Badge>
                      </td>
                      <td align="center" className="edit_delete">
                        <span>
                          <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalEditUser(user)} ></i>
                        </span>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
          </div>
        </div>
        {Modal} {Modal_Delete}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    users: state.userState.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser()),
    onDeleteUser: (idUserDelete) => dispatch(actions.deleteUser(idUserDelete)),
    onUpdateUser: (userUpdate) => dispatch(actions.updateUser(userUpdate)),
    onAddUser: (userAdd) => dispatch(actions.addUser(userAdd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
