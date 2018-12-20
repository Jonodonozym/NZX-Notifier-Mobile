import { Body, Header, Left, Right } from "native-base";
import * as React from "react";
import { Component } from "react";
import { ViewStyle } from "react-native";
import { Navigator } from 'react-navigation';
import Colors from "../../theme/colors";
import { HeaderLeftButton } from "./HeaderLeftButton";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { HeaderNextPageIcon } from "./HeaderRightButton";
import { HeaderTitle } from "./HeaderTitle";

type Props = {
    title: string,
    navigation?: Navigator,


    leftButtonPageLink?: string,
    leftButtonIcon?: string,
    leftButtonIconSet?: string,

    onRightButtonPress?: () => any,
    rightButtonPageLink?: string,
    rightButtonIcon?: string,
    rightButtonIconSet?: string,
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
        if (this.props.leftButtonPageLink)
            return <HeaderLeftButton {...this.props}></HeaderLeftButton>

        return (
            <Left style={sideButtonStyle}>
                <HeaderMenuButton {...this.props}></HeaderMenuButton>
            </Left>
        );

    }

    private renderCenter() {
        return (
            <Body style={{ flex: 1 }}>
                <HeaderTitle {...this.props}></HeaderTitle>
            </Body>
        )
    }

    private renderRightButton() {
        if (!this.props.rightButtonPageLink && !this.props.onRightButtonPress)
            return (<Right style={sideButtonStyle} />);
        return (<Right style={sideButtonStyle}><HeaderNextPageIcon {...this.props}></HeaderNextPageIcon></Right>)
    }
}