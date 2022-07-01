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
  editArtist: (body:ArtistDto) => void;
}

const ModalEdit: React.FC<Props> = ({showModal, handleClose, artist, editArtist}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    
    console.log('Clicked ok');
  }

  const handleCancel = () => {
    handleClose();
    console.log('Clicked ok');
  }

  useEffect(() => {
    if(showModal){
        // setProduct(product);
        form.setFieldsValue(artist)
    }
  },[artist,showModal,form]);

  return (
    <Modal
      title="Edit Artist" 
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