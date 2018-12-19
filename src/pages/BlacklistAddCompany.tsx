import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import Header from "../components/Header/Header";
import { Company } from "../entity/Company";
import { goToPage } from "../functions/PageNavigator";
import { CompanyProvider } from "../services/companies.provider";
import UserConfigProvider from "../services/user-config.provider";
import Colors from "../theme/colors";


export default class BlacklistAddCompany extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header title='Blacklist Company' previousPage='Company' {...this.props} />
                <Text style={styles.baseText}>Please enter the company{"\n"}name or id you wish to blacklist</Text>
                {this.renderSearch()}
                <Button
                    buttonStyle={styles.button}
                    title="Blacklist Company"
                    onPress={async () => {
                        if (this.state == null || this.state.text == '')
                            goToPage(this.props.navigation, 'Company');
                        else {
                            let c: Company[] = await CompanyProvider.search(this.state.text);
                            console.log(c[0]);
                            if (c != undefined && c.length != 0)
                                UserConfigProvider.blacklistAddCompany(c[0]).then(() => goToPage(this.props.navigation, 'Company'));
                            else
                                goToPage(this.props.navigation, 'Company')
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
                onChangeText={(text) => this.state = { text }}
                editable={true}
                maxLength={40}
                placeholder={"keyword or phrase"}
                autoCorrect={false}
            />
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