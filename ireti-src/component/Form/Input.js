import { HelperText, TextInput } from "react-native-paper";

export default ({ label, style, icon, value, onChangeText, error, reference=null }) => (
    <>
        <TextInput
            label={label}
            mode='outlined'
            style={style}
            left={<TextInput.Icon icon={icon} />}
            error={Boolean(error)}
            value={value}
            onChangeText={onChangeText} 
            ref={reference}
            name={label}
        />
        {Boolean(error) && (<HelperText type='error' visible={Boolean(error)} padding='none'>
            {error}
        </HelperText>)}
    </>
);