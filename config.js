const environment = process.env.NODE_ENV;

const environmentConfigis = {};

if (environment === 'production') {
    console.log('PRODUCCION');
    // TODO: Modificar environmentConfigis según sea necesario
} else {
    environmentConfigis.url = 'http://localhost:3001';
}

module.exports = {
    ...environmentConfigis,
    PORT: 3001,
    static: './dist',
};