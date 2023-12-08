import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
type FieldType = {
  id?: number;
  title?: string;

};
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
interface UserType {
  key: React.Key;
  id: number,
  title: string,
  userid: string,
  body: string
}
let rand: number;
let id: number;
const BlogView: React.FC = () => {
  const [todos, setTodos] = useState<UserType>();
  const { id } = useParams()
  useEffect(() => {
    const fetchUser = async () => {
      rand = 22;
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const result = await res.json();
      setTodos(result);
      console.log(result.title)
    }
    fetchUser()
  }, [])


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