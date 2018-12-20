import React, { SFC } from "react";
import { Icon } from "react-native-elements";
import Colors from "../../theme/colors";

type Props = {
    navigation?: Navigator,
}

export const HeaderMenuButton: SFC<Props> = (props) => {
    return (
        <Icon containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
            iconStyle={{ paddingLeft: 8 }}
            size={32}
            color={'white'}
            underlayColor={Colors.LIGHT_BLUE}
            name="menu"
            //@ts-ignore
            onPress={() => props.navigation!.openDrawer()}
        />
    )
}