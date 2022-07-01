import {
  Modal,
  Form,
  Row,
  Col,
  Input,
} from 'antd';
import React from 'react';
import ArtistDto from '../../../Model/ArtistDto'

type Props = {
  showModal: boolean;
  handleClose: () => void;
  addArtist: (body: ArtistDto) => void;
}

const ModalAdd: React.FC<Props> = ({showModal,handleClose,addArtist}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    addArtist(form.getFieldsValue());
    handleClose();
    form.resetFields()
  }

  const handleCancel = () => {
    handleClose();
    console.log('Clicked ok');
  }

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
              label="Artist Name"
              name="name"
            >
              <Input
                placeholder="Artist Name"
                autoComplete={"off"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalAdd;