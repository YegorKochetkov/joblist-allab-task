import React, { useState } from 'react';
import ShareIcon from '@/ui/ShareIcon';
import tw from 'twin.macro';
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	InstapaperIcon,
	InstapaperShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	TwitterIcon,
	TwitterShareButton,
} from 'react-share';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ShareContainer = tw.div`
	relative
	inline-flex
	items-center
	p-1
	w-full
	max-w-[12rem]
	sm:max-w-[14rem]
`;

const ButtonContainer = tw.span`
	inline-flex
	flex-nowrap
	items-center
	gap-4
	hover:cursor-pointer
	[>svg]:active:scale-95
	[>svg>path]:hover:fill-appTextPrimary
`;

const ShareText = tw.span`
`;

const Links = styled.ul<{ isShown: boolean }>`
	${tw`
		invisible
		absolute
		top-full
		right-0
		grid
		[grid-template-columns:repeat(auto-fit,minmax(2rem,1fr))]
		gap-1
		w-full
		sm:w-56
		p-1
		bg-white
		shadow-md
		rounded
		opacity-0
		transition-opacity
	`}
	${(props) =>
		props.isShown &&
		tw`
			visible
			opacity-100
		`}
`;

const Link = tw.li`
	flex
	justify-center
	items-center
	[svg]:hover:scale-110
`;

type ShareProps = {
	text?: string;
};

const rootUrl = 'https://yegorkochetkov.github.io';

function ShareButton({ text }: ShareProps) {
	const url = useLocation();
	const [isShown, setIsShown] = useState(false);

	return (
		<ShareContainer>
			<ButtonContainer role='button' onClick={() => setIsShown(!isShown)}>
				<ShareIcon />
				<ShareText>{text}</ShareText>
			</ButtonContainer>
			<Links isShown={isShown}>
				<Link>
					<EmailShareButton url={rootUrl + url.pathname}>
						<EmailIcon size={32} round />
					</EmailShareButton>
				</Link>
				<Link>
					<FacebookShareButton url={rootUrl + url.pathname}>
						<FacebookIcon size={32} round />
					</FacebookShareButton>
				</Link>
				<Link>
					<InstapaperShareButton url={rootUrl + url.pathname}>
						<InstapaperIcon size={32} round />
					</InstapaperShareButton>
				</Link>
				<Link>
					<LinkedinShareButton url={rootUrl + url.pathname}>
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
				</Link>
				<Link>
					<TwitterShareButton url={rootUrl + url.pathname}>
						<TwitterIcon size={32} round />
					</TwitterShareButton>
				</Link>
			</Links>
		</ShareContainer>
	);
}

export default ShareButton;
