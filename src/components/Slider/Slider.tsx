import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import './slider.css';

type SliderProps = {
	items: JSX.Element[];
};

function Slider({ items }: SliderProps) {
	const responsive = {
		0: { items: 1 },
	};

	return (
		<AliceCarousel
			disableButtonsControls
			disableDotsControls
			autoWidth
			responsive={responsive}
			mouseTracking
			items={items}
			paddingLeft={16}
			paddingRight={16}
		/>
	);
}

export default Slider;
