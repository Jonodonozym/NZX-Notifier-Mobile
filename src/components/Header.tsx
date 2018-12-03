import {Component} from "react";
import {Body, Header, Left, Right} from "native-base";
import {Icon} from "react-native-elements";
import * as React from "react";
import {StyleSheet, Text} from "react-native";
import Colors from "../theme/colors";
import {NavigationActions, StackActions} from 'react-navigation';

export default class AppHeader extends Component {
    constructor(props: Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <Header style={{backgroundColor: Colors.LIGHT_BLUE, justifyContent: 'flex-start', alignItems: 'center'}}>
                {this.renderMenuIcon()}
                {this.renderTitle()}
                {this.renderNextPageButton()}
            </Header>
        );
    }

    private renderMenuIcon() {
        if (!this.props.previousPage)
            return (
                <Left style={styles.sides}>
                    <Icon containerStyle={{backgroundColor: Colors.LIGHT_BLUE}}
                          iconStyle={{paddingLeft: 8}}
                          size={32}
                          color={'white'}
                          underlayColor={Colors.LIGHT_BLUE}
                          name="menu"
                          onPress={() => this.props.navigation.openDrawer()}
                    />
                </Left>
            );

        let name: string = this.props.previousPageIcon ? this.props.previousPageIcon : "back";
        let group: string = this.props.previousPageIconSet ? this.props.previousPageIconSet : "entypo";
        return (
            <Icon containerStyle={{backgroundColor: Colors.LIGHT_BLUE}}
                  iconStyle={{paddingLeft: 8, paddingRight: 8}}
                  size={32}
                  color={'white'}
                  underlayColor={Colors.LIGHT_BLUE}
                  type={group}
                  name={name}
                  onPress={() => this.navigate(this.props.previousPage)}
            />
        )
    }

    private renderTitle() {
        return (
            <Body style={styles.body}><Text style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 28,
                textAlign: 'left',
            }}>{this.props.title}</Text></Body>
        )
    }

    private renderNextPageButton() {
        if (!this.props.nextPage && !this.props.onPress)
            return (<Right style={styles.sides}/>);
        return (<Right style={styles.sides}>{this.nextPageIcon()}</Right>)
    }

    private nextPageIcon() {
        let name: string = this.props.nextPageIcon ? this.props.nextPageIcon : "plus";
        let group: string = this.props.nextPageIconSet ? this.props.nextPageIconSet : "entypo";
        let onPress = this.props.onPress? this.props.onPress: () => this.navigate(this.props.nextPage);
        return (
            <Icon containerStyle={{backgroundColor: Colors.LIGHT_BLUE}}
                  size={32}
                  color={'white'}
                  underlayColor={Colors.LIGHT_BLUE}
                  type={group}
                  name={name}
                  onPress={onPress}
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
    sides: {flex: 0, flexBasis: 48},
    body: {flex: 1}
});