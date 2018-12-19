import { SFC } from "react";
import React from "react";
import { Icon } from "react-native-elements";
import Colors from "../../theme/colors";
import { goToPage } from "../../functions/PageNavigator";


type Props = {
    nextPage?: string,
    navigation?: Navigator,

    nextPageIcon?: string,
    nextPageIconSet?: string,
    nextPageOnPress?: () => any,
}

export const HeaderNextPageIcon: SFC<Props> = (props) => {
    let name: string = props.nextPageIcon ? props.nextPageIcon : "plus";
    let group: string = props.nextPageIconSet ? props.nextPageIconSet : "entypo";
    let onPress: () => any = props.nextPageOnPress ? props.nextPageOnPress : () => goToPage(props.navigation, props.nextPage);
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