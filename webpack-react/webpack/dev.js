const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname),
    },
    client: {
      // 오류 또는 경고가 있는경우 브라우저 전체 오버레이
      overlay: {
        // 오류 표시
        errors: true,
      },
      // 브라우저 컴파일 진행율
      progress: true,
    },
  },
};
