import { 
  Table, 
  Row,
  Col,
  Button,
  notification,
  Space,
  Popconfirm,
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import type { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { 
  axiosArtists,
  axiosArtist, 
  axiosDeleteArtist,
  axiosAddArtist,
  axiosEditArtist,
} from '../../Api/HomeAxios';
import { DateTime } from '../../utils/DateTime';
import QueryParams from '../../Model/QueryParams';
import ArtistDto from '../../Model/ArtistDto';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';

type NotificationType = 'error'|'success'|'info'|'warning';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  totalSet: number;
  updated_at: Date;
};

const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message: message,
  });
};


//Function Component
const Home: React.FC = () => {

  //ModalState
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  //APIState
  const [loggedIn, setLoggedIn] = useState(false)
  const [artists, setArtists] = useState()
  const [artist, setArtist] = useState()
  const [isLoadingArtist, setIsLoadingArtist] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [queryParams, setQueryParams] = useState({search: ''})

  const fetchData = (queryParams:QueryParams) => {
    setIsPending(true)
    axiosArtists(queryParams)
      .then((res) => {
          setArtists(res.data.data)
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
    axiosArtist(id)
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
    fetchData(queryParams);
  }, [queryParams]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      sortDirections: ['descend'],
      width:'40%',
      render: (_, record) => (
        <Space>
          <NavLink to='/'>{record.name}</NavLink>
        </Space>
      ),
    },
    {
      title: 'Total Sets',
      dataIndex: 'totalSet',
      width:'20%',
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
      render: updated_at => <span>{DateTime(updated_at)}</span>
    },
    !loggedIn ? {
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

  const handleTableChange = (newPagination: TablePaginationConfig, sorter: SorterResult<DataType>,) => {
    console.log(newPagination, sorter);
  };

  return (
    <div>
      <Row>
        <h2>Display Artists</h2>
      </Row>
      <Row justify="end">
        <Col md={4}>
          <div className="d-flex justify-content-end mb-2">
            <Button type="primary" onClick={() => setShowModalAdd(true)}>Tambah</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            loading = {isPending} 
            columns={columns} 
            dataSource={artists}
            onChange={handleTableChange} 
            rowKey="id" />
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