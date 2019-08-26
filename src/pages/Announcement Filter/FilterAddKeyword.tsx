import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import Header from "../../components/Header/Header";
import { goToPage } from "../../functions/PageNavigator";
import AppConfig from "../../services/appConfig";
import Colors from "../../theme/colors";

type Props = {
    navigation: Navigator
}

export default class FilterAddKeyword extends Component<Props> {
    private input: string = '';

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header title='Filter Keyword' leftButtonPageLink='Keyword' {...this.props} />
                <Text style={styles.baseText}>Please enter the keyword or{"\n"}phrase you wish to blacklist</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.input = text}
                    editable={true}
                    maxLength={40}
                    placeholder={"keyword or phrase"}
                    autoCorrect={false}
                />
                <Button
                    buttonStyle={styles.button}
                    title="Filter Keyword"
                    onPress={() => {
                        console.log(this.input);
                        if (this.input != '')
                            AppConfig.blacklistAddKeyword(this.input).then(() => goToPage(this.props.navigation, 'Keyword'));
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