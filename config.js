const environment = process.env.NODE_ENV;

const environmentConfigis = {};

if (environment === 'production') {
    console.log('PRODUCCION');
    environmentConfigis.url = 'https://meme-land-test.herokuapp.com'
    environmentConfigis.production = true;
} else {
    console.log('DEBUGGER');
    environmentConfigis.url = 'http://localhost:3001';
    environmentConfigis.production = false;
}

module.exports = {
    ...environmentConfigis,
    PORT: process.env.PORT || 3001,
    static: './dist',
};