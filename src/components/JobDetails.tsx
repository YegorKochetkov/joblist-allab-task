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
import Contacts from './Contacts';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Container = tw.div`
	container
	mx-auto
	px-4
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
	mb-5
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
	mx-auto
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
	mt-8
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
	mt-24
	mb-48
`;

const ApplyButton = tw(Button)`
	mx-auto
	md:mx-0
	mt-6
	md:mt-8
	mb-32
	md:mb-0
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

const AttachedImages = tw.p`
	flex
	flex-wrap
	gap-2
`;

const ImageWrapper = tw.span`
	w-[13rem]
	max-h-[7.25rem]
	[img]:md:hover:-translate-y-[33%]
	[img]:md:hover:max-h-[18.75rem]
	md:hover:z-10
`;

const EmploymentType = tw.p`
	flex
	flex-wrap
	[button]:shrink
	[button]:grow
	gap-2
	mt-[0.6rem]
	mb-6
`;

const Benefits = tw(EmploymentType)``;

const Job = tw.article`
	mt-8
	md:mt-12
`;

const FlexContainer = tw.div`
	flex
	flex-col
	xl:flex-row
	justify-center
	gap-x-32
`;

const FlexItem = tw.div``;

function JobDetails() {
	const { jobId } = useParams();

	const navigate = useNavigate();
	const job = jobId ? useJobsStore((state) => state.getJob(jobId)) : null;

	if (!job) {
		return <ErrorMessage error='Job not found!' />;
	}

	const [description, responsibilities, benefits] = formatJobDescription(
		job.description
	);
	const messageAge = useMemo(() => daysBetweenDates(job.updatedAt), [job]);
	const isDesktop = useMediaQuery({ minWidth: SCREENS.xl });
	const isMobile = useMediaQuery({ maxWidth: SCREENS.md });

	const images = job.pictures.map((picture, index) => (
		<JobImage src={picture + `?random=${index}`} key={index} />
	));

	const handleButtonClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		console.log(event.target);
	};

	const handleBackButtonClick = () => {
		navigate(-1);
	};

	return (
		<AnimatePresence>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<FlexContainer>
					<FlexItem>
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
							<Job>
								<Container>
									<WidthLimiter>
										{isDesktop && (
											<ApplyButton
												buttonStyle={BUTTONS.primary}
												onClick={(event) => handleButtonClick(event)}
											>
												Apply now
											</ApplyButton>
										)}

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

										<ApplyButton
											buttonStyle={BUTTONS.primary}
											onClick={(event) => handleButtonClick(event)}
										>
											Apply now
										</ApplyButton>

										{isMobile && <Title as='h2'>Attached images</Title>}
									</WidthLimiter>
								</Container>

								{isMobile && <Slider items={images} />}

								<Container>
									<WidthLimiter>
										<Title as='h2'>Additional info</Title>
										<p>Employment type</p>
										<EmploymentType>
											{job.employment_type.map((type, index) => (
												<Button
													buttonStyle={BUTTONS.secondary}
													key={index}
													onClick={(event) => handleButtonClick(event)}
												>
													{type}
												</Button>
											))}
										</EmploymentType>

										<p>Benefits</p>
										<Benefits>
											{job.benefits.map((benefit, index) => (
												<Button
													buttonStyle={BUTTONS.attention}
													key={index}
													onClick={(event) => handleButtonClick(event)}
												>
													{benefit}
												</Button>
											))}
										</Benefits>

										{!isMobile && (
											<React.Fragment>
												<Title as='h2'>Attached images</Title>
												<AttachedImages>
													{images.map((image, index) => (
														<ImageWrapper key={index}>{image}</ImageWrapper>
													))}
												</AttachedImages>
											</React.Fragment>
										)}

										{isDesktop && (
											<BackButton onClick={() => handleBackButtonClick()}>
												<ArrowIcon />
												Return to job board
											</BackButton>
										)}
									</WidthLimiter>
								</Container>
							</Job>
						</main>
					</FlexItem>

					{!isDesktop && (
						<Container>
							<WidthLimiter>
								<Title as='h2'>Contacts</Title>
								<Contacts job={job} />
							</WidthLimiter>
						</Container>
					)}

					{isDesktop && <Contacts job={job} />}
				</FlexContainer>
			</motion.span>
		</AnimatePresence>
	);
}

export default JobDetails;
