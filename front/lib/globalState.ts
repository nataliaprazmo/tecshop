"use client";

import { useEffect, useState } from "react";

const globalState = {
	microinteractionsEnabled: true,

	listeners: new Set<() => void>(),

	notifyListeners() {
		this.listeners.forEach((listener) => listener());
	},

	init() {
		if (typeof window === "undefined") return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (prefersReducedMotion) {
			this.microinteractionsEnabled = false;
		} else {
			const saved = localStorage.getItem("microinteractionsEnabled");
			this.microinteractionsEnabled =
				saved === null ? true : saved === "true";
		}

		this.applyToDOM();

		window
			.matchMedia("(prefers-reduced-motion: reduce)")
			.addEventListener("change", (e) => {
				if (e.matches) {
					this.microinteractionsEnabled = false;
					this.applyToDOM();
					this.notifyListeners();
				}
			});
	},

	toggleMicrointeractions() {
		this.microinteractionsEnabled = !this.microinteractionsEnabled;

		if (typeof window !== "undefined") {
			localStorage.setItem(
				"microinteractionsEnabled",
				String(this.microinteractionsEnabled)
			);
		}
		this.applyToDOM();
		this.notifyListeners();

		return this.microinteractionsEnabled;
	},

	applyToDOM() {
		if (typeof window === "undefined") return;

		if (this.microinteractionsEnabled) {
			document.documentElement.classList.remove("reduced-motion");
		} else {
			document.documentElement.classList.add("reduced-motion");
		}
	},
};

export function useMicrointeractions() {
	const [enabled, setEnabled] = useState(
		globalState.microinteractionsEnabled
	);

	useEffect(() => {
		const listener = () => {
			setEnabled(globalState.microinteractionsEnabled);
		};

		globalState.listeners.add(listener);

		return () => {
			globalState.listeners.delete(listener);
		};
	}, []);

	const toggle = () => {
		globalState.toggleMicrointeractions();
	};

	return { enabled, toggle };
}

export default globalState;
