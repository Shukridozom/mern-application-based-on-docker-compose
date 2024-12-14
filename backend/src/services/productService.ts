import { productModel } from "../models/productMode";

interface productServiceOutput {
    statusCode: number,
    response?: any
  }

export const seedInitialProducts = async () => {
    const products = [
        {
            title: "Lenovo", 
            image: "https://www.google.com/imgres?q=lenovo%20laptop&imgurl=https%3A%2F%2Fp4-ofp.static.pub%2F%2Ffes%2Fcms%2F2024%2F05%2F17%2Fgshvrbmi7vcvszlriky5rf57g0w2w8161192.png&imgrefurl=https%3A%2F%2Fwww.lenovo.com%2Fae%2Fen%2Fp%2Flaptops%2Flenovo%2Flenovo-v-series%2Flenovo-v15-gen-4-15-inch-amd%2Flen101l0027&docid=dC_YytlN6DGcmM&tbnid=0RpBuLipzgfnDM&vet=12ahUKEwiUxoCD3qeKAxWE_bsIHar5AHEQM3oECBQQAA..i&w=584&h=584&hcb=2&ved=2ahUKEwiUxoCD3qeKAxWE_bsIHar5AHEQM3oECBQQAA", 
            stock: 10, 
            price: 15000
        },
        {
            title: "Apple", 
            image: "https://www.fonezone.ae/cdn/shop/files/lap_1.jpg?v=1690605098&width=1445", 
            stock: 8, 
            price: 20000
        }
        {
            title: "HP", 
            image: "https://images-cdn.ubuy.ae/64ccb2559d908f42222b598a-hp-pavilion-13-3-fhd-intel-core-i3.jpg", 
            stock: 3, 
            price: 10000
        }
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