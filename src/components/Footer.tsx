import Image from "next/image";
import Link from "next/link";

const navigation = {
  product: [
    {name: 'JSON Home', href: 'https://jsonhome.com'},
    {name: 'Compare JSON', href: 'https://www.comparejson.com'},
    {name: 'Photo Maker', href: 'https://photomaker.co'},
  ],
  legal: [
    {name: 'Privacy Policy', href: '/'},
    {name: 'Terms & Conditions', href: '/'},
  ]
}

export default function Footer({
                                 locale = '',
                                 description = '',
                                 footerText
                               }) {
  return (
    <footer className="bg-[#44403C] footer flex flex-col" aria-labelledby="footer-heading">
      <div className="mx-auto flex item-center max-w-7xl p-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-4  xl:gap-8">
          <div className="space-y-1 xl:col-span-2">
            <a href={`/${locale}`}>
              <Image
                className="h-10"
                src="/appicon.svg"
                width={32}
                height={32}
                alt="jsonhome.com"
              />
            </a>
            <p className="text-sm text-white">
              {footerText.title}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="text-sm font-semibold leading-6 text-white"></div>
                <ul role="list" className="mt-6 space-y-4">
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <div className="text-sm font-semibold leading-6 text-white"></div>
                <ul role="list" className="mt-6 space-y-4">

                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="text-sm font-semibold leading-6 text-white">Product</div>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => {
                      return (
                        <li key={item.name}>
                          <Link href={`${item.href}`}
                                target={"_blank"}
                                className="text-sm leading-6 text-gray-300 hover:text-[#2d6ae0]">
                            {item.name}
                          </Link>
                        </li>
                      )
                    }
                  )}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <div className="text-sm font-semibold leading-6 text-white">Legal</div>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => {
                      let hrefTo = `/${locale}${item.href}`;
                      if (locale == 'en') {
                        hrefTo = `${item.href}`;
                      }
                      return (
                        <li key={item.name}>
                          <Link href={`${hrefTo}`}
                                className="text-sm leading-6 text-gray-300 hover:text-[#2d6ae0]">
                            {item.name}
                          </Link>
                        </li>
                      )
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>

  )
}
