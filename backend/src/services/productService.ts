import { productModel } from "../models/productMode";

interface productServiceOutput {
    statusCode: number,
    response?: any
  }

export const seedInitialProducts = async () => {
    const products = [
        {title: "Product 1", image: "image1", stock: 10, price: 20},
        {title: "Product 2", image: "image2", stock: 40, price: 30}
    ];

    const availableProducts = await productModel.find();
    if(availableProducts.length === 0)
        productModel.insertMany(products);
}


export const getProducts = async (): Promise<productServiceOutput> => {
    try {
        const products = await productModel.find();
        return {statusCode: 200, response: products};
    } catch (error: any) {
        return {statusCode: 500};
    }
}