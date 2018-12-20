import * as React from "react";
import { SFC } from "react";
import { Icon } from "react-native-elements";
import { goToPage } from "../../functions/PageNavigator";
import Colors from "../../theme/colors";

type Props = {
    navigation?: Navigator,

    leftButtonPageLink?: string,
    leftButtonIcon?: string,
    leftButtonIconSet?: string
}

export const HeaderLeftButton: SFC<Props> = (props) => {
    let name: string = props.leftButtonIcon ? props.leftButtonIcon : "back";
    let group: string = props.leftButtonIconSet ? props.leftButtonIconSet : "entypo";

    return (
        <Icon containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
            iconStyle={{ paddingLeft: 8, paddingRight: 8 }}
            size={32}
            color={'white'}
            underlayColor={Colors.LIGHT_BLUE}
            type={group}
            name={name}
            onPress={() => goToPage(props.navigation, props.leftButtonPageLink!)}
        />
    )
}