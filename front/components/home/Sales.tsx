import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'react-feather';
import { SalesProps } from '@/types';

const Sales:React.FC=()=>{
    const promotions: SalesProps[] = [
        {
          title: "PRZECENA",
          subtitle: "Wszystkie Smartwatche",
          discount: "-10%",
          image: "/images/smartwatch.png",
          href: "/promocje/smartwatche",
        },
        {
          title: "WYPRZEDAŻ",
          subtitle: "Słuchawki bezprzewodowe",
          discount: "do -40%",
          image: "/images/headphones.png",
          href: "/promocje/sluchawki",
        },
      ];
      return (
        <section className="mb-20 px-20">
            <h2 className="text-xl font-bold mb-4">Nasze promocje</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {promotions.map((promo) => (
                <div 
                  key={promo.title}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white flex"
                >
                  <div className="p-6 flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-gray-600 mb-1">{promo.subtitle}</p>
                    <p className="text-blue-600 font-bold text-xl mb-6">{promo.discount}</p>
                    <Link 
                      href={promo.href} 
                      className="inline-flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                    >
                      <span>SPRAWDŹ</span>
                      <ArrowRight className='w-5 h-5'/>
                    </Link>
                  </div>
                  
                  <div className="flex-1 bg-gray-100">
                    <Image
                      src={promo.image}
                      alt={promo.subtitle}
                      width={400}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
        </section>
      );
}

export default Sales;