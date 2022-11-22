export type AddressType = {
	type: string;
	features: Feature[];
	query: Query;
};

type Query = {
	text: string;
};

type Feature = {
	type: string;
	geometry: Geometry;
	properties: Properties;
	bbox: number[];
};

type Properties = {
	country_code: string;
	street: string;
	country: string;
	county: string;
	datasource: Datasource;
	state: string;
	district: string;
	city: string;
	lon: number;
	lat: number;
	state_code?: string;
	formatted: string;
	address_line1: string;
	address_line2: string;
	county_code?: string;
	timezone: Timezone;
	result_type: string;
	rank: Rank;
	place_id: string;
	suburb?: string;
};

type Rank = {
	popularity: number;
	confidence: number;
	match_type: string;
};

type Timezone = {
	name: string;
	offset_STD: string;
	offset_STD_seconds: number;
	offset_DST: string;
	offset_DST_seconds: number;
	abbreviation_STD: string;
	abbreviation_DST: string;
};

type Datasource = {
	sourcename: string;
	attribution: string;
	license: string;
	url: string;
};

type Geometry = {
	type: string;
	coordinates: number[];
};
