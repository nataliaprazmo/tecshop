import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "react-feather";
import { SalesProps } from "@/types";
import globalState from "@/lib/globalState";

const Sales: React.FC = () => {
	const microinteractionsOn = globalState.microinteractionsEnabled;
	const promotions: SalesProps[] = [
		{
			title: "PRZECENA",
			subtitle: "Wszystkie Smartwatche",
			discount: "-10%",
			image: "/images/smartwatch.png",
			href: "/products/4",
		},
		{
			title: "WYPRZEDAŻ",
			subtitle: "Słuchawki bezprzewodowe",
			discount: "-25%",
			image: "/images/headphones.png",
			href: "/products/5",
		},
	];
	return (
		<section className="mb-20 px-20">
			<h2 className="text-xl font-bold mb-4">Nasze promocje</h2>

			<div className="grid md:grid-cols-2 gap-8">
				{promotions.map((promo) => (
					<Link
						href={promo.href}
						key={promo.title}
						className={`border border-gray-200 rounded-lg overflow-hidden bg-white flex ${
							microinteractionsOn &&
							"hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 hover:shadow-md group"
						}`}
					>
						<div className="p-6 flex-1 flex flex-col items-center justify-center">
							<h3
								className={`text-xl mb-2 ${
									microinteractionsOn && "font-bold"
								}`}
							>
								{promo.title}
							</h3>
							<p className="text-gray-600 mb-1">
								{promo.subtitle}
							</p>
							<p
								className={`text-xl mb-6 ${
									microinteractionsOn &&
									"text-primary font-bold transition-all duration-300 group-hover:scale-110 group-hover:font-extrabold"
								}`}
							>
								{promo.discount}
							</p>
							{microinteractionsOn && (
								<div
									className={`inline-flex items-center gap-1 text-gray-700 ${
										microinteractionsOn &&
										"group-hover:text-primary group-hover:font-semibold transition-colors duration-300"
									}`}
								>
									<span>SPRAWDŹ</span>
									<ArrowRight
										className={`w-5 h-5 ${
											microinteractionsOn &&
											"transition-transform duration-300 group-hover:translate-x-1"
										}`}
									/>
								</div>
							)}
						</div>

						<div className="flex-1 bg-gray-100 overflow-hidden">
							<Image
								src={promo.image}
								alt={promo.subtitle}
								width={400}
								height={320}
								className={`w-full h-full object-cover ${
									microinteractionsOn &&
									"transition-transform duration-300 group-hover:scale-105"
								}`}
							/>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Sales;
