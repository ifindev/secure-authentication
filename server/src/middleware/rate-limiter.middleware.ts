import rateLimit from 'express-rate-limit';

// 🔹 General API Rate Limiter (100 requests per 15 minutes)
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs,
    message: {
        errors: 'Too many requests, please try again later.',
    },
    headers: true,
});

// 🔹 Login Rate Limiter (5 attempts per 15 minutes)
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        errors: 'Too many failed login attempts. Please try again later.',
    },
    headers: true,
});

// 🔹 Refresh Token Rate Limiter (10 requests per 15 minutes)
export const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        errors: 'Too many refresh attempts. Try again later',
    },
    headers: true,
});
