import React from 'react';
import tw from 'twin.macro';

type JobSalaryProps = {
	salary: string;
};

const JobSalaryContainer = tw.section`
	inline-flex
	flex-col
	items-end
	sm:flex-col-reverse
	sm:items-start
`;

const Salary = tw.span`
	text-xl
	font-bold
`;

const formatToLocale = new Intl.NumberFormat(undefined, {
	minimumFractionDigits: 0,
});

function JobSalary({ salary }: JobSalaryProps) {
	const salaryRange = salary.replaceAll('k', '000').split('-');
	return (
		<JobSalaryContainer>
			<span>Brutto, per year</span>
			<Salary>
				&euro;&nbsp;
				{formatToLocale.format(Number(salaryRange[0]))}
				&nbsp;&mdash;
				{formatToLocale.format(Number(salaryRange[1]))}
			</Salary>
		</JobSalaryContainer>
	);
}

export default JobSalary;
