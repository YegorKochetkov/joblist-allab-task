import React from 'react';
import { JobType } from '@/types/job';
import JobItem from './JobItem';
import tw from 'twin.macro';
import { motion } from 'framer-motion';

type JobsListProps = {
	jobs: JobType[];
};

const JobsListContainer = tw.div`
	flex
	flex-col
	gap-2
	items-stretch
`;

const listAnimation = {
	visible: (index: number) => ({
		opacity: 1,
		transition: {
			delay: index * 0.2,
		},
	}),
	hidden: { opacity: 0 },
};

function JobsList({ jobs }: JobsListProps) {
	return (
		<JobsListContainer>
			{jobs.map((job, index) => (
				<motion.span
					key={job.id}
					variants={listAnimation}
					initial='hidden'
					animate='visible'
					custom={index}
				>
					<JobItem id={job.id} />
				</motion.span>
			))}
		</JobsListContainer>
	);
}

export default JobsList;
