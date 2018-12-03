import {Component} from "react";
import {StyleSheet, View} from "react-native";
import {Body, Header, Text} from "native-base";
import * as React from "react";
import AppHeader from "../components/Header";
import Colors from "../theme/colors";

export default class AlertSettings extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <AppHeader title="Alert Settings" {...this.props}/>
                <View style={{flex: 1}}>
                    <Header style={styles.header}>
                        <Body><Text style={styles.headerText}>Push Notifications</Text></Body>
                    </Header>
                </View>
                <View style={{flex: 1}}>
                    <Header style={styles.header}>
                        <Body><Text style={styles.headerText}>Alert Frequency</Text></Body>
                    </Header>
                </View>
                <View style={{flex: 1}}>
                    <Header style={styles.header}>
                        <Body><Text style={styles.headerText}>Quiet Hours</Text></Body>
                    </Header>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        height: 40,
        backgroundColor: Colors.PALE_BLUE,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});