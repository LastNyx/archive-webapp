import { 
  Table, 
  Row,
  Col,
  Button,
  notification,
  Space,
  Popconfirm,
  Breadcrumb,
  Switch,
} from 'antd';
import type { ColumnsType, TablePaginationConfig} from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import { 
  axiosArtists,
  axiosArtist, 
  axiosDeleteArtist,
  axiosAddArtist,
  axiosEditArtist,
} from '../../Api/ArtistsAxios';
import { DateTime } from '../../utils/DateTime';
import QueryParams from '../../Model/QueryParams';
import ArtistDto from '../../Model/ArtistDto';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';
import Input from 'antd/lib/input/Input';

type NotificationType = 'error'|'success'|'info'|'warning';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  setlists_count: number;
  setlists: setList[];
};

interface setList {
  id: number;
  title: string;
  artists_id: number;
}

const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message: message,
  });
};


//Function Component
const Home: React.FC = () => {

  const [cookies] = useCookies();

  //ModalState
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showAction, setShowAction] = useState(false);

  //APIState
  const [loggedIn, setLoggedIn] = useState(false)
  const [artists, setArtists] = useState()
  const [artist, setArtist] = useState()
  const [isLoadingArtist, setIsLoadingArtist] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [queryParams, setQueryParams] = useState({search: ''})

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const fetchData = (queryParams:QueryParams) => {
    setIsPending(true)
    axiosArtists(queryParams)
      .then((res) => {
          setArtists(res.data.data)
          setPagination({total: res.data.total, current: res.data.current_page, pageSize: res.data.per_page})
      })
      .catch((err) => {
        openNotification('error', err);
      })
      .finally(() => {
          setIsPending(false)
      })
  }

  const fetchOneData = (id:number) => {
    setArtist(undefined)
    setIsLoadingArtist(true)
    axiosArtist(id, {})
    .then((res) => {
        setArtist(res.data)
    })
    .catch((err) => {
      openNotification('error', err);
    })
    .finally(() => {
      setIsLoadingArtist(false)
    })
  }

  const addArtist = (body:ArtistDto) => {
    setIsPending(true);
    axiosAddArtist(body)
      .then((res) => {
        fetchData(queryParams)
        openNotification('success', 'Artist added');
      })
      .catch((err) => {
        openNotification('error', err);
        setIsPending(false);
      })
  }

  const editArtist = (id:number, body:ArtistDto) => {
    setIsPending(true);
    axiosEditArtist(id, body)
      .then((res) => {
        fetchData(queryParams)
        openNotification('success', 'Artist updated');
      }
    )
    .catch((err) => {
      openNotification('error', err);
      setIsPending(false);
    })
  }

  const handleDelete = (id:number) => {
    setIsPending(true);
    axiosDeleteArtist(id)
    .then((res) => {
        console.log('deleted')
    })
    .catch((err) => {
      openNotification('error', err);
    })
    .finally(() => {
        fetchData(queryParams)
        setIsPending(false);
    })
  }

  const handleEdit = (id:number) => {
    fetchOneData(id);
    setShowModalEdit(true);
  }

  useEffect(() => {
    if(cookies.token){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
      setShowAction(false);
    }
    fetchData(queryParams);
  }, [queryParams, cookies.token]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width:'40%',
      render: (_, record) => (
        <Space>
          <Link to={`/${record.name}?id=${record.id}`}>{record.name}</Link>
        </Space>
      ),
    },
    {
      title: 'Total Sets',
      dataIndex: 'setlists_count',
      width:'20%',
    },
    {
      title: 'Last Updated',
      dataIndex: ['setlists', '0', 'updated_at'],
      render: (setlists) => setlists? <span>{DateTime(setlists)}</span>: <span>-</span>,
    },
    showAction ? {
      title: 'Action',
      width: '20%',
      render: (_, record) => (
        <Space size={'small'}>
          <Button
              type="primary"
              disabled={isLoadingArtist}
              onClick={!isLoadingArtist ? () => handleEdit(record.id) : undefined}
              className = "me-2"
              >
              Edit
          </Button>
          <Popconfirm title="You Sure?" onConfirm={() => handleDelete(record.id)}>
              <Button
                  danger
                  disabled={isPending}
              >
                  Delete
              </Button>
          </Popconfirm>
        </Space>
      ),
    } : { width: 0, },
  ];

  const handleTableChange = (
    newPagination: TablePaginationConfig,
  ) => {
    fetchData({
      page: newPagination.current,
    });
  };

  return (
    <div>
      <Row className="mt-4 mb-4">
        <Col md={12}>
          <Breadcrumb>
            <Breadcrumb.Item>
                Artists List
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
            dataSource={artists}
            rowKey="id" 
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Col>
      </Row>

      <ModalAdd 
        showModal={showModalAdd} 
        handleClose={() => setShowModalAdd(false)}
        addArtist={(body) => addArtist(body)}
      ></ModalAdd>
      {artist && <ModalEdit 
        showModal={showModalEdit} 
        handleClose={() => setShowModalEdit(false)}
        artist={artist}
        editArtist={(id, body) => editArtist(id, body)}
      ></ModalEdit>}
    </div>
  );
}

export default Home;