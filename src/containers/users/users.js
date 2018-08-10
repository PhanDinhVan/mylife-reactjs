import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Table, Button } from 'reactstrap';

import * as actions from './user-actions';
import ModalEdit from './modal-edit';
import ModalDelete from './modal-delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
          birthday: ''
        },
        idUserDelete: '',
        loading: false
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
    user_temp.birthday = dataModal.profile.birthday;

    this.setState({
      showModal: true,
      user: user_temp
    });
  }
  closeModal = () => {
    this.setState({showModal: false});
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
    try {
      await this.props.onUpdateUser(this.state.user);
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
    this.setState({
      showModalDelete: false
    })
    try {
      await this.props.onDeleteUser(this.state.idUserDelete);
      // show notification after delete success
      toast("Delete success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchUser();
    } catch (err) {
      console.log(err)
    }
  }
  showModalAddUser = () => {
    const user_ = {...this.props.user};
    user_.id = '';
    this.setState({showModal: true, user: user_})
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
      let obj = JSON.parse(err.request.response);
      let email = obj.error.email[0];
      if ( email === "The email has already been taken." ) {
        toast.error("Email is exits!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  }
  render() {
    let Modal = null;
    if (this.state.user != null) {
      Modal = <ModalEdit show_Modal={this.state.showModal} 
                close_Modal={this.closeModal} 
                obj_Modal={this.state.user}
                on_Change={this.handleChange.bind()}
                on_Submit={this.updateUserHandler}
                on_Submit_Add={this.addUserHandler}
                load={this.state.loading} />;
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
          <Button onClick={this.showModalAddUser} color="success" 
              style={{marginBottom: '20px'}} >Add user</Button>
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
                {this.props.users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.profile ? user.profile.name : '' }</td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">{user.profile ? user.profile.gender : ''}</td>
                      <td className="text-capitalize">{user.role.name}</td>
                      <td>{user.profile ? user.profile.birthday : ''}</td>
                      <td align="center">
                        <Badge className="text-capitalize" color="success">{user.status}</Badge>
                      </td>
                      <td align="center">
                        <Button onClick={(e) => this.showModalEditUser(user)} color="dark" size="xs">Edit</Button>
                        <Button onClick={(e) => this.showModalDeleted(user)} className="ml-1" color="danger" size="xs">Delete</Button>
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
    users: state.userState.users
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
