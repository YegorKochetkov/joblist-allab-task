import React from 'react';
import tw from 'twin.macro';

const LocationContainer = tw.svg`
	inline-block
	w-[0.85rem]
	fill-appTextSecondary
	transition-colors
`;

function LocationIcon() {
	return (
		<LocationContainer
			viewBox='0 0 13 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6.5 18C6.5 18 13 11.9706 13 7C13 2.02944 10.0899 0 6.5 0C2.91015 0 0 2.02944 0 7C0 11.9706 6.5 18 6.5 18ZM6.5 10C8.433 10 10 8.433 10 6.5C10 4.567 8.433 3 6.5 3C4.567 3 3 4.567 3 6.5C3 8.433 4.567 10 6.5 10Z'
			/>
		</LocationContainer>
	);
}

export default LocationIcon;
