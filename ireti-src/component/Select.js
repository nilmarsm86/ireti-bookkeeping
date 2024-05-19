import { useState } from "react";
import { ScrollView } from "react-native";
import { Portal, RadioButton, TextInput, Dialog } from "react-native-paper";

export default ({ label, selected, onChangeSelected, data, disabled=false }) => {    
    const [value, setValue] = useState('');

    const [visibleDialog, setVisibleDialog] = useState(false);
    const hideDialog = () => setVisibleDialog(false);
    const showDialog = () => setVisibleDialog(true);

    const onSelected = (newValue) => {
        setValue(newValue)
        onChangeSelected(newValue);
        hideDialog();
    };

    return (
        <>
            <TextInput                
                value={selected}
                onChangeText={selected => onChangeSelected(selected)}
                mode='outlined'
                placeholder={label}
                readOnly={false}
                editable={false}
                right={<TextInput.Icon icon="chevron-down" onPress={showDialog} />}
                disabled={disabled}                  
            />

            <Portal>
                <Dialog visible={visibleDialog} onDismiss={hideDialog} style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Dialog.Title>{label}</Dialog.Title>
                    <Dialog.ScrollArea style={(data.length > 0) ? { height: 200 } : {}}>
                        <ScrollView>
                            <RadioButton.Group onValueChange={onSelected} value={value}>
                                {data.map((item) => (
                                    <RadioButton.Item label={item.label} value={item.value} key={item.value}/>
                                ))}
                            </RadioButton.Group>
                        </ScrollView>
                    </Dialog.ScrollArea>                    
                </Dialog>
            </Portal>

        </>
    );
}