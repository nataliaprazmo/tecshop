"use client";

const globalState = {
	microinteractionsEnabled: false,
};

// if (typeof window !== "undefined") {
// 	if (globalState.microinteractionsEnabled) {
// 		document.documentElement.classList.remove("reduced-motion");
// 	} else {
// 		document.documentElement.classList.add("reduced-motion");
// 	}
// }

export default globalState;
