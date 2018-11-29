module.exports = {
  entry: __dirname + "/js/index.js", //ビルドするファイル
  output: {
    path: __dirname +'/dist', //ビルドしたファイルを吐き出す場所
    filename: 'bundle.js' //ビルドした後のファイル名
  },
    module: {
    rules: [
        {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query://loaderに渡したいクエリパラメータを指定します
          {
            presets: ['es2015','stage-0']
          }
        }
      ]
  }
};
