import {Component} from "react";
import {FlatList, ListRenderItem, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import Header from "../components/Header/Header";
import UserConfigProvider from "../services/user-config.provider";
import {Icon} from "react-native-elements";
import Colors from "../theme/colors";
import {Company} from "../entity/Company";

export default class BlacklistCompany extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Header title='Blacklist Companies' nextPage='CompanyAdd' {...this.props}/>
                {this.renderMessageOrList()}
            </View>
        )
    }

    private renderMessageOrList() {
        if (UserConfigProvider.getLocal().companyBlacklist.size == 0)
            return (<Text style={styles.noKeywords}>
                No companies blacklisted{"\n"}{"\n"}
                Add them by pressing the{"\n"}
                Plus icon</Text>);
        return (
            <FlatList
                data={Array.from(UserConfigProvider.getLocal().companyBlacklist)}
                renderItem={this.renderItem}
            />);
    }

    private renderItem: ListRenderItem<Company> = ({item}) => (
        <View style={styles.container}>
            <View style={{flex: 7, flexDirection: "column"}}>
                <View style={{flex:2}}>
                    <Text style={styles.id}>{item.id}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </View>
            <View style={{flex: 1}}>
                <Icon containerStyle={{backgroundColor: 'white'}}
                      size={32}
                      color={Colors.LIGHT_BLUE}
                      underlayColor='white'
                      type='entypo'
                      name='cross'
                      onPress={() => {
                          UserConfigProvider.blacklistRemoveCompany(item);
                          this.forceUpdate()
                      }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noKeywords: {
        textAlign: 'center',
        paddingTop: 48,
        fontSize: 18,
        lineHeight: 28
    },
    id: {
        paddingTop: 8,
        fontSize: 28,
        fontWeight: "bold",
        color: 'black',
        lineHeight: 32
    },
    name: {
        fontSize: 18,
        lineHeight: 20
    }
});