import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productMode";

interface cartServiceOutput {
    statusCode: number,
    response?: any
  }

  interface getCartDto {
    userId: string
  }

const toGetCartDto = (header: any): getCartDto | undefined => {
    if(!header)
        return undefined;

    const userId:string = header?._id;

    return {userId}
    }

interface addItemToCartDto {
    userId: string,
    productId: any,
    quantity: number
    }

const toAddItemToCartDto = (header:any, body: any): addItemToCartDto | undefined => {
    if(!header || !body)
        return undefined;

    const userId:string = header?._id;

    const productId = body?.productId;
    const quantity = parseInt(body?.quantity);

    if(!userId || !productId || !quantity)
        return undefined;

    return {userId, productId, quantity: quantity}
}

interface updateItemInCartDto {
    userId: string,
    productId: any,
    quantity: number
    }

const toUpdateItemInCartDto = (header:any, body:any): updateItemInCartDto | undefined => {
    if(!header || !body)
        return undefined;

    const userId:string = header?._id;
    if(!userId)
        return undefined;

    const productId = body?.productId;
    const quantity = parseInt(body?.quantity);
    if(!userId || !productId || !quantity)
        return undefined;

    return {userId, productId, quantity}
}

interface deleteItemFromCartDto {
    userId: string,
    productId: any
}

const toDeleteItemFromCartDto = (header: any, reqParams: any): deleteItemFromCartDto | undefined => {
    if(!header || !reqParams)
        return undefined;

    const userId: string = header?._id;
    const productId = reqParams?.productId;

    if(!userId || !productId)
        return undefined;

    return {userId, productId};
}

export const getCart = async(data: any):Promise<cartServiceOutput> => {
    try {       
        const params = toGetCartDto(data);
        if(!params)
            return {statusCode: 400};
        const userId = params.userId;
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

export const addItemToCart = async(header: any, body: any):Promise<cartServiceOutput> => {
    try {
        const params = toAddItemToCartDto(header, body);
        if(!params)
            return {statusCode: 400}

        let cart = await getActiveCartForUser(params.userId);
        if(!cart)
            return {statusCode: 400};

        if(cart.items.find((p) => p.productId.toString() === params.productId))
            return {statusCode: 400, response: 'product already exists'}

        const product = await productModel.findById(params.productId)
        if(!product)
            return {statusCode:400, response: 'unavailabe product'}

        if(product.stock < params.quantity)
            return {statusCode:400, response: 'low stock'}

        cart.items.push({productId: params.productId, quantity:params.quantity, unitPrice: product.price});
        cart.totalPrice += product.price * params.quantity;

        cart.save();

        return {statusCode: 200, response: cart};

    } catch (error: any) {
        return {statusCode: 500}
    }
}

export const updateItemInCart = async(header: any, body: any):Promise<cartServiceOutput> => {
    try {
        const params = toUpdateItemInCartDto(header, body);
        if(!params)
            return {statusCode: 400}

        let cart = await getActiveCartForUser(params.userId);
        if(!cart)
            return {statusCode: 400};

        const item = cart.items.find((p) => p.productId.toString() === params.productId);
        if(!item)
            return {statusCode: 400, response: 'Item is not available in the cart'}

        const product = await productModel.findById(params.productId);
        if(!product)
            return {statusCode:400, response: 'unavailabe product'}
        
        if(product.stock < params.quantity)
            return {statusCode:400, response: 'low stock'}

        let sum = item.unitPrice * item.quantity;
        sum = (product.price * params.quantity) - sum;
        cart.totalPrice += sum;

        item.quantity = params.quantity;
        item.unitPrice = product.price;

        cart.save();

        return {statusCode: 200, response: cart};
    } catch (error: any) {
        return {statusCode: 500}
    }
}

export const deleteItemFromCart = async(header: any, reqParams: any):Promise<cartServiceOutput> => {
    try {
        const params = toDeleteItemFromCartDto(header, reqParams);
        if(!params)
            return {statusCode: 400};

        let cart = await getActiveCartForUser(params.userId);
        if(!cart)
            return {statusCode: 400};

        if(!cart.items.find((p) => p.productId.toString() === params.productId))
            return {statusCode: 400}

        const otherItems = cart.items.filter((p) => p.productId.toString() !== params.productId);

        cart.totalPrice = otherItems.reduce((sum, p) => {
            sum += p.quantity * p.unitPrice;
            return sum;
        }, 0);
        cart.items = otherItems;

        await cart.save();

        return {statusCode: 200, response: cart};
    } catch (error: any) {
        return {statusCode: 500}
    }
}