    
import React, { Component } from 'react';
import { 
    StyleSheet, Text, View, Image, 
    StatusBar, TextInput, SafeAreaView, Keyboard,  KeyboardAvoidingView, ImageBackground,
    AsyncStorage, 
} from 'react-native';
import { Button } from 'react-native-paper';
import {Link} from 'react-router';
import './Login.scss'

// import CustomLoading from "../components/loading";
import Styles, { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";



class Login extends Component {

    formSubmit = data => {
        const {dispatch} = this.props;
        dispatch(login(data));
    };

    static navigationOptions = ({ navigation }) => ({
        title: "Sign in",
        headerTintColor: COLOR.LIGHT,
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: COLOR.PANTOME
        }
    }); // navigationOptions

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

      

                 
    }

    renderError(error) {
        if (error) {
            return (
                <View
                    style={{
                        height: 40,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ffffff',
                        backgroundColor: COLOR.DANGER
                    }}
                >
                    <Text style={{ color: '#ffffff' }}>{error}</Text>
                </View>
            );
        } else {
            return null;
        }
    }

     handleLoginRequest = () => {
         this.props.actions.login(this.state.email, this.state.password)
         if (this.props.state.isAuth) this.props
     }

    

    render() {

        const myLogo = [
                        require('../images/PLOUC.png'),
                      ];

        const randLogo = myLogo[Math.floor(Math.random() * myLogo.length)]; 

        const myArbre = [   require('../images/arbre.png'),
                           
                      ];
        const randArbre = myArbre[Math.floor(Math.random() * myArbre.length)];              
        
        console.log(this.randLogo)
        return (
            <div className="Login">
            <div className="card">
            <div className="card-block">
            <SafeAreaView style={styles.container}>
              <ImageBackground source={`${ randArbre }`} style={{width: '100%', height: '100%', opacity: 1, alignItems: 'stretch',}}>
              <StatusBar barStyle="light-content" />
                 <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    
                    <View style={styles.container} >
                        <View style={styles.logoContainer}>
                            <Text>{' '}</Text>
                            <Text>{' '}</Text>
                            <Text>{' '}</Text>
                            <Text>{' '}</Text>
                            <Text>{' '}</Text>
                            <Text>{' '}</Text>
                            <Text>{' '}</Text>
                            <Image style={styles.logo}
                              // source={require( `${ randLogo }` )}
                              source={`${ randLogo }`}
                            > 
                            </Image>
                        </View>
                        <View style={styles.infoContainer}>
                            <TextInput style={styles.input} 
                                placeholder="Email"
                                placeholderTextColor='rgba(0,0,0,0.8)'
                                returnKeyType='next'
                                keyboardType='email-address'
                                autoCorrect={false}
                                onChangeText={v => this.setState({ email: v })}
                                value={this.state.email}
                                onSubmitEditing={() => this.refs.txtPassword.focus()}  
                            />
                             <TextInput style={styles.input} 
                                placeholder="Password"
                                placeholderTextColor='rgba(0,0,0,0.8)'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                                ref={"txtPassword"}
                                onChangeText={v => this.setState({ password: v })}
                                value={this.state.password}
                            />
                            <Button style={styles.buttonContainer} onPress={() => {
                                    this.props.actions.login(this.state.email, this.state.password)
                                }}>
                               <Text style={styles.buttonText}>Login</Text>
                            </Button>
                        </View>
                      </View>
                 
                    
                </KeyboardAvoidingView>
                </ImageBackground>
            </SafeAreaView>
            
            </div>
            </div>
            </div>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white',
        flexDirection: 'column',
        width: '100%',
        //alignItems: 'stretch',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom: 20,
    },
    logo: {
        width: 430,
        height: 188,
        opacity: 0.8,
        top : +100
    },
    infoContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        bottom: 0,
        //backgroundColor: 'red',
        padding: 20,
        height: 550,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: '50%',
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 30,
        marginBottom: 20,
        borderRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        width: '50%',
        backgroundColor: COLOR.HOME,
        paddingVertical: 15,
        borderRadius: 100,
        marginBottom: 20,
        elevation: 2,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
    }
})
export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Login);
