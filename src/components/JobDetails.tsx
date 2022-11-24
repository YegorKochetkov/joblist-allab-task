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
import Slider from './Slider/Slider';

const Container = tw.div`
	container
	px-4
	md:px-28
	mx-auto
	text-base
	text-appTextPrimary
`;

const HeaderContent = tw.div`
	relative
	flex
	flex-col
	gap-y-6
	md:flex-row
	md:justify-between
	after:block
	after:w-full
	after:top-11
	after:absolute
	after:border-b
	after:border-appLightGrey
	after:-z-10
	mt-6
	md:mt-14
	mb-8
	md:mb-12
`;

const HeaderTitle = tw.h1`
	text-[1.75rem]
	leading-[2.1rem]
	font-bold
`;

const Title = tw(HeaderTitle)`
	w-full
	pb-[0.65rem]
	border-b
	border-appLightGrey
	mb-4
	mt-14
	md:mt-20
`;

const JobControls = tw.div`
	flex
	flex-wrap
	md:flex-nowrap
	gap-x-8
`;

const WidthLimiter = tw.div`
	min-w-min
	max-w-[45rem]
`;

const JobHeader = tw.header`
	flex
	flex-wrap
	justify-between
	items-center
	gap-y-2
	md:gap-y-4
	md:items-start
	mb-6
`;

const JobTitle = tw.h2`
	text-2xl
	font-bold
	max-w-[32rem]
`;

const JobSubTitle = tw.h3`
	text-xl
	font-bold
	mt-11
`;

const JobDate = tw(Date)`
	text-sm
	font-light
	md:text-lg
	md:font-normal
	lg:order-1
`;

const JobDescription = tw.section`
	text-lg
	font-normal
`;

const JobBenefit = tw.li`
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

const ApplyButton = tw(Button)`
	mx-auto
	mt-6
	md:mt-8
	mb-32
	md:mb-24
`;

const JobImage = tw.img`
	rounded-md
	w-[13rem]
	max-h-[7.25rem]
	object-center
	object-cover
	transition-all
	duration-500
`;

const AttachedImages = tw.div`
	flex
	flex-wrap
	gap-2
`;

const ImageWrapper = tw.div`
	w-[13rem]
	max-h-[7.25rem]
	[img]:md:hover:-translate-y-[33%]
	[img]:md:hover:max-h-[20rem]
	md:hover:z-10
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

	const images = job.pictures.map((picture, index) => (
		<JobImage src={picture + `?random=${index}`} key={index} />
	));

	return (
		<React.Fragment>
			<header>
				<Container>
					<WidthLimiter>
						<HeaderContent>
							<HeaderTitle>Job&nbsp;details</HeaderTitle>
							<JobControls>
								<Bookmark id={job.id} text='Save to my list' />
								<Share text='Share' />
							</JobControls>
						</HeaderContent>
					</WidthLimiter>
				</Container>
			</header>

			<main>
				<article>
					<Container>
						<WidthLimiter>
							<JobHeader>
								<JobTitle>{job.title}</JobTitle>
								<JobDate messageAge={messageAge} />
								<JobSalary salary={job.salary} />
							</JobHeader>

							<JobDescription>
								<p>{description}</p>

								<JobSubTitle>Responsibilities:</JobSubTitle>
								<p>{responsibilities}</p>

								<JobSubTitle>Compensation & Benefits:</JobSubTitle>
								<ul>
									{benefits.map((benefit, index) => (
										<JobBenefit key={index}>{benefit}</JobBenefit>
									))}
								</ul>
							</JobDescription>

							<ApplyButton buttonStyle={BUTTONS.primary}>Apply now</ApplyButton>

							<Title as='h2'>Attached images</Title>
							{isDesktop && (
								<AttachedImages>
									{images.map((image, index) => (
										<ImageWrapper key={index}>{image}</ImageWrapper>
									))}
								</AttachedImages>
							)}
						</WidthLimiter>
					</Container>
					{!isDesktop && <Slider items={images} />}
					<Container>
						<WidthLimiter>
							<Title as='h2'>Additional info</Title>
							{isDesktop && (
								<BackButton>
									<ArrowIcon />
									Return to job board
								</BackButton>
							)}
						</WidthLimiter>
					</Container>
				</article>
			</main>
		</React.Fragment>
	);
}

export default JobDetails;
