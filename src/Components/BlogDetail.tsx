import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  id?: string;
  title?: string;

};

const BlogDetail: React.FC = () => {

  const [msg, setMsg] = useState<string>('');
  const [blogId, setBlogId] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const { id } = useParams()
  const [form] = useForm()

  useEffect(() => {
    const fetchUser = async () => {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`${base_url}/posts/${id}`);
      const result = await res.json();
      setBlogId(result.id)
      setBlog(result.title)
      console.log('blogview')
    }
    fetchUser()
  }, [id])

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const dataToUpdate = {
      id: values.id,
      title: values.title,

    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
    };

    const updateUser = async () => {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`${base_url}/posts/${values.id}`, options);
      const result = await res.json();

      console.log('updated:', result);
      setMsg('Post Successfully updated')
    }
    updateUser()
  };

  return (
    <>
      <h2 style={{ textAlign: 'left' }}>Blog Detail</h2>
      <h3 style={{ textAlign: 'center', color: 'green' }}>{msg}</h3>
      <div><h3>Id : {blogId}</h3></div>
      <div><h3>Title : {blog}</h3></div>
    </>
  )
}
export default BlogDetail;