function formatJobDescription(
	jobDescription: string
): [string, string, string[]] {
	let descriptionParts = jobDescription
		.replaceAll('\n\n', '')
		.replaceAll('\n\t', '')
		.split('Responsopilities:');
	const commonDescription = descriptionParts[0];
	descriptionParts = descriptionParts[1].split('Compensation & Benefits:');
	const responsibilities = descriptionParts[0];
	const benefits = descriptionParts[1]
		.split('.')
		.map((benefit) => benefit.trim())
		.filter((benefit) => benefit.length > 0);

	return [commonDescription, responsibilities, benefits];
}

export default formatJobDescription;
