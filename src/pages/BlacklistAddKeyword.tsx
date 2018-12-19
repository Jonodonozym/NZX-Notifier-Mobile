import { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as React from "react";
import Header from "../components/Header/Header";
import { NavigationActions, StackActions } from 'react-navigation';
import UserConfigProvider from "../services/user-config.provider";
import { Button } from "react-native-elements";
import Colors from "../theme/colors";
import { goToPage } from "../functions/PageNavigator";


export default class BlacklistAddKeyword extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header title='Blacklist Keyword' previousPage='Keyword' {...this.props} />
                <Text style={styles.baseText}>Please enter the keyword or{"\n"}phrase you wish to blacklist</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.state = { text }}
                    editable={true}
                    maxLength={40}
                    placeholder={"keyword or phrase"}
                    autoCorrect={false}
                />
                <Button
                    buttonStyle={styles.button}
                    title="Blacklist Keyword"
                    onPress={() => {
                        console.log(this.state);
                        if (this.state != null && this.state.text != '')
                            UserConfigProvider.blacklistAddKeyword(this.state.text).then(() => goToPage(this.props.navigation, 'Keyword'));
                        else
                            goToPage(this.props.navigation, 'Keyword')
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
        fontSize: 20,
        paddingTop: 24,
        paddingBottom: 16,
        paddingLeft: '5%',
        alignSelf: 'center'
    },
    button: {
        width: '50%',
        alignSelf: 'center',
        margin: 16,
        backgroundColor: Colors.LIGHT_BLUE,
        borderRadius: 10,
    },
    input: {
        width: '80%',
        margin: 16,
        paddingLeft: 16,
        paddingRight: 16,
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 1
    }
});