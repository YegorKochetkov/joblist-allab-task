import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import useJobsStore from './store';
import { jobsUrl } from './utils/urls';

const AppContainer = tw.div`
	min-h-screen
	p-2
	pb-4
	sm:pt-7
	sm:pb-16
	sm:px-4
	bg-appBackgroundPrimary
	font-normal
`;

function App() {
	const jobs = useJobsStore((state) => state.jobs);
	const loadJobs = useJobsStore((state) => state.loadJobs);
	const fetchError = useJobsStore((state) => state.fetchError);

	useEffect(() => {
		if (jobs === null) {
			loadJobs(jobsUrl);
		}
	}, []);

	if (fetchError !== null)
		return (
			<ErrorMessage
				error={`Something went wrong! ${
					fetchError ? fetchError : 'unknown error'
				}`}
			/>
		);

	if (jobs === null) return <Loader />;

	return (
		<AppContainer>
			<Outlet />
		</AppContainer>
	);
}

export default App;
