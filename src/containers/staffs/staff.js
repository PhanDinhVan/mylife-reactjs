import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Table, Button } from 'reactstrap';

import * as actions from './staff-actions';
import ModalEdit from './modal-edit';
import ModalDelete from './modal-delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Staffs extends Component {
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
          birthday: '',
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
    user_temp.birthday = dataModal.profile.birthday;
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
        birthday: '',
        passDelete: '',
        disableOk: true,
      }
    })
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
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-people"></i> Staff List
          </div>
          <div className="card-body">
          <Button onClick={this.showModalAddUser} color="primary" 
              style={{marginBottom: '20px'}} >Add staff</Button>
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
                {this.props.staffs.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.profile ? user.profile.name : '' }</td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">{user.profile ? user.profile.gender : ''}</td>
                      <td className="text-capitalize">{user.role.name}</td>
                      <td>{user.profile ? user.profile.birthday : ''}</td>
                      <td align="center">
                        <Badge className="text-capitalize" color={user.status === "active" ? "success" : user.status === "inactive" ? "warning" : "secondary"}>{user.status}</Badge>
                      </td>
                      <td align="center" className="edit_delete">
                        <span>
                          <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalEditUser(user)} ></i>
                        </span>
                        {/* <span>
                          <i className="fa fa-trash-o fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalDeleted(user)} ></i>
                        </span> */}
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
    staffs: state.userState.staffs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchStaff: () => dispatch(actions.fetchStaff()),
    // onDeleteUser: (idUserDelete) => dispatch(actions.deleteUser(idUserDelete)),
    // onUpdateUser: (userUpdate) => dispatch(actions.updateUser(userUpdate)),
    // onAddUser: (userAdd) => dispatch(actions.addUser(userAdd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staffs);