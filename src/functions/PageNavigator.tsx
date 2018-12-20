import { NavigationActions, Navigator, StackActions } from 'react-navigation';

export const goToPage = (nav: Navigator, page: string) => {
    nav.dispatch(StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: page! })
        ]
    }));
}