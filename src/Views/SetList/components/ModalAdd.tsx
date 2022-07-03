import {
  Modal,
  Form,
  Row,
  Col,
  Input,
} from 'antd';
import React from 'react';
import SetListDto from '../../../Model/SetListDto';
import { useEffect } from 'react';

type Props = {
  showModal: boolean;
  handleClose: () => void;
  addSetList: (body: SetListDto) => void;
  artistsId: number;
}

const ModalAdd: React.FC<Props> = ({showModal,handleClose,addSetList,artistsId}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    addSetList(form.getFieldsValue());
    handleClose();
    form.resetFields()
  }

  const handleCancel = () => {
    handleClose();
    form.resetFields()
  }

  useEffect(() => {
    if(showModal){
        form.setFieldsValue(artistsId)
    }
  },[artistsId,showModal,form]);

  return (
    <Modal
      title="Add Artist" 
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
              label="Set Title"
              name="title"
            >
              <Input
                placeholder="Title"
                autoComplete={"newpassword"}
              />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
            >
              <Input
                placeholder="Thumbnail"
                autoComplete={"newpassword"}
              />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Set Storage"
              name="store"
            >
              <Input
                placeholder="Storage"
                autoComplete={"newpassword"}
              />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Artist Id"
              name="artistsId"
              initialValue={artistsId}
            >
              <Input
                placeholder="id"
                autoComplete={"newpassword"}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalAdd;