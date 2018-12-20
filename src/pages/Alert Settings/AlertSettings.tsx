import { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Body, Header, Text } from "native-base";
import * as React from "react";
import AppHeader from "../../components/Header/Header";
import Colors from "../../theme/colors";
import { CheckBox } from "react-native-elements";
import UserConfigProvider from "../../services/user-config.provider";
import { PushNotificationType } from "../../enum/PushNotificationType";

type SectionProps = {
    title: string,
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});

class Section extends Component<SectionProps> {
    render() {
        return (
            <View>
                <Header style={{ height: 40, backgroundColor: Colors.PALE_BLUE }}>
                    <Body><Text style={styles.headerText}>
                        {this.props.title}
                    </Text></Body>
                </Header>
                {this.props.children}
            </View>
        )
    }
}

export default class AlertSettings extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <AppHeader title="Alert Settings" {...this.props} />
                <Section title="Push Notifications">
                    {this.renderPushSection()}
                </Section>
                <Section title="Alert Frequency">
                    {this.renderAlertSection()}
                </Section>
                <Section title="Quiet Hours">
                    {this.renderQuietHoursSection()}
                </Section>
            </View>
        )
    }

    private renderPushSection() {
        console.log(UserConfigProvider.getLocal().pushType)
        console.log(typeof (UserConfigProvider.getLocal().pushType))
        return (
            <View>
                <CheckBox
                    title={"Enable Notifications"}
                    checked={UserConfigProvider.getLocal().pushEnabled}
                    onPress={() => {
                        UserConfigProvider.getLocal().pushEnabled = !UserConfigProvider.getLocal().pushEnabled
                        UserConfigProvider.saveAlertSettings()
                        this.forceUpdate()
                    }}

                    containerStyle={{ paddingLeft: 32, paddingBottom: -8, marginTop: 4, borderWidth: 0 }}
                    textStyle={{ paddingLeft: 8 }}
                    checkedColor={Colors.LIGHT_BLUE}
                />

                {this.radioButton(PushNotificationType.SOUND, "sound")}
                {this.radioButton(PushNotificationType.VIBRATE, "vibrate")}
                {this.radioButton(PushNotificationType.SILENT, "silent")}
                <View
                    style={{
                        marginBottom: 12
                    }}
                />
            </View>
        )
    }

    private radioButton(type: PushNotificationType, label: string) {
        let pushEnabled: boolean = UserConfigProvider.getLocal().pushEnabled;
        return (
            <CheckBox
                title={label}
                checked={UserConfigProvider.getLocal().pushType == PushNotificationType[type]}
                onPress={() => {
                    if (!pushEnabled)
                        return;
                    UserConfigProvider.getLocal().pushType = PushNotificationType[type]
                    UserConfigProvider.saveAlertSettings()
                    this.forceUpdate()
                }}

                checkedIcon={pushEnabled ? 'dot-circle-o' : 'circle-o'}
                uncheckedIcon='circle-o'
                checkedColor={pushEnabled ? Colors.LIGHT_BLUE : Colors.LIGHT_GRAY}
                uncheckedColor={Colors.LIGHT_GRAY}
                textStyle={{ paddingLeft: 8, color: pushEnabled ? "black" : Colors.LIGHT_GRAY }}
                containerStyle={{ paddingLeft: 96, paddingVertical: -6, borderWidth: 0 }}
            ></CheckBox>
        )
    }

    private renderAlertSection() {
        return (<View />)

    }

    private renderQuietHoursSection() {
        return (<View />)
    }
}