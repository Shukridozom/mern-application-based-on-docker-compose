import { userModel } from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10;

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
          passwordHash: await bcrypt.hash(data.password, saltRounds),
        });
    
        newUser.save();

        const jwtToken = generateJwtToken(newUser.firstName, newUser.lastName, newUser.email);
        return {statusCode: 200, response: jwtToken};

      } catch (error: any) {
        return {statusCode: 500};
      }
  }

  export const loginService = async (body: any):Promise<userServiceOutput> => {
    const wrongCredintialsMessage = "Incorrect email or password";
    try {
        const data = toLoginDto(body);
        if (!data)
          return {statusCode: 404, response: "Invalid 'loginDto' object"}
    
        const user = await userModel.findOne({ email: data.email });
        if (!user)
          return {statusCode: 404, response: wrongCredintialsMessage}
    
        if (await bcrypt.compare(data.password, user.passwordHash)) {
          const jwtToken = generateJwtToken(user.firstName, user.lastName, user.email);
          return {statusCode: 200, response: jwtToken};
        }
    
        return {statusCode: 404, response: wrongCredintialsMessage}
      } catch (error: any) {
        return {statusCode: 500};
      }
  }

  const generateJwtToken = (firstName: string, lastName: string, email: string) => {
    const secretKey = '0a4f80a1e181f6345c783d66174da7980d43caadb5828b5637cd428bca47c4d4';
    const expiresInString = '1h';

    if(!firstName || !lastName || !email)
      throw new Error('All firstName, lastName and email credentials are required');
     
    return jwt.sign({firstName: firstName, lastName: lastName, email: email}, secretKey, {expiresIn: expiresInString});
  }
  