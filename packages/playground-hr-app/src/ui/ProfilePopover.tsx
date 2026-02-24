import {useState, useCallback} from "react";
import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
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

    const handleCta = (action: string): void => {
        if (action === 'logout-clicked') {
            onLogout();
        }
        if (action === 'click-outside' || action === 'escape-pressed' || action === 'drag-closed') {
            onClose();
        }
    };

    return <>
        <div className="profile-popover-container">
            <MyopComponent
                componentId={COMPONENTS_IDS.profilePopover}
                data={{ userData, isMobileView }}
                on={handleCta}
            />
        </div>
        <Toast
            message="Settings feature coming soon!"
            isOpen={toastOpen}
            onClose={closeToast}
        />
    </>
}
