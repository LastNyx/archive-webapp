import {
  Modal,
  Form,
  Row,
  Col,
  Input,
} from 'antd';
import React, { useEffect } from 'react';
import ArtistDto from '../../../Model/ArtistDto';

type Props = {
  showModal: boolean;
  handleClose: () => void;
  artist: any;
  editArtist: (id:number,body:ArtistDto) => void;
}

const ModalEdit: React.FC<Props> = ({showModal, handleClose, artist, editArtist}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    editArtist(artist.id, form.getFieldsValue());
    handleClose();
  }

  const handleCancel = () => {
    handleClose();
  }

  useEffect(() => {
    if(showModal){
        form.setFieldsValue(artist)
    }
  },[artist,showModal,form]);

  return (
    <Modal
      title="Edit Content Creator" 
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
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalEdit;