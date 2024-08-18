import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
         return [
           {
              source: '/compare.html',
              destination: '/en/json-compare',
           },
           {
             source: '/freejson.html',
             destination: '/en/json-editor',
          },
          {
               source: '/index.html',
               destination: '/en/',
          },
         ]
        }

};

export default withNextIntl(nextConfig);
