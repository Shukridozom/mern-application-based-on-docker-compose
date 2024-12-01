import { userModel } from "../models/userModel";

interface userServiceOutput {
    statusCode: number,
    response?: any
  }

interface registerDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const toRegisterDto = (data: any): registerDto | undefined => {
    if(!data)
        return undefined;

    const { firstName, lastName, email, password } = data;
  
    if (
      typeof firstName === "string" &&
      firstName.trim() !== "" &&
      typeof lastName === "string" &&
      lastName.trim() !== "" &&
      typeof email === "string" &&
      email.trim() !== "" &&
      typeof password === "string" &&
      password.trim() !== ""
    ) {
      const dto: registerDto = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
      };
  
      return dto;
    }
  
    return undefined;
  };


  interface loginDto {
    email: string;
    password: string;
  }

  const toLoginDto = (data: any): loginDto | undefined => {
    if(!data)
        return undefined;

    const { email, password } = data;
    if (
      typeof email === "string" &&
      email.trim() !== "" &&
      typeof password === "string" &&
      password.trim() !== ""
    ) {
      const dto: loginDto = {
        email: email.trim(),
        password: password.trim(),
      };
  
      return dto;
    }
  
    return undefined;
  };

  export const registerService = async (body: any):Promise<userServiceOutput> => {
    console.log(body);
    try {
        const data = toRegisterDto(body);
        if (!data)
            return {statusCode: 404, response: "Invalid 'registerDto' object"};
    
        const user = await userModel.findOne({ email: data.email });
    
        if (user)
            return {statusCode: 404, response: "User already exists"};
    
        const newUser = await userModel.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          passwordHash: data.password,
        });
    
        newUser.save();
    
        return {statusCode: 201};
      } catch (error: any) {
        return {statusCode: 500};
      }
  }

  export const loginService = async (body: any):Promise<userServiceOutput> => {
    console.log(body);
    const wrongCredintialsMessage = "Incorrect email or password";
    try {
        const data = toLoginDto(body);
        if (!data)
          return {statusCode: 404, response: "Invalid 'loginDto' object"}
    
        const user = await userModel.findOne({ email: data.email });
        if (!user)
          return {statusCode: 404, response: wrongCredintialsMessage}
    
        if (data.password === user.passwordHash)
          return {statusCode: 200, response: data}
    
        return {statusCode: 404, response: wrongCredintialsMessage}
      } catch (error: any) {
        return {statusCode: 500};
      }
  }