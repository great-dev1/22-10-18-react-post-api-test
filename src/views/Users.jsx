import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Typography } from 'antd';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const columns = [{
        title: "No",
        dataIndex: "id",
        key: "id",
        render: id => id
    }, {
        title: "Name",
        dataIndex: "name",
        key: "name"
    }, {
        title: "Username",
        dataIndex: "username",
        key: "username"
    }, {
        title: "Email",
        dataIndex: "email",
        key: "email"
    }, {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: address => address.street + ", " + address.city
    }, {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
    }]

    const getUsers = async () => {
        let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`); 
        let users = data.map(user => {
            user.key = user.id; 
            return user;
        });
        setUsers(users);
    }

    const goToPosts = (ev, record) => {
        navigate("/posts/" + record.id);
    }

    return (
        <div style={{ padding: 20 }}>
            <Typography.Title>Users Table</Typography.Title>
            <Table columns={columns} dataSource={users} onRow={(record, rowIndex) => {
                return { 
                    onClick: ev => goToPosts(ev, record) 
                }
            }}/>
        </div>
    )
}

export default Users;