import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone'
import ImageUploader from 'react-images-upload';
import {hashHistory} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import Styles, { COLOR } from "../../config/styles";
import {createPost} from '../../actions/posts/post/create';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import FormStatus from '../../components/FormStatus';
import {renderInput, renderTextArea, renderTextAreaOK} from '../../utils/redux-form-fields';
import { Avatar, Card as CardOld, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
import { Form, Message } from "semantic-ui-react";
import './PostForm.scss';

const FILE_FIELD_NAME = 'files';

class PostForm extends Component {

    state = {
        
    };

    constructor(props) {
        super(props);
         this.state = { 
             image: [],
             error: null,
             files: [],
             success: null};
         this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            image: this.state.image.concat(picture),
        });
    }

    formSubmit = data => {
        const {activeUser, dispatch, posts} = this.props;
        dispatch(createPost({
            ...data,
            image: this.state.image[0],
            user: activeUser.id
        }))
            .then(entities => {
                const post = Object.values(entities['POSTS'])[0];
                hashHistory.push(`/profile/${post.user}/posts/${post.id}`);
            })
            .catch(error => {
                this.setState({error: error.response.data});
            });
    };

    

    renderDropZone() {
        const {image} = this.state;
        if (image.length > 0) return null;
        return (
            
            <Dropzone onDrop={this.onDrop} multiple={false}>
                
            </Dropzone>
        );
    }
    

    renderImagePreview() {
        const {image} = this.state;
        if (image.length === 0) return null;
        console.log(image);
        return image.map(file => (
            <div className="image-preview" key={file.name}>
                <div className="image-info">
                    {file.name} - {file.size} bytes
                </div>
                <img src={file.preview}/>
            </div>
        ))
    }

    render() {
      
        const { handleSubmit, pristine, reset, submitting } = this.props;
        
        return ( 
        
            <div className="PostAll">
    
            <View style ={{ height: 80 }}>
              
              <Appbar.Header theme={{ colors: { primary: COLOR.POST }}} >
                       
                       {this.props.activeUser? <Appbar.Action icon="edit" />: null }
                       
                    
                        <Appbar.Content
                        title='POST EDIT'
                        //subtitle={getFirstName(Number(this.props.post.user), users)}
                        style ={{ alignItems: 'center' }} 
                        />
                        <Appbar.Action icon="clear" onPress={() => hashHistory.push(`/profile/${this.props.post.user}/posts/`)} /> 
                                       
                        
                    </Appbar.Header>  
                            
              </View>
            
                                
              <View style={{
                                    
                                    // height: 700,
                                    //width: 550,
                                    borderRightColor:  COLOR.POST,
                                    borderRightWidth: 4,
                                    borderLeftColor:  COLOR.POST,
                                    borderLeftWidth: 4,
                                    borderTopColor:  COLOR.POST,
                                    borderTopWidth: 20,
                                    borderRadius: 25,
                                    // position: 'absolute', 
                                    marginTop: -18,
                                    //padding : 2, 
                                    //marginRight: 0,
                                    borderBottomColor:  COLOR.POST,
                                    borderBottomWidth: 40,
                                    justifyContent: 'center',
                                    //alignItems: 'flex-start',
                                }} >
                    <ScrollView style={[Styles.container, { padding: 0 }]}>            
                    
                     
                       <div >
                            <form className="PostForm" onSubmit={handleSubmit(this.formSubmit)}>
                                <FormStatus formState={this.state}/>
                                
                                <div>
                                <ImageUploader
                                        withPreview={true}
                                        singleImage={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop.bind(this)}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                 />
                                 </div>
                            {this.renderImagePreview()}
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </form>
                            
                            <FormStatus formState={this.state}/>
                            <Form onSubmit={handleSubmit(this.formSubmit)}>
                            <Form.Group widths="equal">
                            <Field
                                component={Form.Input}
                                label="Titre"
                                name="title"
                                placeholder="First name"
                                
                            />
                            <Field
                                component={renderTextAreaOK}
                                label="Body"
                                name="body"
                                placeholder="Tell us more about you..."
                                />
                            </Form.Group>
                            </Form>

                            </div>                          
                    </ScrollView>
        
                                                          
                                
              </View>
             
              </div>


        
        );
    }

}

PostForm = reduxForm({
    form: 'PostForm'
})(PostForm);

export default connect(state => ({
    activeUser: state.activeUser,
    posts: state.posts
}))(PostForm);