import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg">
            <image
                href="/favicon.png"
                x="0"
                y="0"
                width="40"
                height="40"
                preserveAspectRatio="xMidYMid meet"
            />
        </svg>
    );
}
