import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Colors from "../../theme/colors";
import FilterAddCompany from "./FilterAddCompany";
import FilterAddKeyword from "./FilterAddKeyword";
import FilterCompany from "./FilterCompany";
import FilterKeyword from "./FilterKeyword";
import FilterType from "./FilterType";

const KeywordNav = createStackNavigator({
    Keyword: FilterKeyword,
    KeywordAdd: FilterAddKeyword,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    });

const CompanyNav = createStackNavigator({
    Company: FilterCompany,
    CompanyAdd: FilterAddCompany,
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    });

const BlacklistNav = createBottomTabNavigator({
    Company: CompanyNav,
    Type: FilterType,
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