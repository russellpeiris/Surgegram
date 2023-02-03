import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import Dropzone from 'react-dropzone';
import {Edit, ImageSearch} from '@mui/icons-material';

/////////STYLING
const Form = styled.form``

const Container = styled.div`
    background-color: white;
    padding: 30px;
`

const RegisterContainer = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
`
const Box = styled.div`
    height: 76px;
    /* width: 300px; */
    outline: none;
    border: none;
    grid-column: 1 / span 2;
    background-color: #f5f5f5;
    padding-left: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #75757D;

`
const CommonFields = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    padding-top: 6px;
`
const Button = styled.button`
    grid-column: 1 / span 2;
    padding: 10px;
    cursor: pointer;
    border: none;
`
const PageType = styled.div`
    display: flex;
    justify-content: end;
    font-size: 13px;
    grid-column: 1 / span 2;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`
const Input = styled.input`
    height: 38px;
    width: 300px;
    outline: none;
    border: none;
    background-color: #f5f5f5;
    padding-left: 10px;
    
`
/////////VALIDATIONS
const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required!"),
    lastName: yup.string().required("Last name is required!"),
    email: yup.string().email("Please enter a valid email").required("Email is Required!"),
    password: yup.string().required("Password is required!"),
    location: yup.string().required("Location is required!"),
    occupation: yup.string().required("Occupation is required!"),
    picture: yup.string().required("A Profile Photo is required!"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is Required!"),
    password: yup.string().required("Please enter your password"),
})

const initialRegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture:"",
};
const initialLoginValues = {
    email: "",
    password: "",
};

const LoginForm = () => {

    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    
    const register = async(values, onSubmitProps) => {
        //allows us to send form info with the image
        const formData = new FormData();
        for(let value in values){
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:5000/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser){
            setPageType('login');
        }
    };

    const login = async (values, onSubmitProps)=>{
        const loggedInResponse = await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home");
        }
    }

    const handleFormSubmit = async(values, onSubmitProps)=>{
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };
  return (
    <Container>

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialLoginValues: initialRegisterValues}
            validationSchema = {isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,

            })=>(
                <Form onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                        <RegisterContainer>
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)
}
                                helperText={touched.firstName && errors.firstName}
                                placeholder='First Name'
                            />
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                placeholder='Last Name'
                            />
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                placeholder='Location'
                            />
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                placeholder='Occupation'
                            />

                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                    <Box {...getRootProps()}>

                                        <input {...getInputProps()} />

                                        {!values.picture ? ( <p><ImageSearch/></p> 
                                        ) : (
                                            <Edit/>
                                        )}
                                    </Box>
                                    )}
                                </Dropzone>

                        </RegisterContainer>
                        </>
                    )}
                <CommonFields>
                    <Input 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        placeholder='Email'
                    />

                    <Input 
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        placeholder='Password'
                    />

                    <Button type='submit'>{isLogin ? "LOGIN" : "REGISTER"}</Button>
                    <PageType 
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."
                            }
                    </PageType>
                </CommonFields>
                </Form>
            )}
            
        </Formik>
    </Container>
  )
}

export default LoginForm
