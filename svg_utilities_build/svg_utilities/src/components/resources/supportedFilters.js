import FeTurbulence from "../FeTurbulence";

const supportedFilters = () => { 
    return( [
        {id: 1,
        value: "feBlend"
        },
        {
          id: 2,
          value: 'feColorMatrix'
        },
        {
          id: 3,
          value: 'feComponentTransfer'
        },
        {
          id: 4,
          value: 'feComposite'
        },
        {
            id: 5,
            value: "feConvolveMatrix"
        },
        {
          id: 6,
          value: 'feDiffuseLighting'
        },
        {
          id: 7,
          value: 'feDisplacementMap'
        },
        {
          id: 8,
          value: 'feTurbulence'
        },
        {
          id: 9,
          value: 'feDiffuseFight'
        },
        {
          id: 10,
          value: 'Monster Bacon'
        },
        {
          id: 11,
          value: 'Vader in Paris'
        }
    ]);
}

export default supportedFilters;