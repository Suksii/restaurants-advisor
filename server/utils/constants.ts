export const jwtSecret = process.env.JWT_SECRET as string;
export const port = process.env.PORT || (4000 as number);
export const clientOrigin = process.env.CLIENT_ORIGIN as string;
export const mongoUri = process.env.MONGO_URI as string;
