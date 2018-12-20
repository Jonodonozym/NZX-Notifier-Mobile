import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Colors from "../../theme/colors";
import BlacklistAddCompany from "./BlacklistAddCompany";
import BlacklistAddKeyword from "./BlacklistAddKeyword";
import BlacklistCompany from "./BlacklistCompany";
import BlacklistKeyword from "./BlacklistKeyword";
import BlacklistType from "./BlacklistType";

const KeywordNav = createStackNavigator({
    Keyword: BlacklistKeyword,
    KeywordAdd: BlacklistAddKeyword,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    });

const CompanyNav = createStackNavigator({
    Company: BlacklistCompany,
    CompanyAdd: BlacklistAddCompany,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    });

const BlacklistNav = createBottomTabNavigator({
    Company: CompanyNav,
    Type: BlacklistType,
    Keyword: KeywordNav
}, {
        tabBarOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: Colors.BLUE,
            inactiveTintColor: 'white',
            inactiveBackgroundColor: Colors.LIGHT_BLUE,
            tabStyle: {
                alignContent: 'center',
                alignItems: 'center'
            },
            labelStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'center',
                position: 'relative',
                marginBottom: 12
            }
        }
    });

export default BlacklistNav;