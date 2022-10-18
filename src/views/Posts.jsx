import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography } from 'antd';

const Posts = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUserById();
        getPostsByUserId();
    }, []);

    const getUserById = async () => {
        let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`);
        setUser(data);
    }
    const getPostsByUserId = async () => {
        let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts?userId=${userId}`);
        let posts = data.map(post => {
            post.key = post.id;
            return post;
        });
        setPosts(posts);
    }
    return (
        <div style={{ padding: 20 }}>
            {
                user && user.name && 
                <Typography.Title>{user.name + "'s Posts"}</Typography.Title>
            }
            {
                posts.map((post, idx) => {
                    return (
                        <Card title={post.title} key={idx} style={{ marginBottom: 15 }}>
                            <div>{post.body}</div>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default Posts;