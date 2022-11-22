import React, { ReactNode } from 'react';
import tw from 'twin.macro';

type ErrorMessageProps = {
	error: ReactNode;
};

const ErrorContainer = tw.p`
	p-2
	m-2
	text-center
	text-orange-700
	bg-orange-200
	border
	border-orange-700
	rounded
`;

function ErrorMessage(props: ErrorMessageProps) {
	return <ErrorContainer>{props.error}</ErrorContainer>;
}

export default ErrorMessage;
