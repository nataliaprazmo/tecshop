import Link from "next/link";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-100 pt-12 pb-8 mt-16 flex flex-col items-center">
			<div className="px-20 flex justify-between">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					<div>
						<h3 className="font-bold text-lg mb-4">TecSklep</h3>
						<p className="text-gray-600">
							Najlepszy sklep z technologią. Oferujemy szeroki
							wybór urządzeń elektronicznych w konkurencyjnych
							cenach.
						</p>
					</div>

					<div>
						<h3 className="font-bold text-lg mb-4">
							Szybkie linki
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-600 hover:text-primary transition-colors"
								>
									O nas
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="text-gray-600 hover:text-primary transition-colors"
								>
									Kontakt
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="text-gray-600 hover:text-primary transition-colors"
								>
									Polityka prywatności
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-bold text-lg mb-4">Kontakt</h3>
						<address className="text-gray-600 not-italic">
							<p>ul. Technologiczna 15</p>
							<p>00-000 Lublin</p>
							<p className="mt-2">kontakt@tecsklep.pl</p>
							<p>+48 123 456 789</p>
						</address>
					</div>
				</div>
			</div>
			<div className="pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
				<p>
					&copy; {new Date().getFullYear()} TecSklep. Wszystkie prawa
					zastrzeżone.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
