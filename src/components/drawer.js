import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native';
import { DrawerItems, DrawerActions } from "react-navigation";
import settings from '../config/settings';
import { DefaultTheme, Button as ButPaper, Badge } from 'react-native-paper';



import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class DrawerComponent extends Component {
    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1
                }}>
                <View
                    style={{
                        height: 170,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    
                    <Image
                        source={{ uri: `${settings.API_ROOT}${this.props.state.authSession.data.profile.image}` }}
                        style={{
                            marginTop: 30,
                            height: 120,
                            width: 120,
                            borderRadius: 60
                        }} />
                    <Badge style={{ backgroundColor: "green" }} >{`${this.props.state.authSession.data.role || 'Plouc'}`}</Badge>
                    <Text>{this.props.state.authSession.data.email || 'unknown@mail.com'}</Text>
                </View>
                <ScrollView>
                    <DrawerItems
                        {...this.props}
                    />
                    <ButPaper
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.closeDrawer());
                            this.props.actions.logout(this.props.navigation.navigate)
                        }}
                        title={"LOG OUT"}
                    />
                </ScrollView>
            </SafeAreaView>
            
        )
    }
}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(DrawerComponent);