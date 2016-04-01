require.config({
    baseUrl: './build',
    paths: {
        react: '../node_modules/react/dist/react',
        'react-dom': '../node_modules/react-dom/dist/react-dom',
        snapsvg: '../node_modules/snapsvg/dist/snap.svg'
    }
});

define(['app'], function (app) {});