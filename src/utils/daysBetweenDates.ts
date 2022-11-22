const daysBetweenDates = (data: string) => {
	const currentData = new Date();
	const createdData = new Date(data);
	const differenceInMilliseconds =
		currentData.getTime() - createdData.getTime();

	const dayInMilliseconds = 1000 * 3600 * 24;
	const differenceInDays = Math.floor(
		differenceInMilliseconds / dayInMilliseconds
	);

	return differenceInDays;
};

export default daysBetweenDates;
