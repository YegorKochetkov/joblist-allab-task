import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import Bookmark from '@/components/Bookmark';
import Share from './ShareButton';
import tw from 'twin.macro';
import useJobsStore from '@/store';
import daysBetweenDates from '@/utils/daysBetweenDates';
import Date from './Date';
import JobSalary from './JobSalary';
import formatJobDescription from '@/utils/formatJobDescription';
import Button from './Button';
import ArrowIcon from '@/ui/ArrowIcon2';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '@/utils/screens';
import { BUTTONS } from '@/utils/buttons';

const JobDetailsContainer = tw.div`
	container
	px-4
	md:px-28
	pt-6
	pb-9
	mx-auto
	text-base
	text-appTextPrimary
`;

const JobDetailsHeader = tw.header`
	relative
	flex
	flex-col
	gap-y-9
	md:flex-row
	md:justify-between
	after:block
	after:w-full
	after:top-11
	after:absolute
	after:border-b
	after:border-appLightGrey
	after:-z-10
	mb-8
	md:mb-12
	min-w-min
	max-w-[45rem]
`;

const JobDetailsControls = tw.div`
	flex
	flex-wrap
	md:flex-nowrap
	gap-x-8
`;

const JobDetailsHeaderTitle = tw.h1`
	text-[1.75rem]
	leading-[2.1rem]
	font-bold
`;

const JobDetailsMain = tw.main`
	min-w-min
	max-w-[45rem]
`;

const JobDetailsMainHeader = tw.header`
	flex
	flex-wrap
	justify-between
	items-center
	md:items-start
	md:gap-y-2
	mb-6
`;

const JobDetailsMainTitle = tw.h2`
	text-2xl
	font-bold
	max-w-[32rem]
`;

const JobDetailsMainSubTitle = tw.h3`
	text-xl
	font-bold
	mt-11
`;

const JobDetailsDate = tw(Date)`
	text-sm
	font-light
	md:text-lg
	md:font-normal
	lg:order-1
`;

const JobDetailsDescription = tw.article`
	text-lg
	font-normal
`;

const JobDetailsBenefit = tw.li`
	relative
	ml-4
	md:ml-0
	before:absolute
	before:-left-4
	before:top-[0.7rem]
	before:block
	before:w-2
	before:h-2
	before:bg-appBackgroundButtonPrimary
	before:opacity-60
`;

const BackButton = tw(Button)`
	relative
	-left-24
	[svg]:mr-5
`;

function JobDetails() {
	const { jobId } = useParams();

	const job = jobId ? useJobsStore((state) => state.getJob(jobId)) : null;

	if (!job) {
		return <ErrorMessage error='Job not found!' />;
	}
	const [description, responsibilities, benefits] = formatJobDescription(
		job.description
	);
	const messageAge = useMemo(() => daysBetweenDates(job.updatedAt), [job]);
	const isDesktop = useMediaQuery({ minWidth: SCREENS.md });

	return (
		<JobDetailsContainer>
			<JobDetailsHeader>
				<JobDetailsHeaderTitle>Job&nbsp;details</JobDetailsHeaderTitle>
				<JobDetailsControls>
					<Bookmark id={job.id} text='Save to my list' />
					<Share text='Share' />
				</JobDetailsControls>
			</JobDetailsHeader>
			<JobDetailsMain>
				<JobDetailsMainHeader>
					<JobDetailsMainTitle>{job.title}</JobDetailsMainTitle>
					<JobDetailsDate messageAge={messageAge} />
					<JobSalary salary={job.salary} />
				</JobDetailsMainHeader>
				<JobDetailsDescription>
					<p>{description}</p>

					<JobDetailsMainSubTitle>Responsibilities:</JobDetailsMainSubTitle>
					<p>{responsibilities}</p>

					<JobDetailsMainSubTitle>
						Compensation & Benefits:
					</JobDetailsMainSubTitle>
					<ul>
						{benefits.map((benefit, index) => (
							<JobDetailsBenefit key={index}>{benefit}</JobDetailsBenefit>
						))}
					</ul>
				</JobDetailsDescription>
			</JobDetailsMain>
			<Button buttonStyle={BUTTONS.primary}>Apply now</Button>
			<Button buttonStyle={BUTTONS.secondary}>secondary button</Button>
			<Button buttonStyle={BUTTONS.attention}>attention button</Button>
			{isDesktop && (
				<BackButton>
					<ArrowIcon />
					Return to job board
				</BackButton>
			)}
		</JobDetailsContainer>
	);
}

export default JobDetails;
