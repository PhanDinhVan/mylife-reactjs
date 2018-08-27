import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Button, Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
import * as actions from './menus_sushi-actions';

class MenuSushiYen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }
  componentDidMount() {
    this.props.onFetchMenuSushiYen();
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {
      return (
        <div className="animated fadeIn">
          <div className="card">
            <div className="card-header">
              <i className="icon-map"></i> Menus Sushi Yen
            </div>
            <div className="card-body">
              <Button color="primary" onClick={() => {alert("doing")}}
                  style={{marginBottom: '20px'}} >Add Menu</Button>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Menu name</th>
                    <th>Name_EN</th>
                    <th>Name_JP</th>
                    <th>Name_VN</th>
                    <th>Price(VND)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.menusushi.map(menu => {
                      return (
                        <tr key={menu.id}>
                          <td>{menu.code}</td>
                          <td>{menu.menu_category.name_menu}</td>
                          <td>{menu.name_menu}</td>
                          <td>{menu.name_EN}</td>
                          <td>{menu.name_JP}</td>
                          <td>{menu.name_VN}</td>
                          <td>{menu.price}</td>
                          <td align="center" className="edit_delete">
                            <span>
                              <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={() => {alert("doing")}} ></i>
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
              <Pagination>
                <PaginationItem disabled>
                  <PaginationLink previous tag="button" />
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">
                    5
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next tag="button" />
                </PaginationItem>
              </Pagination>
            </div>
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    menusushi: state.menusushiState.menus_sushi
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenuSushiYen: () => dispatch(actions.fetchMenuSushiYen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSushiYen);