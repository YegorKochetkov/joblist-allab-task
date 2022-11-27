import React, { useState } from 'react';
import { JobType } from '@/types/job';
import LocationIcon from '@/ui/LocationIcon';
import { mapSearchLink } from '@/utils/urls';
import tw from 'twin.macro';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import ErrorMessage from './ErrorMessage';
import Map, { Marker } from './GoogleMap';
import Loader from './Loader';

type ContactsAsideProps = {
	job: JobType;
};

const ContactsContainer = tw.section`
	w-full
	px-16
	py-8
	text-appLightGrey
	bg-appBackgroundContacts
	rounded-t-lg
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
	hover:[a]:underline
	hover:[svg]:fill-appLightGrey
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

const renderForMap = (status: Status) => {
	if (Status.FAILURE) {
		return <ErrorMessage error='Failure to load map' />;
	}

	if (Status.LOADING) {
		return <Loader />;
	}

	return <h1>{status}</h1>;
};

const styleForMap = {
	width: '100%',
	height: '13rem',
};

const GoogleMap = tw.div`
	rounded-b-lg
	overflow-hidden
	mb-6
`;

const ContactsWrapper = tw.div`
	xl:mt-14
	xl:w-[19rem]
	2xl:w-[25rem]
`;

function Contacts({ job }: ContactsAsideProps) {
	const markerPosition = { lat: job.location.lat, lng: job.location.long };
	const [zoom] = React.useState(3);
	const [center] = useState<google.maps.LatLngLiteral>(markerPosition);

	return (
		<ContactsWrapper>
			<ContactsContainer>
				<JobName>
					Department name.
					<br />
					{job.name + '.'}
				</JobName>
				<Address>
					<LocationIcon />
					<Location href={mapSearchLink + job.address.split(' ').join('+')}>
						{job.address}
					</Location>
				</Address>
				<Phone href={`tel:${job.phone}`}>{job.phone}</Phone>
				<br />
				<Email href={`mailto:${job.email}`}>{job.email}</Email>
			</ContactsContainer>
			<GoogleMap>
				<Wrapper
					apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
					render={renderForMap}
				>
					<Map center={center} zoom={zoom} style={styleForMap}>
						<Marker position={markerPosition} job={job} />
					</Map>
				</Wrapper>
			</GoogleMap>
		</ContactsWrapper>
	);
}

export default Contacts;
