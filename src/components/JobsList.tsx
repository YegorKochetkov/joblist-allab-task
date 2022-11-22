import React from 'react';
import { JobType } from '@/types/job';
import JobItem from './JobItem';
import tw from 'twin.macro';

type JobsListProps = {
	jobs: JobType[];
};

const JobsListContainer = tw.div`
	flex
	flex-col
	items-center
	gap-2
`;

function JobsList({ jobs }: JobsListProps) {
	return (
		<JobsListContainer>
			{jobs.map((job) => (
				<JobItem key={job.id} id={job.id} />
			))}
		</JobsListContainer>
	);
}

export default JobsList;
