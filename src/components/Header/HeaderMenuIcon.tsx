import React from "react";
import { SFC } from "react";
import { Icon } from "react-native-elements";
import Colors from "../../theme/colors";
import { goToPage } from "../../functions/PageNavigator";

type Props = {
    navigation?: Navigator,
}

export const HeaderMenuIcon: SFC<Props> = (props) => {
    return (
        <Icon containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
            iconStyle={{ paddingLeft: 8 }}
            size={32}
            color={'white'}
            underlayColor={Colors.LIGHT_BLUE}
            name="menu"
            onPress={() => props.navigation.openDrawer()}
        />
    )
}