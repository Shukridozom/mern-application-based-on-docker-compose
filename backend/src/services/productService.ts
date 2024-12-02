import { productModel } from "../models/productMode";

export const seedInitialProducts = async () => {
    const products = [
        {title: "Product 1", image: "image1", stock: 10, price: 20},
        {title: "Product 2", image: "image2", stock: 40, price: 30}
    ];

    const availableProducts = await productModel.find();
    if(availableProducts.length === 0)
        productModel.insertMany(products);
}