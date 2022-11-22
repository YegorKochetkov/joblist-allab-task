import { AddressType } from '@/types/address';
import { JobType } from '@/types/job';

const addCityAndCountryToJob = async (jobs: JobType[]) => {
	for (let i = 0; i < jobs.length; i++) {
		const address = jobs[i].address;
		try {
			const response = await fetch(
				`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=d76f7c434e1c4e65acc27986b6521f00`,
				{ method: 'GET' }
			);
			const data: AddressType = await response.json();
			data.features[0]?.properties.city
				? (jobs[i].city = data.features[0].properties.city)
				: (jobs[i].city = data.features[0]?.properties.address_line1);

			jobs[i].country = data.features[0].properties.country;
		} catch {
			jobs[i].city = '';
			jobs[i].country = '';
		}
	}

	return jobs;
};

export default addCityAndCountryToJob;
