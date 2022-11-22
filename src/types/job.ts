export type JobType = {
	id: string;
	name: string;
	email: string;
	phone: string;
	title: string;
	salary: string;
	address: string;
	benefits: string[];
	location: LocationType;
	pictures: string[];
	createdAt: string;
	updatedAt: string;
	description: string;
	employment_type: string[];
	rating: number;
	bookmark: boolean;
	city: string;
	country: string;
	placePhoto: string;
};

type LocationType = {
	lat: number;
	long: number;
};
