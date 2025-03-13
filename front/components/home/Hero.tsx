import Image from "next/image";
import { ArrowRight, Star } from "react-feather";
import { Button } from "../ui/Button";
import Link from "next/link";
import globalState from "@/lib/globalState";

const Hero: React.FC = () => {
	return (
		<section className="pt-10 pb-20 relative overflow-hidden w-full">
			<div className="px-20 grid md:grid-cols-2 gap-8 items-center">
				<div>
					<h1 className="text-2xl lg:text-3xl font-bold mb-2">
						Najlepsza technologia w Twoich rękach
					</h1>
					<div className="flex items-center mb-3 gap-2">
						{globalState.microinteractionsEnabled && (
							<Star className="w-4 h-4 2xl:w-5 2xl:h-5 text-secondary" />
						)}
						<span className="text-base 2xl:text-xl font-semibold">
							Topowe marki, autoryzowany sklep, gwarancja jakości
						</span>
					</div>
					<p className="text-gray-700 mb-6 text-base 2xl:text-xl max-w-[490px]">
						Najnowsze smartfony, inteligentne zegarki i gadżety,
						które podkręcą Twój styl życia. Najlepsze ceny, szybka
						dostawa, 100% satysfakcji!
					</p>
					<Link href="/products">
						<Button
							className={`relative overflow-hidden group ${
								globalState.microinteractionsEnabled &&
								"shadow-lg shadow-primary/40"
							}`}
						>
							<span className="relative z-10 inline-flex items-center">
								Sprawdź ofertę
								{globalState.microinteractionsEnabled && (
									<ArrowRight className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0" />
								)}
							</span>
						</Button>
					</Link>
				</div>

				<div className="relative">
					<Image
						src="/images/hero-image.png"
						alt="Technologia"
						className="object-contain"
						width={680}
						height={400}
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
