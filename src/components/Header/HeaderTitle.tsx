import { SFC } from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
    title: string,
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 28,
        textAlign: 'left',
    }
})

export const HeaderTitle: SFC<Props> = (props) => {
    return (
        <Text style={styles.text}>{props.title}
        </Text>
    )
}