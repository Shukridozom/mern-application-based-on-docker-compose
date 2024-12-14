import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJ1c2VyIiwibGFzdE5hbWUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyIiwiaWF0IjoxNzMzODAwMjk1LCJleHAiOjE3MzM4MDM4OTV9.KrIraWgHJ42JSpzH_UeZfI22VrASsj8LYXCaarSQOCU"
           }
           
            fetch("http://localhost:8080/product", { 
             method: "GET",
             headers: headersList
           }).then((response) => {
            response.json()
            .then((data) => {
                setProducts(data);
            })
           })    
    }, [])
    return (
        <Container sx={{mt: 1}}>
            <Grid container spacing={2}>
                {products.map((p) => (
                        <Grid item md={4}>
                            <ProductCard id={p._id} title={p.title} image={p.image} price={p.price} />
                            </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default HomePage;