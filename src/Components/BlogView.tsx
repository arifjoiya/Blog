import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  id?: string;
  title?: string;

};

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
  const [form] = useForm()

  useEffect(() => {
    const fetchUser = async () => {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`${base_url}/posts/${id}`);
      const result = await res.json();
      setTodos(result);
      form.setFieldsValue({ id: result.id, title: result.title });
      console.log('blogview')
    }
    fetchUser()
  }, [id])


  return (
    <>

      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Id"
          name="id"
          rules={[{ required: true, message: 'Please input Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input Title!' }]}
        >
          <Input />
        </Form.Item>




        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>



    </>
  )
}
export default BlogView;