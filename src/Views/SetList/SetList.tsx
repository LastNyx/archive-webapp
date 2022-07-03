import { 
  Table,
  Row,
  Col,
  Button,
  notification,
  Space,
  Popconfirm,
  Breadcrumb,
  Image,
  Avatar,
  Input,
  Switch,
} from 'antd'
import { 
  axiosArtist, 
} from '../../Api/ArtistsAxios';
import { 
  axiosSetList,
  axiosDeleteSetList,
  axiosAddSetList,
  axiosEditSetList, 
} from '../../Api/SetListsAxios';
import type { ColumnsType} from 'antd/lib/table';
import type { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useParams, useSearchParams, } from 'react-router-dom'
import { DateTime } from '../../utils/DateTime';
import QueryParams from '../../Model/QueryParams';
import SetListDto from '../../Model/SetListDto';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';

type NotificationType = 'error'|'success'|'info'|'warning';

interface DataType {
  key: React.Key;
  id: number;
  title: string;
  thumbnail: string;
  store: string;
  updated_at: Date;
};

const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message: message,
  });
};

//Function Component
const SetList = () => {

  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const [cookies] = useCookies();

  //ModalState
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showAction, setShowAction] = useState(false);

  //APIState
  const [postId] = useState(searchParams.get('id'))
  const [loggedIn, setLoggedIn] = useState(false)
  const [artist, setArtist] = useState()
  const [set, setSet] = useState()
  const [isLoadingSet, setIsLoadingSet] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [queryParams, setQueryParams] = useState({withSets: true, search: ''})

  const fetchData = (id:number, queryParams:QueryParams) => {
    setIsPending(true)
    axiosArtist(id,queryParams)
      .then((res) => {
          setArtist(res.data.data)
      })
      .catch((err) => {
        openNotification('error', err);
      })
      .finally(() => {
          setIsPending(false)
      })
  }

  const fetchOneData = (id:number) => {
    setSet(undefined)
    setIsLoadingSet(true)
    axiosSetList(id, {})
    .then((res) => {
        setSet(res.data)
    })
    .catch((err) => {
      openNotification('error', err);
    })
    .finally(() => {
      setIsLoadingSet(false)
    })
  }

  const addSetList = (body:SetListDto) => {
    setIsPending(true);
    axiosAddSetList(body)
      .then((res) => {
        fetchData(Number(postId),queryParams)
        openNotification('success', 'Set added');
      })
      .catch((err) => {
        openNotification('error', err);
        setIsPending(false);
      })
  }

  const editArtist = (id:number, body:SetListDto) => {
    setIsPending(true);
    axiosEditSetList(id, body)
      .then((res) => {
        fetchData(Number(postId),queryParams)
        openNotification('success', 'Set updated');
      }
    )
    .catch((err) => {
      openNotification('error', err);
      setIsPending(false);
    })
  }

  const handleDelete = (id:number) => {
    setIsPending(true);
    axiosDeleteSetList(id)
    .then((res) => {
      openNotification('success', 'Set deleted');
    })
    .catch((err) => {
      openNotification('error', err);
    })
    .finally(() => {
        fetchData(Number(postId),queryParams)
        setIsPending(false);
    })
  }

  useEffect(() => {
    if(cookies.token){
      setLoggedIn(true);
      setShowAction(true);
    }else{
      setLoggedIn(false);
      setShowAction(false);
    }
    fetchData(Number(postId),queryParams);
  }, [queryParams, postId, cookies.token]);

  const handleEdit = (id: number) => {
    fetchOneData(id);
    setShowModalEdit(true);
  }

  const handleTableChange = (newPagination: TablePaginationConfig, sorter: SorterResult<DataType>,) => {
    console.log(newPagination, sorter);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      width:'20%',
      render: thumbnail => 
      <Avatar shape="square" size={175} src={<Image src={thumbnail} style={{ width: 175 }} />} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
      sortDirections: ['descend'],
      width:'40%',
      render: (_, record) => (
        <Space>
          <a href={`${record.store}`} target={"_blank"} rel="noreferrer">{record.title}</a>
        </Space>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
      render: updated_at => <span>{DateTime(updated_at)}</span>
    },
    showAction ? {
      title: 'Action',
      width: '20%',
      render: (_, record) => (
        <Space size={'small'}>
          <Button
              type="primary"
              disabled={isLoadingSet}
              onClick={!isLoadingSet ? () => handleEdit(record.id) : undefined}
              className = "me-2"
              >
              Edit
          </Button>
          <Popconfirm title="Yakin Menghapus?" onConfirm={() => handleDelete(record.id)}>
              <Button
                  danger
                  disabled={isPending}
              >
                  Hapus
              </Button>
          </Popconfirm>
        </Space>
      ),
    } : { width: 0, },
  ];

  return (
    <div>
      <Row className="mt-4 mb-4">
        <Col md={12}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">
                Artists List
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col md={12}>
          <Input
            placeholder="Search"
            onChange={(e) => setQueryParams({...queryParams, search: e.target.value})}
          />
        </Col>
      </Row>
      {loggedIn && <Row justify="end">
        <Col md={20}>
          <Switch checked={showAction} onChange={() => setShowAction(!showAction)}/> Toggle Action Column
        </Col>
        <Col md={4}>
          <div className="d-flex justify-content-end mb-3">
            <Button type="primary" onClick={() => setShowModalAdd(true)}>Add</Button>
          </div>
        </Col>
      </Row>}
      <Row className="overflow-auto mb-2">
        <Col span={24}>
          <Table 
            loading = {isPending} 
            columns={columns} 
            dataSource={artist}
            onChange={handleTableChange} 
            rowKey="id" />
        </Col>
      </Row>

      <ModalAdd 
        showModal={showModalAdd} 
        handleClose={() => setShowModalAdd(false)}
        addSetList={(body) => addSetList(body)}
        artistsId={Number(postId)}
      ></ModalAdd>
      {set && <ModalEdit 
        showModal={showModalEdit} 
        handleClose={() => setShowModalEdit(false)}
        set={set}
        editSetList={(id, body) => editArtist(id, body)}
        artistsId={Number(postId)}
      ></ModalEdit>}
    </div>
  )
}

export default SetList;