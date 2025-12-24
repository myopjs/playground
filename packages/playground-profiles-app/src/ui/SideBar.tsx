import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {type UserData} from "../data/mockUsers.ts";
import {ProfilePopover} from "./ProfilePopover.tsx";
import {useState, useEffect} from "react";

type SideBarProps = {
    userData: UserData;
    activeNavItem: string;
    onLogout: () => void;
    onNavigate: (navId: string) => void;
}

export const SideBar = ({ userData, activeNavItem, onLogout, onNavigate }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        }
    }, [isOpen]);

    const closePopover = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 200);
    };

    const sidebarUserData = {
        name: userData.name,
        role: 'Settings',
        initials: userData.initials,
        profileImage: userData.profileImage
    };

    const handleCta = (actionId: string, payload: any) => {
        console.log('SideBar CTA:', actionId, payload);
        if (actionId === 'profile_clicked') {
            setIsOpen(true);
        }
        if (actionId === 'nav_clicked' && payload?.navId) {
            onNavigate(payload.navId);
        }
    };

    return <>
        <MyopComponent
            componentId={getComponentId(QUERY_PARAMS.sidebar)}
            data={{ userData: sidebarUserData, activeNavItem }}
            on={handleCta as any}
        />
        {isOpen && (
            <>
                <div
                    className={`sidebar-overlay${isVisible ? ' visible' : ''}`}
                    onClick={closePopover}
                />
                <div className={`sidebar-popover${isVisible ? ' visible' : ''}`}>
                    <ProfilePopover
                        userData={userData}
                        onClose={closePopover}
                        onLogout={onLogout}
                    />
                </div>
            </>
        )}
    </>
}
