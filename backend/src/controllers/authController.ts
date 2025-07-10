import { Request, Response } from "express";
import User from "../../src/modules/User";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'secret' ;

export const signup = async (req: Request, res: Response) =>{
    try{
        const { name, email, address, phone , photo, password} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists "});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, address, phone, photo, password: hashedPassword});

        return res.status(201).json({ message: "Signup Successfull "});
    } catch (err) {
        return res.status(500).json({message: "Signup error", error: err});
    }
};

export const login = async (req: Request, res: Response ) =>{
  try{
    const { email, password } = req.body;
     const user = await User.findOne({ email });

     if (!user) 
      return res.status(404).json({message: "User not found "});
      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch) return res.status(400).json({ message: "Invalid password"});
      const token = jwt.sign({ id: user._id}, JWT_SECRET, { expiresIn: "1h"});

      return res.status(200).json({ message: "Login success ", token, user });
  }  catch (err) {
    return res.status(500).json({ message: "Login error", error: err});
  }
};

export const getProfile = async (req: Request, res: Response ) =>{
  try{
    const user = await User.findById((req as any).userId).select('-password');


    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Profile error", error:err});
  }
};
