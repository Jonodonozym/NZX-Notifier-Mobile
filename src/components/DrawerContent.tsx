import { Body, Header, Left } from "native-base";
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";
import { DrawerItems } from 'react-navigation';
import ServerDetails from "../services/server-details.provider";
import Colors from "../theme/colors";

export default class DrawerContent extends Component {
    render() {
        return (
            <View style={SideMenuStyles.container}>
                <Header style={SideMenuStyles.header}>
                    {this.renderMenuIcon()}
                    {this.renderTitle()}
                </Header>
                <ScrollView>
                    <DrawerItems labelStyle={{ fontSize: 18 }} {...this.props} />
                    <Text style={SideMenuStyles.label} onPress={() => {
                        this.openURL(ServerDetails.NZXURL)
                    }}>NZX Website</Text>
                </ScrollView>
            </View>
        );
    }

    private renderMenuIcon() {
        return (
            <Left style={SideMenuStyles.sides}>
                <Icon containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
                    iconStyle={{ paddingLeft: 8 }}
                    size={32}
                    color={'white'}
                    underlayColor={Colors.LIGHT_BLUE}
                    name="menu"
                    onPress={() => this.props.navigation.closeDrawer()}
                />
            </Left>
        )
    }

    private renderTitle() {
        return (
            <Body style={SideMenuStyles.body}><Text style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 28,
                textAlign: 'left',
                paddingLeft: 24,
            }}>NZX Notifier</Text></Body>
        )
    }

    private openURL(url: string) {
        Linking.canOpenURL(url).then(supported => {
            if (supported)
                Linking.openURL(url)
        })
    }
}

const SideMenuStyles = StyleSheet.create({
    container: {},
    navItemStyle: {},
    header: {
        backgroundColor: Colors.LIGHT_BLUE,
    },
    sides: { flex: 0, flexBasis: 48 },
    body: { flex: 1 },
    label: {
        fontSize: 18,
        margin: 16,
        color: 'black',
        fontWeight: "bold"
    }
});