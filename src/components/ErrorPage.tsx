import React from 'react';
import { useRouteError } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import useJobsStore from '@/store';

function ErrorPage() {
	const fetchError = useJobsStore((state) => state.fetchError);
	const error = useRouteError() as {
		status: number;
		statusText: string;
		data: unknown;
	};

	const errorMessage = error.statusText ? (
		<span>
			{error.status}
			<br />
			{error.statusText}
		</span>
	) : (
		fetchError
	);

	return <ErrorMessage error={errorMessage || 'unknown error'} />;
}

export default ErrorPage;
