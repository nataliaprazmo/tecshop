'use client';
import { ProductDetailsProps } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import DetailsAccordion from "./DetailsAccordion";

const ProductInfo:React.FC<ProductDetailsProps> = ({
    name,
    price,
    description,
    details,
    categoryId,
    manufacturer,
    model,
    isDiscounted,
    discountPercent,
    processor,
    graphicsCard,
    operatingSystem,
    batteryLife,
    screenSize,
    connectivity
  }) => {
    const finalPrice = isDiscounted && discountPercent ? price * (1 - discountPercent / 100) : price;
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const [categoryName, setCategoryName] = useState("produkt");
  
    const incrementQuantity = () => {
      setQuantity(prev => prev + 1);
    };
  
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
      }
    };
  
    const toggleAccordion = (index: number) => {
      setActiveAccordion(activeAccordion === index ? null : index);
    };

    const accordionDetails = [
        {
          title: "Product Details",
          content: details
        },
        {
          title: "Producent",
          content: `
            Manufacturer: ${manufacturer}\nModel: ${model}
          `
        },
        {
          title: "Technical Specifications",
          content: [
            processor && `Processor: ${processor}`,
            graphicsCard && `Graphics Card: ${graphicsCard}`,
            operatingSystem && `Operating System: ${operatingSystem}`,
            batteryLife && `Battery Life: ${batteryLife}`,
            screenSize && `Screen Size: ${screenSize}`,
            connectivity && `Connectivity: ${connectivity}`
          ].filter(Boolean).join('\n')
        }
      ];

    useEffect(() => {
      const getCategoryName = async () => {
        try {
          const response = await fetch(
					  "http://localhost:5000/api/categories/" + categoryId,
					{
						method: "GET",
					}
				);
				if (response.status === 200) {
					const res = await response.json();
					setCategoryName(res.category.name);
				}
			} catch (error) {
				console.log(error);
			}
      };
      getCategoryName();
    }, []);

    return <div className="flex flex-col justify-between items-start h-full">
        <div className="w-full">
        <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <p className="text-3xl font-bold text-primary">
                {isDiscounted ? (
                    <>
                    <span className="line-through text-gray-400 font-normal text-sm -mb-1">{price}zł</span>{" "}
                    {finalPrice.toFixed(2)}zł</>
                ) : (
                    `${price}zł`
                )}
              </p>
            </div>
            <span
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700"
            >
                {categoryName}
            </span>
            <p className="text-gray-700 mt-4">{description}</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-x border-gray-300"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <Button>
                Dodaj do koszyka
              </Button>
            </div>
        </div>
        <div className="border-t border-gray-200 w-full">
        {accordionDetails.map((detail, index) => (
          <DetailsAccordion
            key={index}
            title={detail.title}
            content={detail.content}
            isOpen={activeAccordion === index}
            onClick={() => toggleAccordion(index)}
          />
        ))}
        </div>
    </div>
}

export default ProductInfo;