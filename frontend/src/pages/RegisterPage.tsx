import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";

const RegisterPage = () => {

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {login} = useAuth();

    const [error, setError] = useState(false);

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;


        if(!firstName || !lastName || !email || !password) {
            setError(true);
            return;
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "firstName": firstName,
             "lastName": lastName,
             "email": email,
             "password": password
           });
           
           let response = await fetch("http://localhost:8080/user/register", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           if(response.status !== 200) {
               setError(true);  
                return;
           }

           const token = await response.text();
           if(!token) {
            setError(true);
            return;
           }

           login(email, token);
    };

    return (
        <Container>
            <Box 
            sx={{
                display: "flex", 
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center",
                mt: 4
                }}
                >
                
            <Typography variant="h4">Register New Account</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                gap: 2,
                border: 1,
                padding: 2,
                borderRadius: 1
            }}>
                <TextField inputRef={firstNameRef} label="First Name" name="firstName" />
                <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
                <TextField inputRef={emailRef} label="Email" name="email" />
                <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
                <Button onClick={onSubmit} variant="contained" >Register</Button>
                
                {error && <Typography sx={{color: "red"}}>Something went wrong</Typography>}
            </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage;