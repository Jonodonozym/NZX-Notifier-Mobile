import {Component} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import Header from "../components/Header/Header";
import {NavigationActions, StackActions} from 'react-navigation';
import UserConfigProvider from "../services/user-config.provider";
import {Button} from "react-native-elements";
import Colors from "../theme/colors";
import {Company} from "../entity/Company";
import {CompanyProvider} from "../services/companies.provider";
import Autocomplete from "react-native-autocomplete-input";


export default class BlacklistAddCompany extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header title='Blacklist Company' previousPage='Company' {...this.props}/>
                <Text style={styles.baseText}>Please enter the company{"\n"}name or id you wish to blacklist</Text>
                {this.renderSearch()}
                <Button
                    buttonStyle={styles.button}
                    title="Blacklist Company"
                    onPress={async () => {
                        if (this.state == null || this.state.text == '')
                            this.navigate('Company');
                        else {
                            let c: Company[] = await CompanyProvider.search(this.state.text);
                            console.log(c[0]);
                            if (c != undefined && c.length != 0)
                                UserConfigProvider.blacklistAddCompany(c[0]).then(() => this.navigate('Company'));
                            else
                                this.navigate('Company')
                        }
                    }}
                />
            </View>
        )
    }

    private renderSearch() {
        return (
            <TextInput
                style={styles.input}
                onChangeText={(text) => this.state = {text}}
                editable={true}
                maxLength={40}
                placeholder={"keyword or phrase"}
                autoCorrect={false}
            />
        )
    }

    private navigate(page: string) {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: page})
            ]
        }));
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