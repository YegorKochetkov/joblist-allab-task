import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import ReactPaginate from 'react-paginate';
import JobsList from './JobsList';
import styled from 'styled-components';
import Arrow from '@/ui/ArrowIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { appJobsListPath } from '@/router/router';
import useJobsStore from '@/store';

const MyPaginate = styled(ReactPaginate).attrs({
	activeClassName: 'active', // default to "selected"
})`
	${tw`
		flex
		items-center
		gap-[1px]
		w-min
		mx-auto
		mt-12
		mb-8
		px-6
		py-[0.3rem]
		sm:py-[0.6rem]
		rounded-lg
		shadow-md
		list-none
		bg-white
		text-base
		sm:text-xl
		leading-[1.6rem]
		tracking-widest
		font-bold
	`}
	${tw`
		[a]:text-appGrey
		[a]:p-[0.5rem]
		[a]:sm:p-[0.65rem]
		[a]:cursor-pointer
		[a]:border-b-[3px]
		[a]:border-b-transparent
		[a:hover]:border-b-appBlue
		[a]:transition-colors
	`}
	${tw`
		[.active_a]:text-appBlue
		[.active_a]:border-b-[3px]
		[.active_a]:border-b-appBlue
		[.active_a]:cursor-default
	`}
	${tw`
		[.break_a:hover]:border-b-[3px]
		[.break_a:hover]:border-b-appBlue
	`}
	${tw`
		[.disabled]:text-appLightGrey
		[.disabled.previous_a:hover_svg]:fill-appLightGrey
		[.disabled.next:hover_svg]:fill-appLightGrey
		[.disabled_a:hover]:cursor-default
	`}
	${tw`
		[.previous_svg]:absolute
		[.previous_svg]:left-0
		[.previous_svg]:fill-appLightGrey
		[.previous_a:hover_svg]:fill-appBlue
		[.next_svg]:absolute
		[.next_svg]:right-0
		[.next_svg]:rotate-180
		[.next_svg]:fill-appLightGrey
		[.next_a:hover_svg]:fill-appBlue
	`}
	${tw`
		[.previous_a]:relative
		[.previous_a]:flex
		[.previous_a]:items-center
		[.previous_a]:h-full
		[.previous_a]:p-0
		[.previous_a]:mr-8
		[.previous_a]:sm:mr-10
		[.previous_a]:border-0
	`}
	${tw`
		[.next_a]:relative
		[.next_a]:flex
		[.next_a]:items-center
		[.next_a]:h-full
		[.next_a]:p-0
		[.next_a]:ml-8
		[.next_a]:sm:ml-10
		[.next_a]:border-0
	`}
	${tw`
		[.previous_a::after]:content-['']
		[.previous_a::after]:h-[1.9rem]
		[.previous_a::after]:ml-10
		[.previous_a::after]:border-r-2
		[.previous_a::after]:border-appLightGrey
	`}
	${tw`
		[.next_a::after]:content-['']
		[.next_a::after]:h-[1.9rem]
		[.next_a::after]:mr-10
		[.next_a::after]:border-l-2
		[.next_a::after]:border-appLightGrey
	`}
`;

const JobsListContainer = tw.div`container mx-auto`;

const itemsPerPage = 5;

function PaginatedItems() {
	const items = useJobsStore((state) => state.jobs) || [];
	const navigate = useNavigate();
	const { page } = useParams();
	const paramsPage = Number(page) - 1;
	const pageCount = Math.ceil(items.length / itemsPerPage);

	const [itemOffset, setItemOffset] = useState(0);
	const [currPage, setCurrPage] = useState(0);

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = items.slice(itemOffset, endOffset);

	const getNewPageList = (page: number) => {
		const newOffset = (page * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	};

	const handlePageClick = (event: { selected: number }) => {
		getNewPageList(event.selected);
		navigate(appJobsListPath + (event.selected + 1));
	};

	useEffect(() => {
		document.body.scrollTo(0, 0); // For Safari
		document.documentElement.scrollTo(0, 0); // For Chrome, Firefox, IE and Opera
	}, [itemOffset]);

	useEffect(() => {
		if (paramsPage >= pageCount) {
			getNewPageList(pageCount - 1);
			setCurrPage(pageCount - 1);
			navigate(appJobsListPath + pageCount);
		} else {
			getNewPageList(paramsPage);
			setCurrPage(paramsPage);
		}
	}, [paramsPage, pageCount]);

	return (
		<JobsListContainer>
			<JobsList jobs={currentItems} />
			<MyPaginate
				breakLabel='...'
				nextLabel={<Arrow />}
				previousLabel={<Arrow />}
				onPageChange={handlePageClick}
				pageRangeDisplayed={4}
				marginPagesDisplayed={1}
				pageCount={pageCount}
				forcePage={currPage}
			/>
		</JobsListContainer>
	);
}

export default PaginatedItems;
