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
    form.resetFields()
  }

  return (
    <Modal
      title="Add Content Crearot" 
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
              label="Content Creator Name"
              name="name"
            >
              <Input
                placeholder="Content Creator Name"
                autoComplete={"newpassword"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalAdd;