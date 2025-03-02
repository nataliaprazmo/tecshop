import Link from 'next/link';
import SearchInput from '../ui/SearchInput';
import {ShoppingCart, ChevronDown} from "react-feather";

const Header: React.FC = () => {
    return <header className='w-screen overflow-hidden flex items-center justify-between px-20 py-8 shadow'>
        <Link href="/" className="text-3xl 2xl:text-4xl font-bold hover:font-extrabold transition-all min-w-36 2xl:min-w-[164px]">
            TecSklep
          </Link>
          <div>
            <Link href="/" className='text-base 2xl:text-xl mr-4 2xl:mr-6 hover:font-bold transition-all'>Strona główna</Link>
            <Link href="/products" className='text-base 2xl:text-xl hover:font-bold transition-all'>Produkty</Link>
          </div>
          <div className='flex items-center gap-8 2xl:gap-10'>
            <SearchInput />
            <Link 
            href="/login" 
            className="2xl:py-3 py-2 2xl:px-9 px-4 border border-gray-400 rounded-md hover:bg-gray-100 transition-colors"
          >
            Zaloguj się
          </Link>
          <Link 
            href="/koszyk" 
            className="flex items-center font-semibold bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary text-transparent bg-clip-text transition-colors text-base 2xl:text-xl"
          >
            <ShoppingCart className='text-primary'/>
            <span className="ml-2 2xl:ml-3">Koszyk</span>
          </Link>
          <div className="flex items-center">
            <span className="text-sm">PLN</span>
            <ChevronDown/>
          </div>
          </div>
    </header>
}

export default Header;