import {
  Modal,
  Form,
  Row,
  Col,
  Input,
} from 'antd';
import React, { useEffect } from 'react';
import SetListDto from '../../../Model/SetListDto';

type Props = {
  showModal: boolean;
  handleClose: () => void;
  set: any;
  editSetList: (id:number,body:SetListDto) => void;
  artistsId: number;
}

const ModalEdit: React.FC<Props> = ({showModal, handleClose, set, editSetList, artistsId}) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    editSetList(set.id, form.getFieldsValue());
    handleClose();
  }

  const handleCancel = () => {
    handleClose();
  }

  useEffect(() => {
    if(showModal){
        form.setFieldsValue(set)
    }
  },[set,showModal,form]);

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
              initialValue={Number(set.artists_id)}
            >
              <Input
                placeholder="id"
                autoComplete={"newpassword"}
                disabled
              />
            </Form.Item>
            <p>Content Creator Name : {set.artists.name}</p>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalEdit;