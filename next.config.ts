const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    domains: [
      "admin.groundpass.be",
      "groundpass-storage.ams3.digitaloceanspaces.com",
    ],
  },
  webpack(config: any) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
        },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
