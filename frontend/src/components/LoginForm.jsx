import styled from 'styled-components';
import React, { useState } from 'react';
import { useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import Dropzone from 'react-dropzone';
import {Edit, ImageSearch} from '@mui/icons-material';
import ReCAPTCHA from "react-google-recaptcha";
import { loginSchema, regSchema } from '../schema';
import { TextField } from '@mui/material';

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
    gap: 10px;
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

const CaptchaContainer = styled.div`

`
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

    // const reCAPTCHA_KEY = process.env.CAPTCHA_KEY;
    const [isCaptcha, setIsCaptcha] = useState(true);
    const CaptchaChange = ()=>{
    setIsCaptcha(false);
}
    
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

        if(loggedInResponse.status === 401){
            alert("Incorrect Password!.");
            return;
        }else if(loggedInResponse.status === 400){
            alert("User does not exist. Please register first!");
            setPageType('register');
            return;
        }

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


    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: isLogin ? initialLoginValues: initialRegisterValues,
        validationSchema: isLogin ? loginSchema : regSchema,
        onSubmit: handleFormSubmit,
    })

    console.log(errors);


  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            {isRegister && (
                <>
                <RegisterContainer>
                    <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        placeholder='First Name'
                        style={
                            { 
                                justifyContent: "center",
                            }
                        }
                        InputProps={{
                            style: {
                                backgroundColor: "#f5f5f5",
                                height: '38px',
                                borderRadius : '0',
                            }
                        }}
                    />
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            placeholder='Last Name'
                            style={
                                { 
                                    justifyContent: "center",
                                }
                            }
                            InputProps={{
                                style: {
                                    backgroundColor: "#f5f5f5",
                                    height: '38px',
                                    borderRadius : '0',
                                }
                            }}
                        />
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            placeholder='Location'
                            style={
                                { 
                                    justifyContent: "center",
                                }
                            }
                            InputProps={{
                                style: {
                                    backgroundColor: "#f5f5f5",
                                    height: '38px',
                                    borderRadius : '0',
                                }
                            }}
                        />
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.occupation}
                            name="occupation"
                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                            helperText={touched.occupation && errors.occupation}
                            placeholder='Occupation'
                            style={
                                { 
                                    justifyContent: "center",
                                }
                            }
                            InputProps={{
                                style: {
                                    backgroundColor: "#f5f5f5",
                                    height: '38px',
                                    borderRadius : '0',
                                }
                            }}
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
                <TextField 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    placeholder='Email'
                    style={
                        { 
                            justifyContent: "center",
                        }
                    }
                    InputProps={{
                        style: {
                            backgroundColor: "#f5f5f5",
                            height: '38px',
                            borderRadius : '0',
                        }
                    }}

                />

                <TextField 
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    placeholder='Password'
                    style={
                        { 
                            justifyContent: "center",
                        }
                    }
                    InputProps={{
                        style: {
                            backgroundColor: "#f5f5f5",
                            height: '38px',
                            borderRadius : '0',
                        }
                    }}
                />

                <Button
                disabled={isCaptcha}
                type='submit'>{isLogin ? "LOGIN" : "REGISTER"}</Button>
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
            <CaptchaContainer>
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"  onChange={CaptchaChange}/>

            </CaptchaContainer>
        </Form>
    </Container>
  )
}

export default LoginForm
