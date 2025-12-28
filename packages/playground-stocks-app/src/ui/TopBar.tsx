import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {useMemo, useCallback, useState} from "react";
import {Loader} from "./Loader";
import {PortfolioData} from "./Portfolio";
import {ProfilePopover} from "./ProfilePopover";
import {type UserData} from "./App";

interface TopBarProps {
    portfolio: PortfolioData;
    userData: UserData;
    isMobileView?: boolean;
    isCompactView?: boolean;
}

export const TopBar = ({ portfolio, userData, isMobileView, isCompactView }: TopBarProps) => {
    const [showPopover, setShowPopover] = useState(false);

    const topBarData = useMemo(() => ({
        portfolioName: "My Portfolio Demo",
        portfolioSubtitle: "Practice trading, no real money involved",
        cashAvailable: portfolio.cash,
        portfolioValue: portfolio.totalValue,
        dailyChange: portfolio.dailyChange,
        dailyChangePercent: portfolio.dailyChangePercent,
        userInitials: userData.initials,
        userName: userData.name,
        isMobileView
    }), [portfolio.cash, portfolio.totalValue, portfolio.dailyChange, portfolio.dailyChangePercent, userData.name, userData.initials, isMobileView]);

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('TopBar CTA:', action, payload);
        if (action === 'avatar_clicked') {
            setShowPopover(prev => !prev);
        }
    }, []);

    const handleClosePopover = useCallback(() => {
        setShowPopover(false);
    }, []);

    const handleOpenComponent = useCallback((componentId: string, selectedComponent: string) => {
        console.log('Open component:', selectedComponent, 'with ID:', componentId);
        if (componentId && selectedComponent) {
            const url = new URL(window.location.href);
            url.searchParams.set(selectedComponent, componentId);
            window.open(url.toString(), '_blank');
        }
    }, []);

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(window.location.href).catch((err) => {
            console.error('Failed to copy link:', err);
        });
    }, []);

    return (
        <>
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.topBar)}
                data={topBarData}
                on={handleCta as any}
                loader={<Loader/>}
            />
            <ProfilePopover
                isVisible={showPopover}
                userName={userData.name}
                userEmail={userData.email}
                userInitials={userData.initials}
                onClose={handleClosePopover}
                onOpenComponent={handleOpenComponent}
                onShare={handleShare}
                isMobileView={isMobileView}
                isCompactView={isCompactView}
            />
        </>
    );
};
