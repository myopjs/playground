import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {useMemo, useCallback} from "react";

interface ConfirmationSellModalProps {
    stockSymbol: string;
    stockName: string;
    pricePerShare: number;
    quantity: number;
    onConfirm: (payload: { stockSymbol: string; quantity: number; pricePerShare: number; totalProceeds: number }) => void;
    onCancel: () => void;
    isMobileView?: boolean;
}

export const ConfirmationSellModal = ({
    stockSymbol,
    stockName,
    pricePerShare,
    quantity,
    onConfirm,
    onCancel,
    isMobileView
}: ConfirmationSellModalProps) => {

    const modalData = useMemo(() => ({
        stockSymbol,
        stockName,
        pricePerShare,
        quantity,
        isMobileView
    }), [stockSymbol, stockName, pricePerShare, quantity, isMobileView]);

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('ConfirmationSellModal CTA:', action, payload);
        if (action === 'close-clicked' || action === 'cancel-clicked') {
            onCancel();
        } else if (action === 'confirm-sale-clicked') {
            onConfirm(payload);
        }
    }, [onConfirm, onCancel]);

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
                <MyopComponent
                    componentId={getComponentId(QUERY_PARAMS.confirmationSellModal)}
                    data={modalData}
                    on={handleCta}
                />
            </div>
        </div>
    );
};
