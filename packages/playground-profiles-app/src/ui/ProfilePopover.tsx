import {useState, useCallback} from "react";
import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {type UserData} from "../data/mockUsers.ts";
import {Toast} from "./Toast.tsx";

type ProfilePopoverProps = {
    userData: UserData;
    onClose: () => void;
    onLogout: () => void;
    isMobileView: boolean;
}

export const ProfilePopover = ({ userData, onClose, onLogout, isMobileView }: ProfilePopoverProps) => {
    const [toastOpen, setToastOpen] = useState(false);

    const closeToast = useCallback(() => setToastOpen(false), []);

    const handleCta = (actionId: string, payload?: { componentId?: string; selectedComponent?: string }) => {
        if (actionId === 'logout_clicked') {
            onLogout();
        }
        if (actionId === 'click_outside' || actionId === 'escape_pressed') {
            onClose();
        }
        if (actionId === 'open_clicked' && payload?.componentId && payload?.selectedComponent) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set(payload.selectedComponent, payload.componentId);
            window.open(currentUrl.toString(), '_blank');
        }
    };

    return <>
        <div className="profile-popover-container">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.profilePopover)}
                data={{ userData, isMobileView }}
                on={handleCta as any}
            />
        </div>
        <Toast
            message="Settings feature coming soon!"
            isOpen={toastOpen}
            onClose={closeToast}
        />
    </>
}
