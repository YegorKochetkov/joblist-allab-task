import React from 'react';

type DateProps = {
	messageAge: number;
	className?: string;
};

function Date({ messageAge, className }: DateProps) {
	return (
		<span
			title={`Posted ${messageAge} ${messageAge > 1 ? 'days' : 'day'} ago`}
			className={className}
		>
			Posted {messageAge} {messageAge > 1 ? 'days' : 'day'} ago
		</span>
	);
}

export default Date;
