import { NavigationActions, StackActions, Navigator } from 'react-navigation';

export const goTo = (nav: Navigator, page?: string) => {
    nav.dispatch(StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: page })
        ]
    }));
}