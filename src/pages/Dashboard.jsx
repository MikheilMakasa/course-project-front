import { useState, useEffect, useContext } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { api } from '../constants';
import { AuthContext } from '../context/authContext';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { logout } = useContext(AuthContext);

  const getData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${api}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const selectedIds = users.map((user) => user.email);
    setSelectedRows(isChecked ? selectedIds : []);
  };

  const handleRowSelect = (event, email) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelected) =>
      isChecked
        ? [...prevSelected, email]
        : prevSelected.filter((id) => id !== email)
    );
    setSelectAll(false);
  };
  const getMail = () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded.email;
  };

  const makeAdmin = async () => {
    const email = getMail();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${api}/users/makeAdmin`,
        { emailList: selectedRows },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (selectedRows.includes(email)) {
        logout();
      }
      setSelectedRows([]);
      setSelectAll(false);
      getData();
      toast.success('User(s) have been made admin');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const unmakeAdmin = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${api}/users/unmakeAdmin`,
        { emailList: selectedRows },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSelectedRows([]);
      setSelectAll(false);
      getData();
      toast.success('User(s) have been unmade from admin');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async () => {
    const email = getMail();
    try {
      await axios.post(
        `${api}/users/deleteUser`,
        { emailList: selectedRows },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      if (selectedRows.includes(email)) {
        logout();
      }
      setSelectedRows([]);
      setSelectAll(false);
      getData();
      toast.success('User(s) have been deleted');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='dashboard'>
      <h1 className='title'>Dashboard</h1>
      <div className='toolbar'>
        <Button
          variant='warning'
          onClick={makeAdmin}
          disabled={!selectedRows.length > 0}
          style={{ color: 'white', margin: '5px' }}
        >
          Make admin
        </Button>
        <Button
          variant='success'
          onClick={unmakeAdmin}
          disabled={!selectedRows.length > 0}
          style={{ color: 'white', margin: '5px' }}
        >
          Unmake admin
        </Button>
        <Button
          variant='danger'
          onClick={handleDelete}
          disabled={!selectedRows.length > 0}
          style={{ color: 'white', margin: '5px' }}
        >
          Delete user
        </Button>
      </div>
      <Table striped bordered hover className='table'>
        <thead>
          <tr>
            <th>
              <Form.Check
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>E-mail</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.email}>
              <td>
                <Form.Check
                  type='checkbox'
                  checked={selectedRows.includes(user.email)}
                  onChange={(event) => handleRowSelect(event, user.email)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
