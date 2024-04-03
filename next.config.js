/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/en/home",
        permanent: true,
      },
    ];
  },
  env: {
    API_PROD_URL: "http://142.93.64.125:8000/api/",
    // API_PROD_URL: "http://localhost:8000/api/",
    // API_PROD_URL: "https://laravel.pixelstrap.net/fastkart/api/",
    PAYMENT_RETURN_URL: "http://localhost:3000",
    PAYMENT_CANCEL_URL: "http://localhost:3000/",
    OPENAI_API_KEY: "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",
    ANYSCALE_API_KEY: "esecret_4kqwivwxj38wwycqyuglg8ah9q"
  },
  images: {
    loader: "custom",
    loaderFile: "./src/Utils/ImageLoader/imageloader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net",
      },
      {
        protocol: "http",
        // hostname: "localhost",
        hostname: "142.93.64.125:8000",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
