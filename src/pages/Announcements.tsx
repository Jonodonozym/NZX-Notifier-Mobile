import * as React from "react";
import {Component} from "react";
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    ListRenderItem,
    Linking,
    RefreshControl,
    ScrollView,
    TouchableOpacity
} from "react-native";
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {Announcement} from "../entity/Announcement";
import AuthService from "../services/auth.service";
import UserConfigProvider from "../services/user-config.provider";
import AnnouncementsProvider from "../services/announcements.provider";
import {Icon, SearchBar} from "react-native-elements";
import Colors from "../theme/colors";
import Header from "../components/Header";

export default class AnnouncementsPage extends Component {
    private announcements: Array<Announcement> = Array<Announcement>();
    private isFetching: boolean = true;
    private isConnected: boolean = true;
    private isRefreshing: boolean = false;

    private search: string = '';
    private showSearch: boolean = false;

    constructor(props: Readonly<{}>) {
        super(props);
        AuthService.isRegistered().then((registered) => {
            if (!registered)
                AuthService.register().then(() => this.update());
            else {
                UserConfigProvider.refresh();
                this.update();
            }
        })
    }

    public update() {
        this.forceUpdate();
        if (this.search == '')
            this.checkForErrors(AnnouncementsProvider.getRecent(0).then((ann) => {
                this.setAnnouncements(ann);
            }));
        else
            this.checkForErrors(AnnouncementsProvider.search(this.search).then((ann) => {
                this.setAnnouncements(ann);
            }))
    }

    private checkForErrors(p: Promise<any>) {
        p.catch((e) => {
            this.isFetching = false;
            this.isConnected = false;
            this.isRefreshing = false;
            this.announcements = [];
            this.forceUpdate()
        })
    }

    public setAnnouncements(announcements: Array<Announcement> | null) {
        this.isFetching = false;
        this.isConnected = true;
        this.isRefreshing = false;
        if (announcements == null)
            this.announcements = [];
        else
            this.announcements = announcements;
        this.forceUpdate()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title='Announcements'
                        onPress={() => {
                            this.showSearch = !this.showSearch;
                            if (!this.showSearch)
                                this.update();
                            else
                                this.forceUpdate()
                        }}
                        nextPageIconSet='feather'
                        nextPageIcon='search'
                        {...this.props}/>
                {this.renderMainContent()}
                {this.renderSearchbar()}
            </View>
        );
    }

    private renderMainContent() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.isRefreshing}
                    onRefresh={() => {
                        this.isRefreshing = true;
                        this.update()
                    }}
                />
            }>
                {this.renderMessageOrList()}
            </ScrollView>
        )
    }

    private renderMessageOrList() {
        if (this.isFetching)
            return (<Text style={styles.noAnnouncements}>Fetching announcements{"\n"}Please wait...</Text>);
        if (!this.isConnected)
            return (<Text style={styles.noAnnouncements}>Failed to connect to the server{"\n"}Please check your internet
                connection{"\n"}or try again later</Text>);
        if (this.announcements.length == 0)
            return (<Text style={styles.noAnnouncements}>No announcements found</Text>);
        return (
            <FlatList
                data={this.announcements}
                renderItem={this.renderItem}
            />);
    }

    private renderItem: ListRenderItem<Announcement> = ({item}) => (
        <TouchableOpacity style={styles.container} onLongPress={(event) => {
            this.showContextMenu(item)
        }} onPress={(event) => {
            if (item.pdfurl != undefined && item.pdfurl != '')
                this.openURL(item.pdfurl)
            else
                this.openURL(item.url)
        }}>
            <Text style={[styles.companyID, {minWidth: 96, maxWidth: 96}]}>{item.company.id}</Text>
            <View style={[styles.rightContainer, {flex: 6}]}>
                <View style={styles.topLine}>
                    <Text style={styles.announcementType}>{item.type}</Text>
                    <Text style={styles.announcementTime}>{this.formatTime(item.time)}</Text>
                </View>
                <Text style={styles.announcementTitle}>{item.title}</Text>
            </View>
            <Icon type='feather' name='more-vertical' size={48} containerStyle={{minWidth: 32, maxWidth: 32}}/>
        </TouchableOpacity>
    );

    private showContextMenu(announcement: Announcement) {
        DialogManager.show({
            animationDuration: 300,
            width: '75%',
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <DialogContent>
                    {this.popupContent(announcement)}
                </DialogContent>
            ),
        }, () => {
            console.log('callback - show');
        });
    }

    private popupContent(announcement: Announcement) {
        return (
            <View style={{marginLeft: 8, marginRight: 8, flexDirection: "column"}}>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.openURL(announcement.pdfurl)}>
                    <Text style={[styles.optionText, {fontWeight: 'bold'}]}>Open PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.openURL(announcement.url)}>
                    <Text style={[styles.optionText, {fontWeight: 'bold'}]}>Open NZX Site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.blacklistType(announcement)}>
                    <Text style={styles.optionText}>More from {announcement.company.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.blacklistType(announcement)}>
                    <Text style={styles.optionText}>Blacklist {announcement.company.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.blacklistType(announcement)}>
                    <Text style={styles.optionText}>Blacklist {announcement.type}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    private openURL(url: string) {
        Linking.canOpenURL(url).then(supported => {
            if (supported)
                Linking.openURL(url)
        })
    }

    private more(a: Announcement) {
        AnnouncementsProvider.search(a.company.id).then((ann) => {
            this.setAnnouncements(ann);
        })
    }

    private blacklistType(a: Announcement) {
        UserConfigProvider.blacklistAddType(a.type).then(() =>
            this.update()
        )
    }

    private blacklistCompany(a: Announcement) {
        UserConfigProvider.blacklistAddCompany(a.company).then(() =>
            this.update()
        )
    }

    formatTime = function (time: number): string {
        let date: Date = new Date(time);

        let offset = new Date().getTime() - date.getTime();

        if (offset > (1000 * 3600 * 24))
            return date.getDate() + " / " + date.getMonth() + " / " + date.getFullYear();

        let hours = date.getHours() % 12;
        if (hours == 0)
            hours = 12;
        return hours + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + " " + (date.getHours() >= 12 ? "am" : "pm")
    };

    private renderSearchbar() {
        if (!this.showSearch)
            return null;
        return (
            <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <SearchBar placeholder='Search company, type or title'
                           containerStyle={{backgroundColor: Colors.LIGHT_BLUE}}
                           inputStyle={{backgroundColor: 'white', padding: 0, paddingTop: 0, paddingBottom: 0}}
                           clearIcon={{type: 'font-awesome', name: 'chevron-left'}}
                           autoFocus={true}
                           onChangeText={(input: string) => {
                               this.search = input;
                               this.update();
                           }}
                           onClearText={() => {
                               this.showSearch = false;
                               this.search = '';
                               this.update()
                           }}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        height: 72,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    companyID: {
        flex: 0.8,
        fontWeight: 'bold',
        fontSize: 32,
        color: 'black',
        alignItems: 'center',
        textAlign: 'center'
    },
    announcementType: {
        flex: 1.5,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    announcementTime: {
        flex: 1.5,
        fontSize: 14,
    },
    announcementTitle: {
        color: 'black',
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    optionWrapper: {
        height: 48,
        justifyContent: 'center',
    },
    optionText: {
        color: 'black',
        fontSize: 24,
    },
    noAnnouncements: {
        textAlign: 'center',
        paddingTop: 48,
        fontSize: 18,
        lineHeight: 28
    }
});