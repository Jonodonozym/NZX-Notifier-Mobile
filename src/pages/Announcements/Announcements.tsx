import * as React from "react";
import { Component } from "react";
import {
    FlatList,
    Linking,
    ListRenderItem,
    NativeScrollEvent,
    NetInfo,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import DialogManager, { DialogContent, ScaleAnimation } from 'react-native-dialog-component';
import { Icon, SearchBar } from "react-native-elements";
import Header from "../../components/Header/Header";
import { Announcement } from "../../entity/Announcement";
import AnnouncementsProvider from "../../services/announcements.provider";
import AppConfig from "../../services/appConfig";
import Colors from "../../theme/colors";
import AnnouncementRepo from "../../services/announcement.repo";

export default class AnnouncementsPage extends Component {
    private isRefreshing: boolean = false

    private search: string = ''
    private showSearch: boolean = false

    constructor(props: Readonly<{}>) {
        super(props)
        console.log(AnnouncementRepo.filteredAnnouncements)
        if (AnnouncementRepo.filteredAnnouncements.length == 0)
            AppConfig.reload().then(() => this.update()).catch((e)=>console.log(e))
    }

    public update() {
        if (!NetInfo.isConnected)
            AnnouncementRepo.isConnected = false
        else if (this.search == '')
            AnnouncementRepo.setToFirstPage().then(()=>this.displayAnnouncements())
        else
            AnnouncementRepo.search(this.search).then(()=>this.displayAnnouncements())
        this.forceUpdate()
    }

    public displayAnnouncements() {
        this.isRefreshing = false
        this.forceUpdate()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title='Announcements'
                    onRightButtonPress={() => {
                        this.showSearch = !this.showSearch
                        if (!this.showSearch)
                            this.update()
                        else
                            this.forceUpdate()
                    }}
                    rightButtonIcon='search'
                    rightButtonIconSet='feather'
                    {...this.props} />
                {this.renderMainContent()}
                {this.renderSearchbar()}
            </View>
        )
    }

    private renderMainContent() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.isRefreshing}
                        onRefresh={() => {
                            this.isRefreshing = true
                            AnnouncementRepo.fetchNew().then(()=>this.displayAnnouncements())
                        }}
                    />
                }
                onScroll={synthEvent => {
                    if (this.isCloseToBottom(synthEvent!.nativeEvent))
                        this.fetchMore()
                }}
            >
                {this.renderMessageOrList()}
            </ScrollView>
        )
    }

    isCloseToBottom = (event: NativeScrollEvent) => {
        const paddingToBottom = 640
        return event.layoutMeasurement.height + event.contentOffset.y >=
            event.contentSize.height - paddingToBottom
    }

    private fetchMore() {
        if (AnnouncementRepo.isFetching || this.isRefreshing)
            return

        this.isRefreshing = true
        AnnouncementRepo.fetchNextPage().then(()=>this.displayAnnouncements())
    }

    private renderMessageOrList() {
        if (!AnnouncementRepo.isConnected)
            return (<Text style={styles.noAnnouncements}>Failed to connect to the server{"\n"}Please check your internet
                connection{"\n"}or try again later</Text>)
        if (AnnouncementRepo.isFetching)
            return (<Text style={styles.noAnnouncements}>Fetching announcements{"\n"}Please wait...</Text>)
        if (AnnouncementRepo.filteredAnnouncements.length == 0)
            return (<Text style={styles.noAnnouncements}>No announcements found</Text>)
        return (
            <FlatList
                data={AnnouncementRepo.filteredAnnouncements}
                renderItem={this.renderItem}
            />)
    }

    private renderItem: ListRenderItem<Announcement> = ({ item }) => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container}
                onLongPress={(event) => {
                    this.showContextMenu(item)
                }}
                onPress={(event) => {
                    console.log(item)
                    if (item.pdfUrl != undefined && item.pdfUrl != '')
                        this.openURL(item.pdfUrl)
                    else
                        this.openURL(item.url)
                }}>
                <Text style={[styles.companyID, { minWidth: 96, maxWidth: 96 }]}>{item.company.id}</Text>
                <View style={[styles.rightContainer, { flex: 6 }]}>
                    <View style={styles.topLine}>
                        <Text style={styles.announcementType}>{item.type}</Text>
                        <Text style={styles.announcementTime}>{this.formatTime(item.time)}</Text>
                    </View>
                    <Text style={styles.announcementTitle}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            <Icon type='feather' name='more-vertical' size={48} containerStyle={{ minWidth: 32, maxWidth: 32 }}
                onPress={() => {
                    this.showContextMenu(item)
                }} />
        </View>
    )

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
            console.log('callback - show')
        })
    }

    private popupContent(announcement: Announcement) {
        return (
            <View style={{ marginLeft: 8, marginRight: 8, flexDirection: "column" }}>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.openURL(announcement.pdfUrl)}>
                    <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Open PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.openURL(announcement.url)}>
                    <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Open NZX Site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.more(announcement)}>
                    <Text style={styles.optionText}>More from {announcement.company.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.blacklistCompany(announcement)}>
                    <Text style={styles.optionText}>Blacklist {announcement.company.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionWrapper} onPress={() => this.blacklistType(announcement)}>
                    <Text style={styles.optionText}>Blacklist {announcement.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    private openURL(url: string) {
        Linking.canOpenURL(url).then((supported: boolean) => {
            if (supported)
                Linking.openURL(url)
        })
    }

    private more(a: Announcement) {
        AnnouncementsProvider.search(a.company.id).then((ann) => {
            AnnouncementRepo.setAnnouncements(ann)
            this.forceUpdate()
        })
    }

    private blacklistCompany(a: Announcement) {
        AppConfig.blacklistAddCompany(a.company).then(() => {
            AnnouncementRepo.updateFilter()
            this.forceUpdate()
        })
    }

    private blacklistType(a: Announcement) {
        AppConfig.blacklistAddType(a.type).then(() => {
            AnnouncementRepo.updateFilter()
            this.forceUpdate()
        })
    }

    formatTime = function (time: number): string {
        let date: Date = new Date(time)
        let now: Date = new Date()

        if (now.toDateString() != date.toDateString())
            return date.getDate() + " / " + (date.getMonth()+1) + " / " + date.getFullYear()

        let hours = date.getHours() % 12
        if (hours == 0)
            hours = 12
        return hours + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + " " + (date.getHours() >= 12 ? "am" : "pm")
    }

    private renderSearchbar() {
        if (!this.showSearch)
            return null
        return (
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <SearchBar placeholder='Search company, type or title'
                    containerStyle={{ backgroundColor: Colors.LIGHT_BLUE }}
                    inputStyle={{ backgroundColor: 'white', padding: 0, paddingTop: 0, paddingBottom: 0 }}
                    clearIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    autoFocus={true}
                    onChangeText={(input: string) => {
                        this.search = input
                        this.update()
                    }}
                    onClearText={() => {
                        this.showSearch = false
                        this.search = ''
                        this.update()
                    }} />
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
})