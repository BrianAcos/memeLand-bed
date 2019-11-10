const environment = process.env.NODE_ENV;

const environmentConfigis = {};

if (environment === 'production') {
    // TODO: Modificar environmentConfigis según sea necesario
} else {
    // TODO: Modificar environmentConfigis según sea necesario
}

module.exports = {
    ...environmentConfigis,
    PORT: 3001,
    static: './public',
};