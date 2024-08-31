import React from 'react'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {Form,Button, Row,Col} from 'react-bootstrap'

const LoginScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const submitHandler = (e) =>{
    e.preventDefault();
    console.log('submit');

  }

  return (
    <FormContainer>

    </FormContainer>
   
  )
}

export default LoginScreen