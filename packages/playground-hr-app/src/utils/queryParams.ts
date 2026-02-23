import {COMPONENTS_IDS} from "./componentsIds.ts";

export const QUERY_PARAMS = {
    addProfile: 'addProfile',
    analytics: 'analytics',
    editProfile: 'editProfile',
    headerInsights: 'headerInsights',
    profilePopover: 'profilePopover',
    sidebar: 'sidebar',
    signup: 'signup',
    mainContent: 'mainContent',
} as const;

type ComponentKey = keyof typeof QUERY_PARAMS;

export function getComponentId(key: ComponentKey): string {
    const params = new URLSearchParams(window.location.search);
    const overrideId = params.get(QUERY_PARAMS[key]);
    return overrideId || COMPONENTS_IDS[key];
}
