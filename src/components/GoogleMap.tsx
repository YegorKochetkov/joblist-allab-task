import { JobType } from '@/types/job';
import { mapSearchLink } from '@/utils/urls';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import MarkerIcon from '/src/assets/marker.svg';

interface MapProps extends google.maps.MapOptions {
	style?: { [key: string]: string };
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	children: ReactNode;
}

interface MarkerProps extends google.maps.MarkerOptions {
	job: JobType;
}

export const Marker = (props: MarkerProps) => {
	const [marker, setMarker] = useState<google.maps.Marker>();
	const { job } = props;
	const mapLink = mapSearchLink + job.address.split(' ').join('+');

	const tooltipForMarker = `
		<section>
			<h5 style='font-weight: bold; margin-bottom: 0.5rem;'>${job.title}</h5>
			<p style='margin-bottom: 0.5rem;'>
				Salary: <span style='font-weight: 500'>${job.salary}</span>
			</p>
			<p style='margin-bottom: 0.5rem;'>
				Benefits:
				<span style='font-weight: 500'>${job.benefits.join(', ')}</span>
			</p>
			<a style='color: blue' href=${mapLink}>Open map</a>
		</section>
	`;

	useEffect(() => {
		if (marker) {
			const infowindow = new google.maps.InfoWindow({
				content: tooltipForMarker,
				ariaLabel: job.title,
			});

			marker.addListener('click', () => {
				infowindow.open({
					anchor: marker,
				});
			});
		}
	}, [marker]);

	useEffect(() => {
		if (!marker) {
			setMarker(
				new google.maps.Marker({
					icon: MarkerIcon,
				})
			);
		}

		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	useEffect(() => {
		if (marker) {
			marker.setOptions(props);
		}
	}, [marker, props]);

	return null;
};

const Map = ({ children, style, ...options }: MapProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
					disableDefaultUI: true,
				})
			);
		}
	}, [ref, map]);

	useDeepCompareEffect(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	return (
		<React.Fragment>
			<div ref={ref} style={style} />
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					// it's official Google's code - to ignore TS:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return React.cloneElement(child, { map });
				}
			})}
		</React.Fragment>
	);
};

export default Map;
