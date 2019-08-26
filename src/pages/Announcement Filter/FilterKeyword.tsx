import * as React from "react";
import { Component } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Header from "../../components/Header/Header";
import AppConfig from "../../services/appConfig";
import Colors from "../../theme/colors";

export default class FilterKeyword extends Component {

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Header title='Filter Keyword' rightButtonPageLink='KeywordAdd' {...this.props} />
                {this.renderMessageOrList()}
            </View>
        )
    }

    private renderMessageOrList() {
        if (AppConfig.getLocal().keywordBlacklist.size == 0)
            return (<Text style={styles.noKeywords}>
                Not filtering any keyword{"\n"}{"\n"}
                Add them by pressing the{"\n"}
                Plus icon</Text>);
        return (
            <FlatList
                data={Array.from(AppConfig.getLocal().keywordBlacklist)}
                renderItem={this.renderItem}
            />);
    }

    private renderItem: ListRenderItem<string> = ({ item }) => (
        <View style={styles.container}>
            <View style={{ flex: 7 }}>
                <Text style={styles.keyword}>{item}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Icon containerStyle={{ backgroundColor: 'white' }}
                    size={32}
                    color={Colors.LIGHT_BLUE}
                    underlayColor='white'
                    type='entypo'
                    name='cross'
                    onPress={() => {
                        AppConfig.blacklistRemoveKeyword(item);
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
        alignItems: 'center'
    },
    noKeywords: {
        textAlign: 'center',
        paddingTop: 48,
        fontSize: 18,
        lineHeight: 28
    },
    keyword: {
        paddingTop: 8,
        fontSize: 18,
        lineHeight: 28
    }
});