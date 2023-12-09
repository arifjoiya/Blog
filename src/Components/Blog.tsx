import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'
import { Space, Table } from 'antd';

const { Column } = Table;

interface UserType {
  key: React.Key;
  id: number,
  title: string,
  userid: string,
  body: string
}
let rand: number;


const Blog: React.FC = () => {
  const [todos, setTodos] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      rand = Math.round(Math.random() * 10);
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`${base_url}/users/${rand}/posts`);
      const result = await res.json();
      setTodos(result);
      console.log(result)
    }
    fetchUser()
  }, [])

  return (
    <>
      <h2>Blog</h2>
      <Table dataSource={todos}>

        <Column title="ID" dataIndex="id" key="id" />
        <Column title="TITLE" dataIndex="title" key="title" />
        <Column
          title="Action"
          key="action"
          render={() => (
            <Space size="middle">
              <Link to='/post/22' >Edit</Link>
              Delete
            </Space>
          )}
        />
      </Table >
    </>
  );
};

export default Blog;