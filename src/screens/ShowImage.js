import React, {Component} from 'react';
import { Container, Content} from 'react-native-elements';
import AddBtn from '../components/AddButton'
import Cards from '../components/Cards'
import ModalItem from '../components/Modal'
import {setImageAddedHandlerToFalse, getImageHandler, changeImageName} from '../actions/cameraActions'
import {connect} from 'react-redux'

class ImageCollectionApp extends Component {

  static navigationOptions = {
    header: null
  }

  state={
    modal: false,
    id: '',
    name: ''
  }

  modalHandler = (id, name, modal) => {
    if(modal){
      this.setState({
        modal: !this.state.modal,
      })
      return this.props.changeImageName(id, name)
    }
    this.setState({
      modal: !this.state.modal,
      id: id,
      name: name
    })
  }

  componentDidMount(){
    if(this.props.imageAdded){
      this.props.setImageAddedHandler()
    }
    this.props.getImage()
  }

  render() {
    let modal = null
    if(this.state.modal){
      modal = <ModalItem 
                modal={this.state.modal}
                imageId={this.state.id}
                imageName={this.state.name}
                modalHandler={this.modalHandler} />
    }

    return (
      <Container >
        <Content >
          {modal}
          <Cards 
            modalHandler={this.modalHandler} />
        </Content>
        <AddBtn 
          navigation={this.props.navigation}/>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    imageAdded: state.imageIsAdded,
    imageCollection: state.imageCollection
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setImageAddedHandler: () => {dispatch(setImageAddedHandlerToFalse())},
    getImage: () => {dispatch(getImageHandler())},
    changeImageName: (id, name) => {dispatch(changeImageName(id, name))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageCollectionApp)