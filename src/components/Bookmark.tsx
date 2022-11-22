import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import useJobsStore from '@/store';
import BookmarkIcon from '@/ui/BookmarkIcon';

const BookmarkContainer = styled.button<{ selected?: boolean }>`
	${tw`
		inline-flex
		flex-nowrap
		items-center
		gap-4
		p-1
		hover:cursor-pointer
		[svg]:h-full
		[svg]:w-4
		[svg]:active:scale-95
		[path]:hover:stroke-appTextPrimary
	`}
	${(props) =>
		props.selected &&
		tw`
			[path]:hover:stroke-appTextPrimary
			[path]:hover:fill-appTextPrimary
		`}
`;

const BookmarkText = tw.span`
	w-max
`;

type BookmarkProps = {
	id: string;
	text?: string;
};

function Bookmark({ id, text }: BookmarkProps) {
	const setBookmark = useJobsStore((state) => state.setBookmark);
	const job = useJobsStore((state) => state.getJob(id));

	const [isBookmark, setIsBookmark] = useState(job?.bookmark || false);

	const handleBookmark = (id: string) => {
		setBookmark(id);
		setIsBookmark(!isBookmark);
	};

	return (
		<BookmarkContainer onClick={() => handleBookmark(id)} selected={isBookmark}>
			<BookmarkIcon selected={isBookmark} />
			{text && <BookmarkText>{text}</BookmarkText>}
		</BookmarkContainer>
	);
}

export default Bookmark;
