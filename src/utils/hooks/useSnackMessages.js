import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

function useSnackMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbarVariant = useCallback(
        (text, { variant, anchorOrigin }) =>
            enqueueSnackbar(text, {
                variant,
                anchorOrigin,
            }),
        [enqueueSnackbar],
    );

    const showSuccessSnackbar = useCallback(
        (text) => {
            showSnackbarVariant(text, {
                variant: 'success',
                anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            });
        },
        [showSnackbarVariant],
    );
    const showErrorSnackbar = useCallback(
        (text) => {
            showSnackbarVariant(text, { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'bottom' } });
        },
        [showSnackbarVariant],
    );
    const showInfoSnackbar = useCallback(
        (text) => {
            showSnackbarVariant(text, { variant: 'info', anchorOrigin: { horizontal: 'right', vertical: 'bottom' } });
        },
        [showSnackbarVariant],
    );

    return {
        showSuccessSnackbar,
        showErrorSnackbar,
        showInfoSnackbar,
    };
}

export default useSnackMessages;
