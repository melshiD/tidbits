import React from "react";

const SideFilterExample = (props) => {
    const tokenName = props.filterToken;

    return (
        <React.Fragment>
            <p>
                {tokenName}
            </p>
            <svg>
                <filter id="my_filter_2">
                    <feTurbulence baseFrequency="0.88 .95" seed="0" numOctaves="3">
                        <animate attributeName="seed" values="10;2000;10" dur="1000s" repeatCount="indefinite" />
                        <animate attributeName="baseFrequency" values=".88 .95; 0.5 0.9" dur="52.5s" repeatCount="indefinite" />
                        <animate attributeName="numOctaves" values="1; 3" dur="20s" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDiffuseLighting lighting-color="eggshell" surfaceScale="10">
                        <animate attributeName="lighting-color" values="pink; blue; pink" dur="22s" repeatCount="indefinite" />
                        <feDistantLight azimuth="119" elevation="202">
                            <animate attributeName="azimuth" values="110; 200" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="elevation" values="110; 200; 110" dur="2s" repeatCount="indefinite" />
                        </feDistantLight>
                    </feDiffuseLighting>
                    <feComposite operator="in" in2="SourceGraphic"></feComposite>
                </filter>
                <circle cx="50%" cy="50%" r="40" filter="url(#my_filter_2)" />
            </svg>
        </React.Fragment>
    )
};

export default SideFilterExample;