import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '@/App';
import JobDetails from '@/components/JobDetails';
import ErrorPage from '@/components/ErrorPage';
import PaginatedItems from '@/components/PaginatedItems';

export const appRootPath = '/joblist-allab-task/';
export const appJobsListPath = '/joblist-allab-task/jobsList/';
export const appJobDetailsPath = '/joblist-allab-task/jobDetails/';

const router = createBrowserRouter([
	{
		path: '',
		errorElement: <ErrorPage />,
		loader: () => redirect(appJobsListPath + '1'),
	},
	{
		path: appRootPath,
		errorElement: <ErrorPage />,
		loader: () => redirect(appJobsListPath + '1'),
	},
	{
		path: appJobsListPath,
		errorElement: <ErrorPage />,
		loader: () => redirect(appJobsListPath + '1'),
	},
	{
		path: appJobsListPath,
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: ':page',
				element: <PaginatedItems />,
				loader: ({ params }) => {
					const parsedParams = Number(params.page);

					if (!parsedParams) {
						const error = {
							status: 404,
							statusText: 'Wrong address!',
						};

						throw error;
					}
				},
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		path: appJobDetailsPath,
		loader: ({ params }) => {
			if (!params.jobId) {
				const error = {
					status: 404,
					statusText: 'You should choose job!',
				};

				throw error;
			}

			return;
		},
		errorElement: <ErrorPage />,
		children: [
			{
				path: ':jobId',
				element: <JobDetails />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

export default router;
