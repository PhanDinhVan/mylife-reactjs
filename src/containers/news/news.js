import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as actions from './new-actions';
import { Table, Button, Badge } from 'reactstrap';
import Modals from './modal';
import ModalDelete from './modal-delete';
import moment from 'moment';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      news: {
        id: '',
        name: '',
        content: '',
        url: '',
        photo: null,
        status: '',
        displayImg: true,
        publishedDate: moment(),
      },
      loading: false,
      idNewsDelete: '',
      showModalDelete: false,
      
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      },
     
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ],
    }
    this.handleChangeContent = this.handleChangeContent.bind(this)
  }
  handleChangeContent (html) {
    let news = {...this.state.news};
    news.content = html;
  	this.setState({ news: news });
  }
  componentDidMount() {
    this.props.onFetchNews();
  }
  showModalAddNews = () => {
    const news = {...this.props.news};
    news.id = '';
    news.displayImg = true;
    this.setState({
      showModal: true,
      news: news
    });
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  handleChangeImage = (event) => {
    const news = {...this.state.news};
    news.photo = event.target.files[0];
    news.displayImg = false;
    this.setState({ 
      news: news
    });
  }
  handleChange = (event) => {
    const news = {...this.state.news};
    news[event.target.name] = event.target.value;
    this.setState({ news: news });
  }
  addNewsHandle = async () => {
    const news_temp = {...this.state.news}
    Object.keys(news_temp).map(function(key, index) {
      if (news_temp[key]._d) {
        news_temp[key] = news_temp[key]._d.toISOString().slice(0,10);
      }
    });
    try {
      this.setState({loading: true})
      await this.props.onAddNews(news_temp)
      this.setState({loading: false})
      toast("Add news success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({
        showModal: false
      })
      this.props.onFetchNews();
    } catch (err) {
      this.setState({loading: false})
      console.log(err)
    }
    const news = {...this.state.news};
    news.displayImg = true;
    this.setState({
      news: news
    })
  }
  showModalEditNews = (dataModal) => {
    let dateObj = new Date(dataModal.publishDate);
    let momentObj = moment(dateObj);

    const news = {...this.state.news};
    news.id = dataModal.id;
    news.name = dataModal.name;
    news.content = dataModal.content;
    news.url = dataModal.url;
    news.status = dataModal.status;
    news.photo = dataModal.image;
    news.publishedDate = momentObj;
    this.setState({
      showModal: true,
      news: news
    });
  }
  updateNewsHandle = async () => {
    const news = {...this.state.news};
    news.displayImg = true;
    this.setState({
      showModal: false,
      news: news
    })
    try {
      await this.props.onUpdateNews(news);
      toast("Update success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchNews();
    } catch (err) {
      console.log(err)
    }
  }
  showModalDeleteNews = (newsdelete) => {
    this.setState({
      showModalDelete: true,
      idNewsDelete: newsdelete.id
    })
  }
  closeModalDelete = () => {
    this.setState({showModalDelete: false})
  }
  deleteNewsHandle = async () => {
    this.setState({
      showModalDelete: false
    })
    try {
      await this.props.onDeleteNews(this.state.idNewsDelete);
      toast("Delete success !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.onFetchNews();
    } catch (err) {
      console.log(err)
    }
  }
  handleChangePublishedDate = (date) => {
    const news = {...this.state.news};
    news.publishedDate = date;
    this.setState({
      news: news
    });
  }
  render() {
      return (
        <div className="animated fadeIn">
        {console.log(this.state.news)}
          <Modals showModal={this.state.showModal}
            closeModal={this.closeModal}
            changeImage={this.handleChangeImage.bind()}
            onChangeInput={this.handleChange.bind()}
            onSubmitAdd={this.addNewsHandle}
            load={this.state.loading}
            objNewsEdit={this.state.news}
            onSubmitEdit={this.updateNewsHandle}
            displayImg={this.state.displayImg}
            onChangePublishedDate = {this.handleChangePublishedDate.bind()}
            // valueContent={this.state.text}
            onChangeContent={this.handleChangeContent}
            modules={this.state.modules}
            formats={this.state.formats} />

          <ModalDelete showModalDelete={this.state.showModalDelete}
            closeModalDelete={this.closeModalDelete}
            deleteSubmit={this.deleteNewsHandle} />

          <div className="card">
            <div className="card-header">
              <i className="icon-people"></i> News List
            </div>
            <div className="card-body">
            <Button color="primary" onClick={this.showModalAddNews}
                style={{marginBottom: '20px'}} >Add news</Button>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th className="create_date">Create date</th>
                  <th className="publisd_date">Publish date</th>
                  <th>Status</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Url</th>
                  <th>Create by</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  {this.props.news.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.created_at.date.slice(0,10)}</td>
                        <td>{item.publishDate}</td>
                        <td align="center" >
                          <Badge className="text-capitalize" color={item.status === "publish" ? "success" : item.status === "completed" ? "secondary" : "danger"}>{item.status}</Badge>
                        </td>
                        <td>{item.name}</td>
                        <td dangerouslySetInnerHTML={{__html: item.content}} />
                        {/* <td>{item.content}</td> */}
                        <td onClick={() => window.open(item.url)}><a style={{color:'#1985ac'}} >{item.url.slice(44)}</a></td>
                        <td>{item.userName}</td>
                        <td align="center" className="edit_delete">
                          <span>
                            <i className="fa fa-edit fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalEditNews(item)} ></i>
                          </span>
                          <span>
                            <i className="fa fa-trash-o fa-lg mt-4 icon_edit_del" onClick={(e) => this.showModalDeleteNews(item)} ></i>
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
    news: state.newState.news
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchNews: () => dispatch(actions.fetchNew()),
    onAddNews: (newsAdd) => dispatch(actions.addNew(newsAdd)),
    onUpdateNews: (newsUpdate) => dispatch(actions.updateNew(newsUpdate)),
    onDeleteNews: (newsDelete) => dispatch(actions.deleteNew(newsDelete))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);