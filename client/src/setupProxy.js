const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/result",
//     createProxyMiddleware({
//       target: "http://localhost:5000",
//       changeOrigin: true,
//     })
//   );
// };

module.exports = function (app) {
  app.use(
    "/result",
    createProxyMiddleware({
      target: "https://resumaid.herokuapp.com",
      changeOrigin: true,
    })
  );
};
