const mongoBaseUrl = 'mongodb://161.35.70.152:27017';
const mongoUrl = process.env.PROD
    ? `${mongoBaseUrl}/acua`
    : `${mongoBaseUrl}/dev-acua`;

export const environment = {
    production: process.env.PROD ?? false,
    port: process.env.PORT ?? 3000,
    mongoUrl
};
