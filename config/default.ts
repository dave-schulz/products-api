export default {
port: process.env.PORT,
dbUri: process.env.MONGO_URL,
saltWorkFactor: 10,
accessTokenTtl: '15m',
refreshTokenTtl: '1y',
privateKey: `${process.env.PRIVATE_KEY}`,
publicKey: `${process.env.PUBLIC_KEY}`
};
