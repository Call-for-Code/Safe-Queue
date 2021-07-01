import * as React from 'react';
import { Svg, Path, Circle, Line, G } from 'react-native-svg';



export const NewIconFirst = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height="20" width="20">
            <Circle cx="10" cy="10" r="10" fill={fill} />
            <Line x1="4" y1="4" x2="16" y2="16" stroke="#fff" strokeWidth="2" />
            <Line x1="4" y1="16" x2="16" y2="4" stroke="#fff" strokeWidth="2" />
          </Svg>
  );
};

export const NewHomeIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 460.298 460.297"
    >
      <Path d="M230.149 120.939L65.986 256.274c0 .191-.048.472-.144.855-.094.38-.144.656-.144.852v137.041c0 4.948 1.809 9.236 5.426 12.847 3.616 3.613 7.898 5.431 12.847 5.431h109.63V303.664h73.097v109.64h109.629c4.948 0 9.236-1.814 12.847-5.435 3.617-3.607 5.432-7.898 5.432-12.847V257.981c0-.76-.104-1.334-.288-1.707L230.149 120.939z" />
      <Path d="M457.122 225.438L394.6 173.476V56.989c0-2.663-.856-4.853-2.574-6.567-1.704-1.712-3.894-2.568-6.563-2.568h-54.816c-2.666 0-4.855.856-6.57 2.568-1.711 1.714-2.566 3.905-2.566 6.567v55.673l-69.662-58.245c-6.084-4.949-13.318-7.423-21.694-7.423-8.375 0-15.608 2.474-21.698 7.423L3.172 225.438c-1.903 1.52-2.946 3.566-3.14 6.136-.193 2.568.472 4.811 1.997 6.713l17.701 21.128c1.525 1.712 3.521 2.759 5.996 3.142 2.285.192 4.57-.476 6.855-1.998L230.149 95.817l197.57 164.741c1.526 1.328 3.521 1.991 5.996 1.991h.858c2.471-.376 4.463-1.43 5.996-3.138l17.703-21.125c1.522-1.906 2.189-4.145 1.991-6.716-.195-2.563-1.242-4.609-3.141-6.132z" />
    </Svg>
  )
};


export const NewIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg  
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-users"
      {...props}
    >
      <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <Circle cx={9} cy={7} r={4} />
      <Path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </Svg>
  )
};

// Hollow
export const CustomerIcon1 = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg 
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill={fill}
      stroke={stroke} 
      strokeWidth={strokeWidth}
      >
      <Path d="M19.38 19.265C13.464 20.481 9 25.729 9 32v17h32V32c0-6.271-4.464-11.519-10.38-12.735A9.996 9.996 0 0035 11c0-5.514-4.486-10-10-10S15 5.486 15 11a9.996 9.996 0 004.38 8.265zM28 21c6.065 0 11 4.935 11 11v15H11V32c0-6.065 4.935-11 11-11h6zM25 3c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z" />
    </Svg>
  )
};

// Filled 
export const CustomerIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 24;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

return (
    <Svg height={height} width={width} viewBox="0 0 16 16" {...props}>
      <Path d="M12 9H4a4 4 0 00-4 4v3h16v-3a4 4 0 00-4-4z" />
      <Path d="M12 5V4a4 4 0 00-8 0v1a4 4 0 008 0z" />
    </Svg>
  )
};


// Filled
export const HomeIconOLD = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M20 20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9H1l10.327-9.388a1 1 0 011.346 0L23 11h-3v9zm-9-7v6h2v-6h-2z" />
    </Svg>
  )
};

// Filled
export const HomeIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
  <Svg
      width={width}
      height={height}
      viewBox="0 0 460.298 460.297"
      {...props}
    >
      <Path d="M230.149 120.939L65.986 256.274c0 .191-.048.472-.144.855-.094.38-.144.656-.144.852v137.041c0 4.948 1.809 9.236 5.426 12.847 3.616 3.613 7.898 5.431 12.847 5.431h109.63V303.664h73.097v109.64h109.629c4.948 0 9.236-1.814 12.847-5.435 3.617-3.607 5.432-7.898 5.432-12.847V257.981c0-.76-.104-1.334-.288-1.707L230.149 120.939z" />
      <Path d="M457.122 225.438L394.6 173.476V56.989c0-2.663-.856-4.853-2.574-6.567-1.704-1.712-3.894-2.568-6.563-2.568h-54.816c-2.666 0-4.855.856-6.57 2.568-1.711 1.714-2.566 3.905-2.566 6.567v55.673l-69.662-58.245c-6.084-4.949-13.318-7.423-21.694-7.423-8.375 0-15.608 2.474-21.698 7.423L3.172 225.438c-1.903 1.52-2.946 3.566-3.14 6.136-.193 2.568.472 4.811 1.997 6.713l17.701 21.128c1.525 1.712 3.521 2.759 5.996 3.142 2.285.192 4.57-.476 6.855-1.998L230.149 95.817l197.57 164.741c1.526 1.328 3.521 1.991 5.996 1.991h.858c2.471-.376 4.463-1.43 5.996-3.138l17.703-21.125c1.522-1.906 2.189-4.145 1.991-6.716-.195-2.563-1.242-4.609-3.141-6.132z" />
    </Svg>
  )
};


// Hollow
export const HomeIconHollow = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
            d='M16.61,2.21a1,1,0,0,0-1.24,0L1,13.42,2.24,15,4,13.62V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V13.63L29.76,15,31,13.43ZM18,26H14V18h4Zm2,0h0V18a2,2,0,0,0-2-2H14a2,2,0,0,0-2,2v8H6V12.06L16,4.27l10,7.8V26Z'>
      </Path>
    </Svg>
  );
};

export const StoreIcon = (props) => {
  const height = props.height || 26;
  const width = props.width || 26;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

return (
    <Svg width={width} height={height} viewBox="0 0 18 16" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M-3-4h24v24H-3z" />
        <Path
          d="M17.16 3.8c-.09-.46-.5-.8-.98-.8H1.82c-.48 0-.89.34-.98.8L0 8v1c0 .55.45 1 1 1v5c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-5h4v5c0 .55.45 1 1 1s1-.45 1-1v-5c.55 0 1-.45 1-1V8l-.84-4.2zM9 14H3v-4h6v4zM2 2h14c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1z"
          fill={fill}
        />
      </G>
    </Svg>
  )
};

export const SafeQueueIcon = (props) => {
  const height = props.height || 75;
  const width = props.width || 120;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

return (
    <Svg width={width} height={height} viewBox="0 0 406 406" {...props}>
      <Path d="M123.2 137.5c-5.8 1.8-10.8 5.8-13.3 10.7-1.7 3.3-2 5.5-1.7 10.5.6 9.9 4.5 13.8 18.5 18.7 8.4 3 12.3 5.8 12.3 8.8 0 8.1-10.7 9.8-20.4 3.2l-3.8-2.6-5.5 5.3-5.4 5.4 2.8 2.3c12.3 10.3 36.6 9.7 44.6-1 6.4-8.6 6.3-19.3-.1-26.1-3.3-3.5-6.6-5.3-15.6-8.3-8.2-2.8-10.6-4.7-10.6-8.5 0-6.2 10.9-8 18-2.9l3.2 2.3 4.9-4.9c2.7-2.6 4.9-5.3 4.9-5.9-.1-1.6-4-4-10.3-6.3-6.6-2.5-15.8-2.8-22.5-.7zM171.3 175.7c-6.2 14.7-11.5 27.6-11.9 28.5-.5 1.6.2 1.8 6.9 1.8h7.6l1.9-5.3 2-5.2 11-.3 10.9-.3 2.3 5.6 2.2 5.5h7.4c5.3 0 7.4-.4 7.3-1.3 0-.6-5.1-13.4-11.3-28.2l-11.2-27-7-.3-6.9-.3-11.2 26.8zm21-2c1.5 4.3 2.7 8.4 2.7 9 0 .9-1.8 1.3-5.8 1.3-3.2 0-6.1-.2-6.4-.5-.6-.6 5.4-17.5 6.2-17.5.3 0 1.8 3.5 3.3 7.7zM224 177.5V206h13v-22h22v-12h-22.1l.3-5.3.3-5.2 11.8-.3 11.7-.3V149h-37v28.5zM270 177.5V206h39v-12h-26.1l.3-5.8.3-5.7 11.8-.3 11.7-.3V171h-24v-10h25v-12h-38v28.5zM87.5 221.4c-5.9 1.9-10.1 4.3-14.6 8.3-14.3 12.9-13.6 40.6 1.3 52.3 8.3 6.6 11.9 7.3 40.6 7.8l25.2.4V277h-6.5c-3.6 0-6.5-.2-6.5-.5s1.5-2.5 3.4-4.9c10.7-14.1 4.6-38.8-11.6-47.2-8.2-4.3-22.9-5.7-31.3-3zm22.3 16.9c12.4 8.1 10.3 30.5-3.3 35.7-11.7 4.5-23.9-2.9-26-15.6-2.7-16.9 15.5-29.3 29.3-20.1zM146 252.2c0 10.6.5 20.9 1 22.9 1.7 6.1 5.2 10.2 11 13.2 4.9 2.5 6.3 2.8 13.6 2.5 10.7-.4 16.6-3.7 20.7-11.7 2.7-5.4 2.7-5.6 2.7-25.8V233h-14v18.7c0 17-.2 19.1-2 22.1-4 6.5-12.5 6.6-16.7.3-2.2-3.2-2.3-4.3-2.3-22.2V233h-14v19.2zM206 261.5V290h39v-12h-26.1l.3-5.8.3-5.7 11.8-.3 11.7-.3V255h-24v-10h25v-12h-38v28.5zM254 252.2c0 10.6.5 20.9 1 22.9 1.7 6.1 5.2 10.2 11 13.2 4.9 2.5 6.3 2.8 13.6 2.5 10.7-.4 16.6-3.7 20.7-11.7 2.7-5.4 2.7-5.6 2.7-25.8V233h-14v18.7c0 17-.2 19.1-2 22.1-4 6.5-12.5 6.6-16.7.3-2.2-3.2-2.3-4.3-2.3-22.2V233h-14v19.2zM314 261.5V290h39v-12h-26.1l.3-5.8.3-5.7 11.8-.3 11.7-.3V255h-24v-10h25v-12h-38v28.5z" />
    </Svg>
  )
};

export const MapIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
            d='M16,10a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,16,8Z'>
      </Path>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
            d='M16,4a8.88,8.88,0,0,1,9,8.71,8.47,8.47,0,0,1-1.79,5.21l0,0,0,0L16,28.46,8.85,18l0,0,0,0A8.47,8.47,0,0,1,7,12.71,8.88,8.88,0,0,1,16,4m0-2A10.86,10.86,0,0,0,5,12.71a10.53,10.53,0,0,0,2.2,6.43L16,32l8.8-12.86A10.53,10.53,0,0,0,27,12.71,10.86,10.86,0,0,0,16,2Z'>
      </Path>
    </Svg>
  );
};

export const DonateIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M28.76,11.35A1,1,0,0,0,28,11H22V7a3,3,0,0,0-3-3H13a3,3,0,0,0-3,3v4H4a1,1,0,0,0-1,1.15L4.88,24.3a2,2,0,0,0,2,1.7H25.14a2,2,0,0,0,2-1.7L29,12.15A1,1,0,0,0,28.76,11.35ZM12,7a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v4H12ZM25.14,24H6.86L5.17,13H26.83Z'>
      </Path>
    </Svg>
  );
};

export const ChatIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M17.74,30,16,29l4-7h6a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2H6A2,2,0,0,0,4,8V20a2,2,0,0,0,2,2h9v2H6a4,4,0,0,1-4-4V8A4,4,0,0,1,6,4H26a4,4,0,0,1,4,4V20a4,4,0,0,1-4,4H21.16Z'>
      </Path>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M8 10H24V12H8zM8 16H18V18H8z'>
      </Path>
    </Svg>
  );
};

export const SearchIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M30,28.59,22.45,21A11,11,0,1,0,21,22.45L28.59,30ZM5,14a9,9,0,1,1,9,9A9,9,0,0,1,5,14Z'>
      </Path>
    </Svg>
  );
};

export const CheckedIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z'>
      </Path>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M14 21.5L9 16.54 10.59 15 14 18.35 21.41 11 23 12.58 14 21.5z'>
      </Path>
    </Svg>
  );
};

export const UncheckedIcon = (props) => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox='0 0 32 32'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
          d='M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z'>
      </Path>
    </Svg>
  );
};
