import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import Center from './Center'
import useForm from '../hooks/useForm'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router-dom'


const getFreshModel = () => ({
    username: '',
    password: '',
    firstname: '',
    lastname: '',    
    email: ''
})


export default function Register()
  {

    const {context, setContext}  = useStateContext();
    const navigate = useNavigate();
    const handleClick = (e) => navigate('/');

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
        } = useForm(getFreshModel);

    const register = e=> {
        e.preventDefault();
        if(validate())
            //console.log(values);
            createAPIEndpoint(ENDPOINTS.user)            
            .post(values)
            .then(res => {
                console.log(res)
                //setContext({ username: res.data.username})  
                navigate('/login')              
            })
            .catch(err => console.log(err))
    }

    const validate = () => {
        let temp = {}
        temp.username = values.username != ""?"":"This field is required"
        temp.password = values.password != ""?"":"This field is required"
        temp.firstname = values.firstname != ""?"":"This field is required"
        temp.lastname = values.lastname != ""?"":"This field is required"        
        temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Email is not valid."        
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    return (
        <Center>
        {context.username}
        <Card sx={{width: '400px'}}>
            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h4" sx={{my:3}} >
                    MethodWorx Todo
                </Typography>
                    <Box sx={{
                        '& .MuiTextField-root':{
                            margin: 1, 
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete='off' onSubmit={register}>
            
                            <TextField
                                label="Username"
                                name='username'
                                value={values.username}
                                onChange={handleInputChange}
                                variant="outlined" 
                                {...(errors.username && {error:true, helperText:errors.username})} />
            
                            <TextField
                                label="Password"
                                name='password'
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined" 
                                {...(errors.password && {error:true, helperText:errors.password})} />
            
                            <TextField
                                label="Firstname"
                                name='firstname'
                                value={values.firstname}
                                onChange={handleInputChange}
                                variant="outlined" 
                                {...(errors.firstname && {error:true, helperText:errors.firstname})} />  
            
                            <TextField
                                label="Lastname"
                                name='lastname'
                                value={values.lastname}
                                onChange={handleInputChange}
                                variant="outlined" 
                                {...(errors.lastname && {error:true, helperText:errors.lastname})} />
            
                            <TextField
                                label="Email"
                                name='email'
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && {error:true, helperText:errors.email})} />               
                            
            
                            <Button 
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{width: '90%'}}>
                                Register
                            </Button>
                        </form>

                        <p onClick={handleClick}>Back to login</p>
                    </Box>
            </CardContent>
        </Card>
    </Center> 
    )
  }
