module.exports = (config) => {
  // react 配置，cssmodulle配置
  config.module?.rules?.forEach((x) => {
    if (typeof x === "string") {
      return;
    }

    if (x.test?.toString() === /\.scss$|\.sass$/.toString()) {
      x.test = (path) =>
        (path.endsWith(".scss") || path.endsWith(".scss")) &&
        !path.endsWith(".module.scss") &&
        !path.endsWith(".module.sass");
    } else if (x.test?.toString().includes("scss")) {
      console.warn(
        `Some special scss rules appeared\nMaybe you should check and modify your extra-webpack.config.ts`
      );
      console.warn(x);
    }
  });
  config.module?.rules?.unshift(
    {
      test: /\.module\.scss$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        "sass-loader",
      ],
    },
    // 不加这个，打包出来的antd会丢失代码
    {
      test: /antd\/.*.js/i,
      sideEffects: true,
    }
  );
  // react 配置

  return config;
};
