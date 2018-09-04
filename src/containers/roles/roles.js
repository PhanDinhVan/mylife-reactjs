import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Table, Button } from 'reactstrap';

import * as actions from './role-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalAddEdit from './modal';


class Roles extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showModal: false,
        loading: false,
        role: {
          id: '',
          name: '',
          description: '',
          passDelete: '',
          disableOk: true,
        },
        showInputPass: 'none',
        idDeleteRole: '',
    };
  }
  componentDidMount() {
    this.props.onFetchRole();
  }
  showModalAdd = () => {
    const role_ = {...this.props.role};
    role_.id = '';
    this.setState({
      showModal: true,
      role: role_
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false,
      showInputPass: 'none',
    })
  }
  handleChange = (event) => {
    const role = {...this.state.role};
    role[event.target.name] = event.target.value;
    this.setState({ role: role });
  }
  handleAddRole = async () => {
    try {
      this.setState({loading: true})
      await this.props.onAddRole(this.state.role);
      this.setState({loading: false})
      toast("Add role success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({
        showModal: false
      })
      this.props.onFetchRole();
    } catch (err) {
      this.setState({loading: false})
      console.log(err)
        // let obj = JSON.parse(err.request.response);
        // let name = obj.error.name[0];
        // if ( name === "The name has already been taken." ) {
        //   toast.error("Name is exits!", {
        //     position: toast.POSITION.TOP_RIGHT
        //   });
        // }
    }
  }
  showModalEdit = (dataModal) => {
    const role = {...this.state.role};
    role.id = dataModal.id;
    role.name = dataModal.name;
    role.description = dataModal.description;
    let idRole = dataModal.id;
    this.setState({
      showModal: true,
      role: role,
      idDeleteRole: idRole,
    })
  }
  handleUpdateRole = async () => {
    this.setState({
      showModal: false
    })
    try {
      await this.props.onUpdateRole(this.state.role);
      toast("Update success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchRole();
    } catch (err) {
      console.log(err)
    }
  }
  showTextPasswordDelete = () => {
    this.setState({
      showInputPass: '',
    })
  }
  handleDeleteRole = async () => {
    try {
      await this.props.onDeleteRole(this.state.idDeleteRole);
      // show notification after delete success
      toast("Delete success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchRole();
      this.setState({showInputPass: 'none'})
    } catch (err) {
      console.log(err)
    }
    this.setState({
      showModal: false,
      role: {
        id: '',
        name: '',
        description: '',
        passDelete: '',
        disableOk: true,
      },
    })
  }
  render() {
    
    return (
      <div className="animated fadeIn"> 
        <ModalAddEdit stateParent={this} />
        <div className="card">
          <div className="card-header">
            <i className="icon-people"></i> Roles List
          </div>
          <div className="card-body">
          <Button color="primary" onClick={this.showModalAdd}
              style={{marginBottom: '20px'}} >Add role</Button>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                {/* <th>Create_at</th>
                <th>Updated_at</th> */}
                <th></th>
              </tr>
              </thead>
              <tbody>
                {this.props.roles.map(role => {
                  return (
                    <tr key={role.id}>
                      <td>{role.id}</td>
                      <td>{role.name}</td>
                      <td>{role.description}</td>
                      {/* <td>{role.created_at.date.slice(0,10)}</td>
                      <td>{role.updated_at.date.slice(0,10)}</td> */}
                      <td align="center" className="edit_delete">
                        <span>
                          <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalEdit(role)} ></i>
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
    roles: state.roleState.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRole: () => dispatch(actions.fetchRole()),
    onAddRole: (roleAdd) => dispatch(actions.addRole(roleAdd)),
    onDeleteRole: (idRoleDelete) => dispatch(actions.deleteRole(idRoleDelete)),
    onUpdateRole: (roleUpdate) => dispatch(actions.updateRole(roleUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
