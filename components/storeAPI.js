import axios from 'axios';
import { useEffect, useState } from 'react';
import uuid from 'uuid-random';

const storeUrl = "";
// use json server for persistence of todos
// const storeUrl = "http://localhost:3000/todos/";

export function getTodos() {
    // use state hook to load persistent data only once at startup
    const [data, setData] = useState([]);

    // load data from persistent store only at component mount
    useEffect(() => {
        if (data.length == 0) {
            getData();
        }
    }, [data]);

    const sampleData = () => {
        setData([
            { id: uuid(), text: "Suspend newspaper delivery" },
            { id: uuid(), text: "Suspend mail delivery" },
            { id: uuid(), text: "Mow lawn" },
            { id: uuid(), text: "Cancel trash pickup" },
            { id: uuid(), text: "Recharge batteries" },
            { id: uuid(), text: "Set automatic timers for lights" },
            { id: uuid(), text: "Organize travel documents" },
            { id: uuid(), text: "Confirm reservations" },
            { id: uuid(), text: "Check destination weather forecast" },
        ]);
    }

    const getData = async () => {
        if (storeUrl) {
            console.log(`fetch data from ${storeUrl}`);
            const resp = await axios.get(storeUrl);
            console.log(`fetched ${resp.data.length} tasks`);
            setData(resp.data);
        } else {
            sampleData();
        }
    }
    return data;
}

export function storeAPI(action) {

    const deleteData = async (todo) => {
        console.log(`delete "${todo.text}" from ${storeUrl}`);
        await axios.delete(storeUrl + todo.id);
    }

    const addData = async (todo) => {
        console.log(`add "${todo.text}" to ${storeUrl}`);
        await axios.post(storeUrl, todo);
    }

    const editData = async (todo) => {
        console.log(`update to "${todo.text}" in ${storeUrl}`);
        await axios.patch(storeUrl + todo.id, { text: todo.text });
    }

    if (!storeUrl) {
        return
    }

    switch (action.type) {
        case 'delete':
            deleteData(action.payload);
            return
        case 'add':
            addData(action.payload);
            return
        case 'edit':
            editData(action.payload);
            return
        default:
            console.log(`store action ${action.type} is not implemented`);
    }
}