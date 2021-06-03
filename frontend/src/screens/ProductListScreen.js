import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // only products if logged in user is an admin,
    // otherwise redirect to login screen
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete the product "${product.name}"?`
      )
    ) {
      // delete products
      dispatch(deleteProduct(product._id));
    }
  };

  const createProductHandler = (product) => {
    // create products
    console.log("createProductHandler");
  };

  const renderTable = () => {
    return (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                  {product._id}
                </Link>
              </td>
              <td>{product.name}</td>
              <td>£ {product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(product)}
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
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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

export default ProductListScreen;
