// 아직 테스트 중
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
  app.use(
    '/', // 프론트엔드에서 이 경로로 시작하는 요청은 프록시됩니다.
    createProxyMiddleware({
      target: 'http://localhost:8000', // 백엔드 서버의 주소
      changeOrigin: true, // 프론트엔드에서의 요청을 백엔드로 변경
    })
  );
};
