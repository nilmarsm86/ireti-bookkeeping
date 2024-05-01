import { HelperText, TextInput } from "react-native-paper";

export default ({ label, style, icon, errorMsg = '', value, onChangeText, error }) => (
    <>
        <TextInput
            label={label}
            mode='outlined'
            style={style}
            left={<TextInput.Icon icon={icon} />}
            error={error}
            value={value}
            onChangeText={onChangeText}
        />
        {error && (<HelperText type='error' visible={error} padding='none'>
            {errorMsg}
        </HelperText>)}
    </>
);