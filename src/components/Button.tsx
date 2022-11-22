import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BUTTONS } from '@/utils/buttons';

type ButtonProps = {
	children?: ReactNode;
	className?: string;
	buttonStyle?: string;
};

type ButtonStyleProps = {
	buttonStyle?: string;
};

const ButtonElement = styled.button<ButtonStyleProps>`
	${tw`
		flex
		justify-center
		items-center
		px-7
		py-4
		text-xs
		font-semibold
		uppercase
		bg-appBackgroundButton
		rounded-md
		hover:shadow
		active:shadow-inner
	`}
	${(props) =>
		props.buttonStyle === BUTTONS.primary &&
		tw`
			transition-colors
			text-white
			bg-appBackgroundButtonPrimary
			hover:text-appTextPrimary
			hover:bg-appBackgroundButton
	`}
	${(props) =>
		props.buttonStyle === BUTTONS.secondary &&
		tw`
			min-w-[14rem]
			transition-colors
			text-appTextButtonSecondary
			bg-appBackgroundButtonSecondary
			hover:bg-appBackgroundHoverButtonSecondary
			active:bg-appBackgroundButtonSecondary
			border
			border-appBorderButtonSecondary
			normal-case
	`}
	${(props) =>
		props.buttonStyle === BUTTONS.attention &&
		tw`
			min-w-[14rem]
			transition-colors
			text-appTextButtonAttention
			bg-appBackgroundButtonAttention
			hover:bg-appBackgroundHoverButtonAttention
			border
			border-appBorderButtonAttention
			normal-case
	`}
`;

function Button({ children, className, buttonStyle }: ButtonProps) {
	return (
		<ButtonElement className={className} buttonStyle={buttonStyle}>
			{children}
		</ButtonElement>
	);
}

export default Button;
