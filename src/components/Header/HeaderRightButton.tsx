import { SFC } from "react";
import React from "react";
import { Icon } from "react-native-elements";
import Colors from "../../theme/colors";
import { goToPage } from "../../functions/PageNavigator";


type Props = {
    navigation?: Navigator,

    rightButtonPageLink?: string,
    rightButtonIcon?: string,
    rightButtonIconSet?: string,
    onRightButtonPress?: () => any,
}

export const HeaderNextPageIcon: SFC<Props> = (props) => {
    let name: string = props.rightButtonIcon ? props.rightButtonIcon : "plus";
    let group: string = props.rightButtonIconSet ? props.rightButtonIconSet : "entypo";
    let onPress: () => any = props.onRightButtonPress ? props.onRightButtonPress : () => goToPage(props.navigation, props.rightButtonPageLink);
    return (
        <Icon containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
            size={32}
            color={'white'}
            underlayColor={Colors.LIGHT_BLUE}
            type={group}
            name={name}
            onPress={onPress}
        />
    )
}