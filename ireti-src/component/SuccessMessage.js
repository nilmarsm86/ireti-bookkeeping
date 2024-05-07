export default ({label, visible = false}) => {
    const [showSnackBar, setShowSnackar] = useState(visible);
    const onClose = () => setShowSnackar(false);
    
    return <Snackbar
        visible={visible}
        onDismiss={onClose}
        duration={1000}
        action={{
            label: 'Close',
            onPress: onClose,
        }}
    >
        {label}
    </Snackbar>
};