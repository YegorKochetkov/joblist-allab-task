import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Bookmark = styled.svg<{ selected?: boolean }>`
	${tw`
		w-[1.1rem]
		fill-transparent
		transition-colors
		[>path]:transition-colors
		[>path]:stroke-appTextSecondary
	`}
	${(props) =>
		props.selected &&
		tw`
			fill-appTextSecondary
			[>path]:stroke-appTextSecondary
		`}
`;

type BookmarkProps = {
	selected?: boolean;
};

function BookmarkIcon({ selected }: BookmarkProps) {
	return (
		<Bookmark
			viewBox='0 0 18 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			selected={selected}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M1 3.99992C1 2.52716 2.19391 1.33325 3.66667 1.33325H14.3333C15.8061 1.33325 17 2.52716 17 3.99992V19.9933C17 21.1593 15.609 21.7636 14.7567 20.9679L9.90994 16.4426C9.39761 15.9642 8.60239 15.9642 8.09007 16.4426L3.24327 20.9679C2.39104 21.7636 1 21.1593 1 19.9933V3.99992Z'
				strokeWidth='2'
			/>
		</Bookmark>
	);
}

export default BookmarkIcon;
