import { useEffect, useState } from 'react';
import Table from '../component/Table/Table';

export default () => {
    const [data, setData] = useState([]);

    const metadata = [
        { name:'key', title: 'key', show: false, sortDirection: '', numeric: false },
        { name:'name', title: 'Dessert', show: true, sortDirection: 'descending', numeric: false },
        { name:'calories', title: 'Calories', show: true, sortDirection: '', numeric: true },
        { name:'fat', title: 'Fat', show: true, sortDirection: '', numeric: true },
    ];

    useEffect(() => {
        setTimeout(() => {
            setData([
                {
                    key: 1,
                    name: 'Cupcake',
                    calories: 356,
                    fat: 16,
                },
                {
                    key: 2,
                    name: 'Eclair',
                    calories: 262,
                    fat: 16,
                },
                {
                    key: 3,
                    name: 'Frozen yogurt',
                    calories: 159,
                    fat: 6,
                },
                {
                    key: 4,
                    name: 'Gingerbread',
                    calories: 305,
                    fat: 3.7,
                },
            ]);
        }, 3000);
    }, [data]);

    return <Table metadata={metadata} data={data} onRowPress={() => {}}></Table>;
};


