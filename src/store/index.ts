import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { JobType } from '@/types/job';
import addRandomImageToJob from '@/utils/addRandomImageToJob';
import addCityAndCountryToJob from '@/utils/addCityAndCountryToJob';

type JobsStateType = {
	jobs: JobType[] | null;
	fetchError: string | null;
	loadJobs: (url: string) => void;
	setJobs: (jobs: JobType[]) => void;
	setRating: (id: string, rating: number) => void;
	setBookmark: (id: string) => void;
	getJob: (id: string) => JobType | null;
};

const useJobsStore = create<JobsStateType>()(
	devtools(
		persist(
			(set, get) => ({
				jobs: null,
				fetchError: null,
				loadJobs: async (url: string) => {
					set({ fetchError: null }, false, 'loadJobs');
					try {
						const response = await fetch(url);
						const jobs = await response.json();

						if (jobs.error) throw jobs.error;

						const updatedWithImageJobs = addRandomImageToJob(jobs);
						const updatedWithAddressJobs = await addCityAndCountryToJob(
							updatedWithImageJobs
						);
						set(
							{ jobs: updatedWithAddressJobs, fetchError: null },
							false,
							'loadJobs'
						);
					} catch (error) {
						set({ fetchError: String(error) });
					}
				},
				setJobs: (jobs: JobType[]) => set({ jobs: jobs }, false, 'setJobs'),
				setRating: (id: string, rating: number) => {
					const jobs = get().jobs;
					if (jobs) {
						const updatedJobs = jobs.map((job) => {
							if (job.id === id) {
								job.rating = rating;
							}

							return job;
						});

						set({ jobs: updatedJobs }, false, 'setRating');
					}
				},
				setBookmark: (id: string) => {
					const jobs = get().jobs;
					if (jobs) {
						const updatedJobs = jobs.map((job) => {
							if (job.id === id) {
								job.bookmark ? (job.bookmark = false) : (job.bookmark = true);
							}

							return job;
						});

						set({ jobs: updatedJobs }, false, 'setBookmark');
					}
				},
				getJob: (id: string) => {
					const jobs = get().jobs;
					const job = jobs?.find((job) => job.id === id) || null;

					return job;
				},
			}),
			{
				name: 'allab-task',
			}
		)
	)
);

export default useJobsStore;
