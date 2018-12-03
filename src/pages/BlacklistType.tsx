import * as React from "react";
import {Component} from "react";
import {FlatList, View} from "react-native";
import Header from "../components/Header";
import {AnnouncementType} from "../enum/AnnouncementType";
import {CheckBox} from "react-native-elements";
import UserConfigProvider from "../services/user-config.provider";
import Colors from "../theme/colors";

export default class BlacklistType extends Component {

    types = function (): string[] {
        let keys = Object.keys(AnnouncementType);
        return keys.slice(keys.length / 2, keys.length)
    };

    render() {
        return (
            <View>
                <Header title='Blacklist Types' {...this.props}/>
                <FlatList
                    data={this.types()}
                    renderItem={({item}) =>
                        <CheckBox
                            containerStyle={{paddingLeft: 24, paddingBottom: 8, margin: 0, borderWidth: 0}}
                            textStyle={{paddingLeft: 8}}
                            title={item}
                            checked={UserConfigProvider.getLocal().typeBlacklist.has(item)}
                            checkedColor={Colors.LIGHT_BLUE}
                            onPress={() => {
                                if (UserConfigProvider.getLocal().typeBlacklist.has(item))
                                    UserConfigProvider.blacklistRemoveType(item);
                                else
                                    UserConfigProvider.blacklistAddType(item);
                                this.forceUpdate()
                            }}
                        />}
                />
            </View>
        )
    }
}