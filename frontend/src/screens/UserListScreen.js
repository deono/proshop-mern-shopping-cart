import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    // only list users if logged in user is an admin,
    // otherwise redirect to login screen
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (user) => {
    if (
      window.confirm(`Are you sure you want to delete the user "${user.name}"?`)
    ) {
      dispatch(deleteUser(user._id));
    }
  };

  const renderTable = () => {
    return (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/admin/user/${user._id}/edit`}>{user._id}</Link>
              </td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <i className='fas fa-check' style={{ color: "green" }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(user)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        renderTable()
      )}
    </>
  );
};

export default UserListScreen;
