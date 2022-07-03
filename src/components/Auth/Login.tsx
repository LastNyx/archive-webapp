import {
  Modal,
  Form,
  Row,
  Col,
  Input,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';

type Props = {
  showModal: boolean;
  handleClose: () => void;
  handleLogin: (body:any) => void;
}

const Login: React.FC<Props> = ({showModal,handleClose,handleLogin}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    handleLogin(form.getFieldsValue());
    handleClose();
    form.resetFields()
  }

  const handleCancel = () => {
    handleClose();
    form.resetFields()
  }

  // useEffect(() => {
  //   if(showModal){
  //       form.setFieldsValue(artistsId)
  //   }
  // },[artistsId,showModal,form]);

  return (
    <Modal
      title="Login" 
      visible={showModal} 
      onOk={handleOk} 
      onCancel={handleCancel}
    >
      <Form 
        form={form}
        layout='vertical'
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 24 }}
      >
        <Row>
          <Col md={24}>
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                placeholder="Username"
                autoComplete={"newpassword"}
              />
            </Form.Item>
          </Col>
          <Col md={24}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
            />
          </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Login;