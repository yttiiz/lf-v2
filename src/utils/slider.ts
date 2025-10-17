import type { RefObject } from "react";

export class SliderHandler {
	private moveSlider(
		slider: HTMLUListElement,
		sliderLength: number,
		index: number,
	) {
		const slideWidth = slider.clientWidth / sliderLength;
		slider.style.transform = `translateX(-${slideWidth * index}px)`;
	}

	private changeBtnsVisibility = ({
		prevBtn,
		nextBtn,
		sliderLength,
		index,
	}: {
		prevBtn: HTMLButtonElement;
		nextBtn: HTMLButtonElement;
		sliderLength: number;
		index: number;
	}) => {
		const className = "hidden";

		switch (index) {
			case 0:
				prevBtn.classList.add(className);

				if (nextBtn.classList.contains(className)) {
					nextBtn.classList.remove(className);
				}
				break;

			case sliderLength - 1:
				nextBtn.classList.add(className);

				if (prevBtn.classList.contains(className)) {
					prevBtn.classList.remove(className);
				}
				break;

			default:
				if (prevBtn.classList.contains(className)) {
					prevBtn.classList.remove(className);
				}

				if (nextBtn.classList.contains(className)) {
					nextBtn.classList.remove(className);
				}
		}
	};

	public handleHomeSlider(sliderRef: RefObject<HTMLDivElement | null>) {
		if (sliderRef && sliderRef.current) {
			const slider = sliderRef.current.querySelector<HTMLUListElement>("ul");

			const switchActiveLandmark = (
				landmarks: HTMLUListElement | null | undefined,
				index: number,
				key = 0,
			) => {
				if (landmarks) {
					for (const landmark of landmarks.children) {
						const circle = landmark.querySelector("span");

						if (circle) {
							if (index === key) {
								circle.classList.add("active");
							}

							if (index !== key && circle.classList.contains("active")) {
								circle.classList.remove("active");
							}
							key++;
						}
					}
				}
			};

			if (slider) {
				const sliderLength = slider.children.length;
				const buttons = slider.closest("div")?.querySelectorAll("button");
				const landmarks = slider
					.closest("div")
					?.querySelector<HTMLUListElement>(".landmarks");

				let index = 0;

				if (buttons) {
					const [prevBtn, nextBtn] = buttons;

					// Check slider length to display or not buttons and landmarks.
					if (sliderLength === 1) {
						nextBtn.classList.add("hidden");
					} else {
						if (landmarks) {
							for (let i = 0; i < sliderLength; i++) {
								const circle = document.createElement("span");
								const landmark = document.createElement("li");

								landmark.appendChild(circle);
								landmarks.appendChild(landmark);

								i === 0
									? landmarks?.children[i]
											?.querySelector("span")
											?.classList.add("active")
									: null;
							}
						}

						prevBtn.addEventListener("click", () => {
							if (index <= 0) return;

							index--;
							this.moveSlider(slider, sliderLength, index);
							this.changeBtnsVisibility({
								prevBtn,
								nextBtn,
								sliderLength,
								index,
							});
							landmarks ? switchActiveLandmark(landmarks, index) : null;
						});

						nextBtn.addEventListener("click", () => {
							if (index >= sliderLength - 1) return;

							index++;
							this.moveSlider(slider, sliderLength, index);
							this.changeBtnsVisibility({
								prevBtn,
								nextBtn,
								sliderLength,
								index,
							});
							landmarks ? switchActiveLandmark(landmarks, index) : null;
						});
					}
				}
			}
		}
	}
}
