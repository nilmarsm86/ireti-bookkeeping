import { useState } from 'react';
import Select from '../component/Select';
import { Text } from 'react-native-paper';
import {
    TabsProvider,
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';
import { View } from 'react-native';

export default () => {
    const [tab, onChangeTab] = useState(0);
    const [selected, onChangeSelected] = useState("");
    const data = [
        { label: '-Seleccione un pais-', value: '' },
        { label: 'Uno', value: '1' },
        { label: 'Dos', value: '2' },
        { label: 'Tres', value: '3' },
        { label: 'Cuatro', value: '4' },
        { label: 'Cinco', value: '5' },
        { label: 'Seis', value: '6' },
        { label: 'Siete', value: '7' },
        { label: 'Ocho', value: '8' },
        { label: 'Nueve', value: '9' },
        { label: 'Diez', value: '10' },
    ];

    return (
        <>
            <Select label='País' selected={selected} onChangeSelected={onChangeSelected} data={data} />
            <Text>Se a seleccionado la opcion: {selected}</Text>

            <TabsProvider defaultIndex={tab} onChangeIndex={onChangeTab}>
                <Tabs
                // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
                // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                // iconPosition // leading, top | default=leading
                // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
                // dark={false} // works the same as AppBar in react-native-paper
                // theme={} // works the same as AppBar in react-native-paper
                // mode="scrollable" // fixed, scrollable | default=fixed
                // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
                // disableSwipe={false} // (de fault=false) disable swipe to left/right gestures
                >
                    <TabScreen label="Explore" icon="compass" badge={0}>                        
                        <Text>Contenido</Text>
                    </TabScreen>

                    <TabScreen label="Flights" icon="airplane" disabled>
                        <View style={{ backgroundColor: 'black', flex: 1 }} />
                    </TabScreen>

                    <TabScreen
                        label="Trips"
                        icon="bag-suitcase"
                        badge={0}
                    // optional props
                    // badge={true} // only show indicator
                    // badge="text"
                    // badge={1}
                    // onPressIn={() => {
                    //   console.log('onPressIn explore');
                    // }}
                    // onPress={() => {
                    //   console.log('onPress explore');
                    // }}
                    >
                        <View style={{ backgroundColor: 'red', flex: 1 }} />
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        </>
    );
};