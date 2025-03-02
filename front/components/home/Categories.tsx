import { CategoryProps } from "@/types";
import Link from "next/link";

const Categories:React.FC=()=>{
    const categories: CategoryProps[] = [
        { name: "Laptopy", href: "/kategoria/laptopy" },
        { name: "Smartphony", href: "/kategoria/smartphony" },
        { name: "Smartwatche", href: "/kategoria/smartwatche" },
        { name: "Tablety", href: "/kategoria/tablety" },
        { name: "Akcesoria", href: "/kategoria/akcesoria" },
      ];

      return (
        <section className="mb-20 px-20">
            <h2 className="text-xl font-bold mb-4">Najpopularniejsze kategorie</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="bg-indigo-100 shadow-sm border border-gray-200 rounded-lg p-8 text-center hover:bg-blue-100 transition-colors"
                >
                  <span className="font-bold text-lg 2xl:text-xl">{category.name}</span>
                </Link>
              ))}
            </div>
        </section>
      );

}

export default Categories;