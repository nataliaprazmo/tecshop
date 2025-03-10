"use client";

import React, { useRef, useEffect } from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "../ui/Button";

interface ClearCartModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const ClearCartModal: React.FC<ClearCartModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
				document.body.style.paddingRight = "0";
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(e.target as Node)
			) {
				onClose();
				document.body.style.paddingRight = "0";
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;
	document.body.style.paddingRight = `${scrollbarWidth}px`;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="fixed inset-0 bg-transparent backdrop-blur-sm"></div>
			<div
				ref={modalRef}
				className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100 border border-purple-400"
			>
				<div className="flex items-center mb-4 text-secondary">
					<AlertTriangle size={24} />
					<h3 className="ml-3 text-xl font-semibold">
						Potwierdź akcję
					</h3>
				</div>

				<p className="mb-6 text-gray-700">
					Czy na pewno chcesz wyczyścić koszyk?
				</p>

				<div className="flex justify-end space-x-3">
					<button
						onClick={() => {
							document.body.style.paddingRight = "0";
							onClose();
						}}
						className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
					>
						Anuluj
					</button>
					<Button onClick={onConfirm}>Potwierdź</Button>
				</div>
			</div>
		</div>
	);
};

export default ClearCartModal;
