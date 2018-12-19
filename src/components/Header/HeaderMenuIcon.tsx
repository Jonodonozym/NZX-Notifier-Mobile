import { SFC } from "react";
import { Icon } from "react-native-elements";
import Colors from "../../theme/colors";
import { goTo } from "./PageNavigator";

type Props = {
    title: string,
    navigator?: Navigator,

    previousPage?: string,
    previousPageIcon?: string,
    previousPageIconSet?: string,
}

export const HeaderMenuIcon: SFC<Props> = (props) => {
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
            // @ts-ignore
            onPress={() => goTo(props.navigator, props.previousPage)}
        />
    )
}