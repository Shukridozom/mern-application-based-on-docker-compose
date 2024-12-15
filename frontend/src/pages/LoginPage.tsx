import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";

const LoginPage = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const {login} = useAuth();

    const [error, setError] = useState(false);
    
    const onSubmit = async() => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        
        if(!email || !password) {
            setError(true);
            return;
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "email": email,
             "password": password
           });
           
           let response = await fetch("http://localhost:8080/user/login", { 
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
           
           
    }

    return (
        <Container>
            <Box sx ={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 4
            }}>
                <Typography variant="h4">Login</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 2,
                    gap: 2,
                    border: 1,
                    padding: 2,
                    borderRadius: 1
                }}>
            <TextField inputRef={emailRef} label="Email" name="email"></TextField>
            <TextField inputRef={passwordRef} type="password" label="Password" name="password"></TextField>
            <Button onClick={onSubmit} variant="contained" >Login</Button>

            {error && <Typography sx={{color: "red"}}>Something went wrong</Typography>}
            </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;