import { Body, Header, Left, Right } from "native-base";
import * as React from "react";
import { Component } from "react";
import { ViewStyle } from "react-native";
import { Navigator } from 'react-navigation';
import Colors from "../../theme/colors";
import { HeaderBackArrow } from "./HeaderBackArrow";
import { HeaderMenuIcon } from "./HeaderMenuIcon";
import { HeaderNextPageIcon } from "./HeaderNextPageIcon";
import { HeaderTitle } from "./HeaderTitle";

type Props = {
    title: string,
    navigation?: Navigator,


    previousPage?: string,
    previousPageIcon?: string,
    previousPageIconSet?: string,

    nextPageOnPress?: () => any,
    nextPage?: string,
    nextPageIcon?: string,
    nextPageIconSet?: string,
}

const sideButtonStyle: ViewStyle = {
    flex: 0, flexBasis: 48
}

export default class AppHeader extends Component<Props> {

    render() {
        return (
            <Header style={{ backgroundColor: Colors.LIGHT_BLUE, justifyContent: 'flex-start', alignItems: 'center' }}>
                {this.renderLeftButton()}
                {this.renderCenter()}
                {this.renderRightButton()}
            </Header>
        );
    }

    private renderLeftButton() {
        if (!this.props.previousPage)
            return (
                <Left style={sideButtonStyle}>
                    <HeaderMenuIcon {...this.props}></HeaderMenuIcon>
                </Left>
            );

        return <HeaderBackArrow {...this.props}></HeaderBackArrow>
    }

    private renderCenter() {
        return (
            <Body style={{ flex: 1 }}>
                <HeaderTitle {...this.props}></HeaderTitle>
            </Body>
        )
    }

    private renderRightButton() {
        if (!this.props.nextPage && !this.props.nextPageOnPress)
            return (<Right style={sideButtonStyle} />);
        return (<Right style={sideButtonStyle}><HeaderNextPageIcon {...this.props}></HeaderNextPageIcon></Right>)
    }
}