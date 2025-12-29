import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {Loader} from "./Loader";

interface BottomNavProps {
    onTabChanged?: (tabId: string, label: string) => void;
    activeTab?: string;
}

export function BottomNav({onTabChanged, activeTab = 'home'}: BottomNavProps) {
    const handleCta = (action: string, payload: {tabId: string; label: string}) => {
        if (action === 'tab-changed' && onTabChanged) {
            onTabChanged(payload.tabId, payload.label);
        }
    };

    return (
        <div className="bottom-nav-container">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.bottomNav)}
                loader={<Loader/>}
                data={{
                    tabs: [
                        {id: 'home', label: 'Home', icon: 'home'},
                        {id: 'stocks', label: 'Stocks', icon: 'trendingUp'},
                        {id: 'portfolio', label: 'Portfolio', icon: 'briefcase'}
                    ],
                    activeTabId: activeTab
                }}
                on={handleCta}
            />
        </div>
    );
}