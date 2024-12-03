import { cartModel } from "../models/cartModel";

interface cartServiceOutput {
    statusCode: number,
    response?: any
  }

  interface getActiveCartDto {
    userId: string
  }

  const toGetActiveCartDto = (data: any): getActiveCartDto | undefined => {
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

export const getActiveCart = async(data: any):Promise<cartServiceOutput> => {
    try {
        const userData = toGetActiveCartDto(data);
        if(!userData)
            return {statusCode: 401};
        const userId = userData.userId;
        if(!userId)
            return {statusCode: 401};

        let activeCart = await cartModel.findOne({userId: userId, status: "active"})
        if(!activeCart) {
            activeCart = await cartModel.create({userId: userId});
            activeCart.save();
        }

        return {statusCode: 200, response: activeCart}

    } catch (error: any) {
        return {statusCode: 500};
    }
}