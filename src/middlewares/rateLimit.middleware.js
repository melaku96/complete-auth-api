import rateLimit from 'express-rate-limit'


const skipOptions = (req)=> req.method === "OPTIONS";

const limitHandler = (req, res)=>{
    const retryAfter = res.getHeader("Retry-After") || 0;
    const minutes = Math.ceil(retryAfter/60);
    res.status(429).json({
        success: false,
        message: `Too many attempts. Try agin in ${minutes} minutes `,
    });
};
const createHandler = ({windowMs, max})=>{
    return rateLimit({
        windowMs,
        max,
        skip: skipOptions,
        handler: limitHandler
    });
};

//general limiter
export const apiLimiter = createHandler({ windowMs: 15*60*1000, max:100})
//stricter limiter for user route
export const authLimiter = createHandler({windowMs: 10*60*100, max: 5});
