import React, { useState } from 'react';
import useJobsStore from '@/store';
import tw from 'twin.macro';
import StarIcon from '@/ui/StarIcon';

const RatingContainer = tw.div`
	flex
	flex-col
	justify-center
	items-center
	gap-4
`;

const StarContainer = tw.div`
	flex
	flex-row
	flex-nowrap
	justify-center
	items-center
`;

const StarWrapper = tw.span``;

const StarText = tw.span`
	text-[1.1rem]
`;

type StarProps = {
	maxRating?: number;
	text?: string;
	id: string;
};

function Rating({ maxRating = 5, id, text }: StarProps) {
	const job = useJobsStore((state) => state.getJob(id));
	const setRating = useJobsStore((state) => state.setRating);
	const rating = job?.rating || -1;

	const [currentRating, setCurrentRating] = useState(rating);

	const stars: string[] = Array(maxRating).fill('star');

	const handleSetRating = (id: string, newRating: number) => {
		if (rating === 1 && newRating + 1 === 1) {
			setRating(id, -1);
			setCurrentRating(-1);
		} else {
			setRating(id, newRating + 1);
			setCurrentRating(newRating + 1);
		}
	};

	return (
		<RatingContainer>
			{text && <StarText>{text}</StarText>}
			<StarContainer>
				{stars.map((_, index) => (
					<StarWrapper onClick={() => handleSetRating(id, index)} key={index}>
						<StarIcon selected={currentRating > index} />
					</StarWrapper>
				))}
			</StarContainer>
		</RatingContainer>
	);
}

export default Rating;
