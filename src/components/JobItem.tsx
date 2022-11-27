import React, { memo, useMemo } from 'react';
import tw from 'twin.macro';
import Stars from '@/components/Rating';
import Bookmark from '@/components/Bookmark';
import LocationIcon from '@/ui/LocationIcon';
import daysBetweenDates from '@/utils/daysBetweenDates';
import { SCREENS } from '@/utils/screens';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { appJobDetailsPath } from '@/router/router';
import useJobsStore from '@/store';
import ErrorMessage from './ErrorMessage';
import Date from './Date';
import { mapSearchLink } from '@/utils/urls';

const JobItemContainer = tw.article`
	grid
	grid-cols-[auto_1fr_auto]
	grid-rows-[min-content,_1fr]
	md:grid-rows-none
	md:grid-cols-[auto_minmax(25%,_1fr)_auto_auto]
	gap-y-3
	gap-x-5
	md:gap-7
	w-full
	min-w-[25rem]
	px-2
	py-6
	text-appTextPrimary
	bg-appBackgroundSecondary
	md:bg-white
	border
	border-transparent
	hover:border-appTextSecondary
	transition-colors
	rounded-md
	shadow-md
`;

const MobileStars = tw.div`
	mr-auto
	col-start-2
	col-end-3
	md:col-auto
`;

const Image = tw.img`
	row-start-2
	md:row-auto
	h-20
	min-w-[5rem]
	rounded-full
	overflow-hidden
	object-center
	object-cover
`;

const JobDetails = tw.section`
	col-start-2
	col-end-4
	md:col-auto
	flex
	flex-col
	space-y-2
	min-w-fit
`;

const JobTitle = tw.h2`
	min-h-[3.5rem]
	text-xl
	font-bold
	overflow-hidden
	text-ellipsis
	[display:-webkit-box]
	[-webkit-line-clamp:2]
	[-webkit-box-orient:vertical]
`;

const JobName = tw.p`
	text-base
	text-appTextSecondary
	tracking-wide
`;

const JobLocation = tw.a`
	flex
	flex-row
	flex-nowrap
	items-center
	gap-2
	w-fit
	hover:text-appTextPrimary
	hover:[svg]:fill-appTextPrimary
	hover:cursor-pointer
	text-base
	text-appTextSecondary
	tracking-wide
	transition-colors
`;

const JobAddInfo = tw.div`
	flex
	flex-col
	justify-between
	items-end
`;

const JobDate = tw(Date)`
	col-start-3
	col-end-4
	truncate
	md:col-auto
	text-sm
	font-light
	md:text-base
	md:font-normal
`;

type JobItemProps = {
	id: string;
};

function JobItem({ id }: JobItemProps) {
	const job = useJobsStore((state) => state.getJob(id));

	if (!job) {
		return <ErrorMessage error='Job not found!' />;
	}

	const messageAge = useMemo(() => daysBetweenDates(job.updatedAt), [job]);
	const isDesktop = useMediaQuery({ minWidth: SCREENS.md });

	if (!isDesktop) {
		return (
			<JobItemContainer>
				<MobileStars>
					<Stars id={job.id} />
				</MobileStars>
				<JobDate messageAge={messageAge} />
				<Image src={job.placePhoto} alt='location' />
				<JobDetails>
					<JobTitle title={job.title}>
						<Link to={appJobDetailsPath + job.id}>{job.title}</Link>
					</JobTitle>
					<JobName>Department name • {job.name}</JobName>
					<JobLocation href={mapSearchLink + job.address.split(' ').join('+')}>
						<LocationIcon />
						{job.city ? `${job.city}, ${job.country}` : job.address}
					</JobLocation>
				</JobDetails>
			</JobItemContainer>
		);
	}

	return (
		<JobItemContainer>
			<Image src={job.placePhoto} alt='location' />
			<JobDetails>
				<JobTitle title={job.title}>
					<Link to={appJobDetailsPath + job.id}>{job.title}</Link>
				</JobTitle>
				<JobName>Department name • {job.name}</JobName>
				<JobLocation href={mapSearchLink + job.address.split(' ').join('+')}>
					<LocationIcon />
					{job.city ? `${job.city}, ${job.country}` : job.address}
				</JobLocation>
			</JobDetails>
			<Stars id={job.id} />
			<JobAddInfo>
				<Bookmark id={job.id} />
				<Date messageAge={messageAge} />
			</JobAddInfo>
		</JobItemContainer>
	);
}

export default memo(JobItem);
