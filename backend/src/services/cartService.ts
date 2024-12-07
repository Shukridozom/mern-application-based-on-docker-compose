import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productMode";

interface cartServiceOutput {
    statusCode: number,
    response?: any
  }

  interface getCartDto {
    userId: string
  }

const toGetCartDto = (data: any): getCartDto | undefined => {
    if(!data)
        return undefined;

    const userHeader = data?.user;
    if(!userHeader)
        return undefined;

    const userId = userHeader?._id;
    if(!userId)
        return undefined;

    return {userId: userId};
    }

interface addItemToCartDto {
    userId: string,
    productId: any,
    quantity: number
    }

const toAddItemToCartDto = (data:any): addItemToCartDto | undefined => {
    if(!data)
        return undefined;

    const userHeader = data?.user;
    if(!userHeader)
        return undefined;

    const userId = userHeader?._id;
    if(!userId)
        return undefined;

    const productId = data.body?.productId;
    const quantity = parseInt(data.body?.quantity);
    if(!productId || !quantity)
        return undefined;

    return {userId: userId, productId: productId, quantity: quantity}
}

export const getCart = async(data: any):Promise<cartServiceOutput> => {
    try {
        const userData = toGetCartDto(data);
        if(!userData)
            return {statusCode: 400};
        const userId = userData.userId;
        if(!userId)
            return {statusCode: 400};

        let activeCart = await getActiveCartForUser(userId);
        return {statusCode: 200, response: activeCart}

    } catch (error: any) {
        return {statusCode: 500};
    }
}

const getActiveCartForUser = async(userId: string) => {
    let activeCart = await cartModel.findOne({userId: userId, status: "active"})
    if(!activeCart) {
        activeCart = await cartModel.create({userId: userId});
        activeCart.save();
    }
    return activeCart;
}

export const addItemToCart = async(data: any):Promise<cartServiceOutput> => {
    try {
        const itemRequestParameters = toAddItemToCartDto(data);
        if(!itemRequestParameters)
            return {statusCode: 400}

        let cart = await getActiveCartForUser(itemRequestParameters.userId);
        if(!cart)
            return {statusCode: 400};

        if(cart.items.find((p) => p.productId.toString() === itemRequestParameters.productId))
            return {statusCode: 400, response: 'product already exists'}

        const product = await productModel.findById(itemRequestParameters.productId)
        if(!product)
            return {statusCode:400, response: 'unavailabe product'}

        if(product.stock < itemRequestParameters.quantity)
            return {statusCode:400, response: 'low stock'}

        cart.items.push({productId: itemRequestParameters.productId, quantity:itemRequestParameters.quantity, unitPrice: product.price});
        cart.totalPrice += product.price * itemRequestParameters.quantity;

        cart.save();

        return {statusCode: 200, response: cart};
    } catch (error: any) {
        return {statusCode: 500}
    }
}