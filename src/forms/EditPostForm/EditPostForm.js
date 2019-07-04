import React, {Component} from 'react';
import {connect} from 'react-redux';

import ImageUploader from 'react-images-upload';
import {hashHistory} from 'react-router';
import {Field, reduxForm, actions} from 'redux-form';

import Styles, { COLOR } from "../../config/styles";
import {createPost} from '../../actions/posts/post/create';
import {editPost} from '../../actions/posts/post/edit';
import * as postActions from "../../actions/posts";
import * as postUserActionList from '../../actions/posts/post/list';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import FormStatus from '../../components/FormStatus';
import renderDatePicker from '../../utils/renderDatePicker';
import * as postUserActionGet from '../../actions/posts/post/get';
import {renderInput, renderTextArea, renderTextAreaOK, renderRadio} from '../../utils/redux-form-fields';
import { Avatar, Card as CardOld, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
import { Form, Message, Button , Image, Label} from "semantic-ui-react";
import moment from 'moment';
import { bindActionCreators } from "redux";
import DatePicker from "react-datepicker";
import settings from '../../config/settings';
import "react-datepicker/dist/react-datepicker.css";
import './EditPostForm.scss';

const FILE_FIELD_NAME = 'files';

class EditPostForm extends Component {

    state = {
        
    };

    constructor(props) {
        super(props);
         this.state = { 
             image :[],
             error: null,
             files: [],
             success: null,
             startDate: new Date(),
             endDate: new Date(),
             newImage: false,
             };
             
         this.onDrop = this.onDrop.bind(this);
         this.handleStartDateChange = this.handleStartDateChange.bind(this);
         this.handleEndDateChange = this.handleEndDateChange.bind(this);
        // this.loadPost.bind(this);
         
    }

    componentDidMount() {

        const { params: {postId}, post} = this.props;
        this.props.postUserActionGet.getPost(postId);

        
    
          
    }
    componentWillMount() {
        
    }

    setDefaultPost (values)  {
        const {activeUser, dispatch, posts} = this.props;  
        dispatch(actions.change('post', values))
    }


    download(url) {
        // fake server request, getting the file url as response
        setTimeout(() => {
          const response = {
            file: url,
          };
          
          //return response.file;
          // server sent the url to the file!
          // now, let's download:
          //window.open(response.file);
          // you could also do:
          window.location.href = response.file;
        }, 100);
      }
    onDrop(picture) {
        this.setState({
            image: picture,
            newImage: true,
        });
    }

    handleStartDateChange(date) {
        this.setState({
          startDate: date
        });
      }

    handleEndDateChange(date) {
        this.setState({
          endDate: date
        });
     }  
    formSubmit = data => {
        const {activeUser, dispatch, posts} = this.props;
        console.log(data)
        dispatch(editPost({
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

    
    loadPost() {
        const {post} = this.props;
        this.setDefaultPost(
           Object.values(post)
        )
      }
   
    

    renderImagePreview() {
        const {image} = this.state;
        if (image.length === 0) return null;
        if (image === null) return null;
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
      
        const { handleSubmit, pristine, reset, submitting, posts } = this.props;
        const {post} = this.props;
        const {activeUser} = this.props;
        if (!post) return null;
        if (post != null){ 
            console.log(`${settings.API_ROOT}${post.image}`)
            console.log(post)
            const file = (`${settings.API_ROOT}${post.image}`);   
            //this.loadPost()
             }
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
                                    
                                    height: 700,
                                    width: 550,
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
                               
                            {(post.image != null && !this.state.image[0])?<Image centered size='small' src={`${settings.API_ROOT}${post.image}`}/> : null}
                                <div>
                                <ImageUploader
                                        withPreview={true}
                                        singleImage={true}
                                        buttonText='Choisir IMAGE'
                                        buttonStyles={{ backgroundColor : COLOR.POST}}
                                        onChange={this.onDrop.bind(this)}
                                        
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        
                                        
                                        
                                 />
                                 </div>
                        
                                
                            </form>
                            
                            <FormStatus formState={this.state}/>
                            <Form model="post" onSubmit={handleSubmit(this.formSubmit)}>
                            <Form.Group widths="equal"> 
                                
                                <Field  
                                        inputValueFormat="YYYY-MM-DD hh:mm:ss"
                                        name="date_debut"
                                        placeholder="Date Debut"
                                        fixedHeight
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        normalize={value => (value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : null)}
                                        component={renderDatePicker}
                                        />  
                                <Field  
                                        inputValueFormat="YYYY-MM-DD hh:mm:ss"
                                        name="date_fin"
                                        placeholder="Date Fin"
                                        fixedHeight
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        normalize={value => (value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : null)}
                                        component={renderDatePicker}
                                        />
                                
                                
                                <div>
                                <Field
                                    component={renderRadio}
                                    label="Active public"
                                    name="is_active"
                                    radioValue={true}
                                />
                                <Field
                                    component={renderRadio}
                                    label="Inactive"
                                    name="is_active"
                                    radioValue={false}
                                />
                                </div>
                             </Form.Group>
                            <Form.Group widths="equal">
                            <Field
                                component={Form.Input}
                                label="Titre"
                                name="title"
                                value={(post != null)?post.title:null}
                                
                                placeholder="Titre"
                                
                            /></Form.Group>
                            <Field
                                component={renderTextAreaOK}
                                label="Description"
                                name="body"
                                placeholder="Description..."
                                />

                             
                            <Button color='olive'>Post</Button>
                            </Form>
                            
                            </div>                          
                    </ScrollView>
        
                                                          
                                
              </View>
             
              </div>


        
        );
    }

}


EditPostForm = reduxForm({
    form: 'PostForm'
})(EditPostForm);

export default connect((state, props) => ({
    activeUser: state.activeUser,
    post: state.posts.data[props.params.postId],
    users: state.users.data,
    posts: state.posts.data,
    initialValues: state.posts.data[props.params.postId],
    
}),
dispatch => ({
            actionsposts: bindActionCreators(postActions, dispatch),
            postUserActionList : bindActionCreators(postUserActionList, dispatch),
            postUserActionGet : bindActionCreators(postUserActionGet, dispatch),

            }))(EditPostForm);