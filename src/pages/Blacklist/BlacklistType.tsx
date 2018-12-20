import * as React from "react";
import { Component } from "react";
import { FlatList, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Header from "../../components/Header/Header";
import { AnnouncementType } from "../../enum/AnnouncementType";
import UserConfigProvider from "../../services/user-config.provider";
import Colors from "../../theme/colors";

export default class BlacklistType extends Component {
    public render() {
        return (
            <View>
                <Header title='Blacklist Types' {...this.props} />
                <FlatList
                    data={this.types()}
                    renderItem={item => this.renderTypeCheckbox(item.item)}
                />
            </View>
        )
    }

    private types = function (): AnnouncementType[] {
        return Object.keys(AnnouncementType)
            .filter(value => isNaN(Number(value)) === false)
            .map(key => AnnouncementType[key]);
    };

    private renderTypeCheckbox(type: AnnouncementType) {
        return (
            <CheckBox
                containerStyle={{ paddingLeft: 24, paddingBottom: 8, margin: 0, borderWidth: 0 }}
                textStyle={{ paddingLeft: 8 }}
                title={type.toString()}
                checked={UserConfigProvider.getLocal().typeBlacklist.has(type)}
                checkedColor={Colors.LIGHT_BLUE}
                onPress={() => this.onSelectTypeCheckbox(type)}
            />
        );
    }

    private onSelectTypeCheckbox(type: AnnouncementType) {
        if (UserConfigProvider.getLocal().typeBlacklist.has(type))
            UserConfigProvider.blacklistRemoveType(type);
        else
            UserConfigProvider.blacklistAddType(type);
        this.forceUpdate()
    }
}