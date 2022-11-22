import { JobType } from '@/types/job';

const addRandomImageToJob = (jobs: JobType[]) => {
	for (let i = 0; i < jobs.length; i++) {
		/*https://picsum.photos/ for get an image*/
		const rawImageUrl = `https://picsum.photos/id/${i + 1}/200/300`;

		jobs[i].placePhoto = rawImageUrl;
	}

	return jobs;
};

export default addRandomImageToJob;
