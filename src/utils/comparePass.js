import bcrypt from 'bcryptjs'

export const comparePassword = async(password, hashed)=>{
    return bcrypt.compare(password, hashed);
};