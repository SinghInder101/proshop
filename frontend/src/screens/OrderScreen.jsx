import React from 'react'
import{Link,useParams} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { useDispatch,useSelector } from 'react-redux';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const {id:orderId}= useParams();
    const{data:order,isLoading,isError} = useGetOrderDetailsQuery(orderId);
    
  return (
    <div>OrderScreen</div>
  )
}

export default OrderScreen