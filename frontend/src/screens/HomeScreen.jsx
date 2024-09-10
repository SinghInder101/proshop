import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductsCaraousel";

const HomeScreen = () => {
  const { pageNumber,keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber,keyword });

  return (
    <> {!keyword ? (<ProductCarousel/>) :( <Link to='/' className='btn btn-light'>Go Back</Link>)}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {" "}
          <h1> Latest Products </h1>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword:''}></Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
