import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useParams } from 'react-router-dom';


interface UserType {
  key: React.Key;
  id: number,
  title: string,
  userid: string,
  body: string
}



const BlogView: React.FC = () => {
  const [todos, setTodos] = useState<UserType>();
  const { id } = useParams()
  useEffect(() => {
    const fetchUser = async () => {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`${base_url}/posts/${id}`);
      const result = await res.json();
      setTodos(result);

    }
    fetchUser()
  }, [id])


  return (
    <>

      <Input
        type="text"
        value={todos?.id}

        style={{ width: 200 }}
      />
      <Input
        type="text"
        value={todos?.title}
        style={{ width: 300 }}
      />
      <Button type="primary" htmlType="submit">
        Update
      </Button>



    </>
  )
}
export default BlogView;