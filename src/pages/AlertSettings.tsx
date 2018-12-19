import { Component } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Body, Header, Text } from "native-base";
import * as React from "react";
import AppHeader from "../components/Header/Header";
import Colors from "../theme/colors";

export default class AlertSettings extends Component {

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <AppHeader title="Alert Settings" {...this.props} />
                <View style={{ flex: 1 }}>
                    <Header style={headerStyle}>
                        <Body><Text style={styles.headerText}>Push Notifications</Text></Body>
                    </Header>
                </View>
                <View style={{ flex: 1 }}>
                    <Header style={headerStyle}>
                        <Body><Text style={styles.headerText}>Alert Frequency</Text></Body>
                    </Header>
                </View>
                <View style={{ flex: 1 }}>
                    <Header style={headerStyle}>
                        <Body><Text style={styles.headerText}>Quiet Hours</Text></Body>
                    </Header>
                </View>
            </View>
        )
    }
}

const headerStyle: ViewStyle = {
    height: 40,
    backgroundColor: Colors.PALE_BLUE,
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});