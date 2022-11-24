import { JobType } from '@/types/job';
import LocationIcon from '@/ui/LocationIcon';
import { mapSearchLink } from '@/utils/urls';
import React from 'react';
import tw from 'twin.macro';

type ContactsAsideProps = {
	job: JobType;
};

const ContactsContainer = tw.section`
	w-full
	px-16
	py-8
	text-appLightGrey
	bg-appBackgroundContacts
	rounded-lg
	min-w-[25rem]
`;

const Location = tw.a`
	inline
	text-inherit
	hover:text-inherit
	ml-2
`;

const Address = tw.p`
	w-fit
	hover:cursor-pointer
	[a]:hover:underline
	[svg]:hover:fill-appLightGrey
	[svg]:min-w-[0.85rem]
	[svg]:relative
	[svg]:bottom-1
	mb-3
`;

const JobName = tw.p`
	mb-4
`;

const Phone = tw.a`
	inline-block
	mb-1
	text-appTextContacts
	hover:underline
	hover:text-appLightGrey
	transition-colors
`;

const Email = tw(Phone)``;

function Contacts({ job }: ContactsAsideProps) {
	return (
		<ContactsContainer>
			<JobName>
				Department name.
				<br />
				{job.name + '.'}
			</JobName>
			<Address>
				<LocationIcon />
				<Location href={mapSearchLink + job.address}>{job.address}</Location>
			</Address>
			<Phone href={`tel:${job.phone}`}>{job.phone}</Phone>
			<br />
			<Email href={`mailto:${job.email}`}>{job.email}</Email>
		</ContactsContainer>
	);
}

export default Contacts;
