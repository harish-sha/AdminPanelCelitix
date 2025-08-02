// import React from "react";

// const UniversalInstaButton = ({ label = "Add", onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="relative inline-flex items-center gap-2 px-4 py-1 rounded-full font-semibold text-white 
//                  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
//                  hover:scale-105 transition-transform duration-300 
//                  shadow-md hover:shadow-xl"
//     >
     

//       <span>{label}</span>
//     </button>
//   );
// };

// export default UniversalInstaButton;



// import React from "react";

// const UniversalInstaButton = ({ label = "Add", onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="relative inline-flex items-center gap-2 px-6 py-1 rounded-full font-semibold text-white
//                  bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
//                  bg-[length:200%_200%] animate-gradientMove
//                  hover:scale-110 hover:shadow-[0_0_20px_rgba(255,105,180,0.8)]
//                  transition-all duration-300 ease-out"
//     >
//       <span>{label}</span>
//     </button>
//   );
// };

// export default UniversalInstaButton;


// import React from "react";

// const UniversalInstaButton = ({ label = "Add", onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="relative px-6 py-1 rounded-full font-semibold text-white tracking-wide
//                  bg-gradient-to-r from-pink-500 via-red-500 to-orange-400
//                  hover:from-orange-400 hover:via-red-500 hover:to-pink-500
//                  shadow-[0_4px_15px_rgba(0,0,0,0.3)]
//                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)]
//                  transform hover:-translate-y-1 hover:scale-105
//                  transition-all duration-300 ease-out
//                  overflow-hidden"
//     >
//       {/* Glow Layer */}
//       <span className="absolute inset-0 bg-white/20 blur-md opacity-0 hover:opacity-20 transition-opacity duration-300"></span>

//       {/* Button Label */}
//       <span className="relative z-10">{label}</span>
//     </button>
//   );
// };

// export default UniversalInstaButton;







// import React from "react";

// const UniversalInstaButton = ({ label = "Add", onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="relative px-5 py-1 rounded-full font-bold text-white text-lg tracking-wide
//                  bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400
//                  shadow-[0_4px_15px_rgba(0,0,0,0.3)]
//                  hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out
//                  overflow-hidden group"
//     >
//       {/* Shine Effect */}
//       <span className="absolute inset-0 w-[50%] bg-white/30 blur-lg -left-full group-hover:left-full transition-all duration-500"></span>

//       {/* Button Text */}
//       <span className="relative z-10">{label}</span>
//     </button>
//   );
// };

// export default UniversalInstaButton;


import React from "react";

const UniversalInstaButton = ({
   id,
  name,
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  style }) => {
  return (
    <button
      onClick={onClick}
       id={id}
        name={name}
        type={type}
        style={style}
      className="relative inline-flex items-center justify-center px-5 py-1 text-lg font-bold text-white 
                 rounded-full transition-all duration-500 ease-out 
                 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400
                 bg-[length:200%_200%] animate-gradientMove 
                 shadow-lg hover:shadow-[0_0_20px_rgba(255,105,180,0.8)] 
                 hover:scale-110 overflow-hidden"
    >
      {/* Glow Border */}
      <span className="absolute inset-0 rounded-full border border-white/20"></span>

      {/* Shine Effect */}
      <span className="absolute inset-0 bg-white/20 translate-x-[-100%] rotate-45 group-hover:translate-x-[100%] transition-transform duration-500"></span>

      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default UniversalInstaButton;



// import React from "react";

// const UniversalInstaButton = ({ label = "Add", onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="relative inline-flex items-center justify-center px-5 py-1 text-lg font-bold text-white
//                  transition-all duration-500 ease-out
//                  bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400
//                  bg-[length:200%_200%] animate-gradientMove
//                  shadow-lg hover:shadow-[0_0_25px_rgba(255,105,180,0.8)]
//                  hover:scale-105 border border-white/20"
//     >
//       {/* Shine Effect */}
//       <span className="absolute inset-0 bg-white/20 translate-x-[-100%] rotate-45 group-hover:translate-x-[100%] transition-transform duration-500"></span>
//       <span className="relative z-10">{label}</span>
//     </button>
//   );
// };

// export default UniversalInstaButton;


// import React from "react";

// const UniversalInstaButton = ({ label = "Add", onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="relative px-5 py-1 text-lg font-bold text-white tracking-wide
//                  bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500
//                  bg-[length:200%_200%] animate-gradientFlow
//                  shadow-[0_0_15px_rgba(255,105,180,0.7)]
//                  border-2 border-transparent
//                  hover:border-pink-300 hover:shadow-[0_0_30px_rgba(255,105,180,0.9)]
//                  hover:scale-110 transition-all duration-500 overflow-hidden"
//     >
//       {/* Shine Swipe Effect */}
//       <span className="absolute inset-0 bg-white/30 translate-x-[-100%] rotate-45 
//                        group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>

//       <span className="relative z-10">{label}</span>
//     </button>
//   );
// };

// export default UniversalInstaButton;





