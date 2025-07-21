import React, { useState } from "react";
import EmbeddedInstagram from "./components/EmbeddedInstagram";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const ManageInstaProfile = () => {
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const userAccounts = [
    {
      id: 1,
      name: "PixelFrame",
      profileImage:
        "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?...",
      description: "Capturing moments one pixel at a time. 📷",
      location: "Bangalore, India",
      posts: 9,
      followers: 3024,
      followings: 311,
      dummyPosts: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1744039016504-9927d8e7e101?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDl8fHxlbnwwfHx8fHw%3D",
        },
        {
          type: "video",
          src: "https://cdn.pixabay.com/video/2024/02/28/202368-918049003_large.mp4",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1682687219640-b3f11f4b7234?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/33005130/14067143_2560_1440_60fps.mp4",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/7857990/7857990-uhd_1440_2560_24fps.mp4",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/32921141/14031244_2560_1440_30fps.mp4",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1741696482470-37544b32e8e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
    {
      id: 2,
      name: "NatureSoul",
      profileImage:
        "https://plus.unsplash.com/premium_photo-1661952578770-79010299a9f9?...",
      description: "Exploring the wild & living slow 🌿 #NatureLover",
      location: "Manali, Himachal",
      posts: 10,
      followers: 4120,
      followings: 500,
      dummyPosts: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1597167231350-d057a45dc868?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1634019580756-22eb6d705cf2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "image",
          src: "https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/6981411/6981411-hd_1920_1080_25fps.mp4",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/5147455/5147455-hd_1080_1920_30fps.mp4",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1657894736581-ccc35d62d9e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          type: "video",
          src: "https://videos.pexels.com/video-files/4919750/4919750-uhd_2732_1440_25fps.mp4",
        },
      ],
    },
  ];

  const handleBackToOne = () => {
    setStep(1);
  };

  const renderSingleProfile = (account) => (
    <div className="mb-10">
      <button onClick={handleBackToOne}>
        {" "}
        <ArrowBackOutlinedIcon sx={{ fontSize: 20 }} />
      </button>
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-6 mt-2">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={account.profileImage}
            alt={account.name}
            className="w-20 h-20 rounded-full border-4 border-black shadow-md object-cover bg-gray-200"
          />

          <div className="text-between  md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">{account.name}</h2>
            <p className="text-sm mt-1 max-w-md leading-relaxed text-center md:text-start">
              {account.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">{account.location}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-col lg:flex-row md:items-center gap-4 mt-4 sm:mt-0">
          <div className="flex gap-6 text-black font-medium justify-center md:justify-start">
            <div className="flex flex-col justify-center items-center">
              Posts <span>{account.posts}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              Followers <span>{account.followers}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              Following <span>{account.followings}</span>
            </div>
          </div>

          <button className="ml-4 px-5 py-2 border border-black text-black font-medium hover:bg-black hover:text-white transition-all rounded-md">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Post Gallery */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {account.dummyPosts.map((post, idx) => (
          <div
            key={idx}
            className=" overflow-hidden border border-black hover:scale-105 transition-transform rounded-md shadow-sm"
          >
            {post.type === "image" ? (
              <img
                src={post.src}
                alt={`Post ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={post.src}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div> 
    </div>
  );

  const renderMultipleProfiles = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userAccounts.map((account) => (
        <div
          key={account.id}
          className="bg-white shadow-md p-5 rounded-xl border border-gray-200"
        >
          <div className="flex flex-col items-center">
            <img
              src={account.profileImage}
              alt={account.name}
              className="w-20 h-20 rounded-full border-4 border-black object-cover bg-gray-200 mb-4"
            />
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold">{account.name}</h3>
              <p className="text-xs text-gray-500">{account.location}</p>
              <p className="text-sm text-center mt-2">{account.description}</p>
            </div>
            <div className="flex justify-center gap-6 text-sm font-medium mt-4">
              <div>
                Posts <div>{account.posts}</div>
              </div>
              <div>
                Followers <div>{account.followers}</div>
              </div>
              <div>
                Following <div>{account.followings}</div>
              </div>
            </div>

            {/* View Profile Button */}
            <button
              onClick={() => {
                setSelectedProfile(account);
                setStep(2);
              }}
              className="mt-4 px-4 py-2 text-sm border border-black text-black hover:bg-black hover:text-white rounded-md"
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* {step === 1 ? (
        <EmbeddedInstagram setStep={setStep} />
      ) : (
        <div className="bg-blue-50 w-full min-h-screen text-gray-800 dark:text-white p-10">
          {selectedProfile ? (
            renderSingleProfile(selectedProfile)
          ) : userAccounts.length === 1 ? (
            renderSingleProfile(userAccounts[0])
          ) : (
            renderMultipleProfiles()
          )}
        </div>
      )} */}
      <EmbeddedInstagram setStep={setStep} />
      <div className="bg-blue-50 w-full min-h-screen text-gray-800 dark:text-white p-10">
        {selectedProfile
          ? renderSingleProfile(selectedProfile)
          : userAccounts.length === 1
          ? renderSingleProfile(userAccounts[0])
          : renderMultipleProfiles()}
      </div>
    </>
  );
};

export default ManageInstaProfile;
