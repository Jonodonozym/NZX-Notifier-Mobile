import * as React from "react";
import { SFC } from "react";
import { Icon } from "react-native-elements";
import Colors from "../../theme/colors";
import { goToPage } from "../../functions/PageNavigator";

type Props = {
    navigation?: Navigator,

    previousPage?: string,
    previousPageIcon?: string,
    previousPageIconSet?: string
}

export const HeaderBackArrow: SFC<Props> = (props) => {
    let name: string = props.previousPageIcon ? props.previousPageIcon : "back";
    let group: string = props.previousPageIconSet ? props.previousPageIconSet : "entypo";

    return (
        <Icon containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
            iconStyle={{ paddingLeft: 8, paddingRight: 8 }}
            size={32}
            color={'white'}
            underlayColor={Colors.LIGHT_BLUE}
            type={group}
            name={name}
            onPress={() => goToPage(props.navigation, props.previousPage)}
        />
    )
}