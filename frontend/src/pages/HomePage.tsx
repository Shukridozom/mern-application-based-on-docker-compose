import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    return (
        <Container sx={{mt: 1}}>
            <Grid container spacing={2}>
            <Grid item md={4}><ProductCard /></Grid>
            <Grid item md={4}><ProductCard /></Grid>
            <Grid item md={4}><ProductCard /></Grid>
            </Grid>
        </Container>
    );
}

export default HomePage;