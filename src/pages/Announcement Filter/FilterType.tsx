import * as React from "react";
import { Component } from "react";
import { FlatList, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Header from "../../components/Header/Header";
import { AnnouncementType } from "../../enum/AnnouncementType";
import AppConfig from "../../services/appConfig";
import Colors from "../../theme/colors";

export default class FilterType extends Component {
    public render() {
        return (
            <View>
                <Header title='Filter Type' {...this.props} />
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
                checked={AppConfig.getLocal().typeBlacklist.has(type)}
                checkedColor={Colors.LIGHT_BLUE}
                onPress={() => this.onSelectTypeCheckbox(type)}
            />
        );
    }

    private onSelectTypeCheckbox(type: AnnouncementType) {
        if (AppConfig.getLocal().typeBlacklist.has(type))
            AppConfig.blacklistRemoveType(type);
        else
            AppConfig.blacklistAddType(type);
        this.forceUpdate()
    }
}