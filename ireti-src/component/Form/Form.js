import { StyleSheet, View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";

export default ({ children, title, buttons }) => (
    <Card style={{ padding: 10 }}>
        <Card.Title title={title}/>
        <View style={styles.formContainer}>
            <View style={[styles.container, styles.fieldsContainer]}>
                {children}
            </View>

            <Divider />

            <View style={[styles.container, styles.buttonsContainer]}>
                {Object.entries(buttons).map(([key, value]) => (
                    <Button
                        key={key}
                        icon={value.icon}
                        mode={key === 'delete' ? 'contained' : 'outlined'}
                        onPress={value.press}
                        buttonColor={key === 'delete' ? 'red' : ''}
                    >
                        {value.label}
                    </Button>
                ))}
            </View>
        </View>
    </Card>
);

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'column',
        rowGap: 10,
        justifyContent: 'space-around'
    },
    container: {
        gap: 10,
        flex: 'auto',
        alignItems: 'stretch',
        flexWrap: 'wrap',
    },
    fieldsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});