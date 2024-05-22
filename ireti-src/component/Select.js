import { useState } from "react";
import { ScrollView } from "react-native";
import { Portal, RadioButton, TextInput, Dialog, HelperText } from "react-native-paper";

export default ({ label, data, disabled = false, error = false, reference = null, style, value, onChangeText }) => {    
    const [selected, onChangeSelected] = useState(value);    
    const [visibleDialog, setVisibleDialog] = useState(false);
    const hideDialog = () => setVisibleDialog(false);
    const showDialog = () => setVisibleDialog(true);

    const onSelected = (newValue) => {        
        onChangeText(newValue);
        onChangeSelected(newValue);
        hideDialog();
    };

    const inputValue = (value) => {
        if (data.length === 0 || value.length === 0) {            
            return value;
        }
        let item = data.find((item) => (item.value === value));
        return item['label'];
    };

    const selectValue = (value, selected) => {
        /*if (data.length === 0 || value.length === 0) {            
            if(value !== selected){
                onChangeSelected(value);
            }
            return value;
        }*/

        if(value !== selected){
            onChangeSelected(value);
        }

        //let item = data.find((item) => (item.value === selected));
        //return item['value'];
        return selected;
    }

    return (
        <>
            <TextInput
                value={inputValue(value)}                
                mode='outlined'
                placeholder={label}
                label={label}
                readOnly={false}
                editable={false}
                right={<TextInput.Icon icon="chevron-down" onPress={showDialog} />}
                disabled={disabled}
                error={Boolean(error)}
                ref={reference}
                style={style}
            />

            {Boolean(error) && (<HelperText type='error' visible={Boolean(error)} padding='none'>
                {error}
            </HelperText>)}

            <Portal>
                <Dialog visible={visibleDialog} onDismiss={hideDialog} style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Dialog.Title>{label}</Dialog.Title>
                    <Dialog.ScrollArea style={(data.length > 0) ? { height: 200 } : {}}>
                        <ScrollView>
                            <RadioButton.Group onValueChange={onSelected} value={selectValue(value, selected)}>
                                {data.map((item) => (
                                    <RadioButton.Item label={item.label} value={item.value} key={item.value} />
                                ))}
                            </RadioButton.Group>
                        </ScrollView>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>

        </>
    );
}