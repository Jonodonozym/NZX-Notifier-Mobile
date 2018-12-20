// @ts-ignore
import {StackNavigator, DrawerNavigator, createDrawerNavigator} from 'react-navigation';
import AnnouncementsPage from "./src/pages/Announcements/Announcements";
import DrawerContent from "./src/components/DrawerContent"
import {MenuProvider} from 'react-native-popup-menu';
import React from "react";
import Blacklist from "./src/pages/Blacklist/Blacklist";
import AlertSettings from "./src/pages/Alert Settings/AlertSettings";

console.disableYellowBox = true;

const AppDrawerNavigator = createDrawerNavigator({
    Announcements: AnnouncementsPage,
    Blacklist: Blacklist,
    "Alert Settings": AlertSettings
}, {
    contentComponent: DrawerContent
});

const App = () => (
    <MenuProvider>
        <AppDrawerNavigator/>
    </MenuProvider>
);

export default App;
