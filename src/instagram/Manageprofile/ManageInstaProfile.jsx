import React, { useState, useEffect } from "react";
import EmbeddedInstagram from "./components/EmbeddedInstagram";
import AddPostDialog from "./components/AddPostDialog";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { getInstagramProfile } from "@/apis/instagram/instagram";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "primereact/dialog";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageInstaProfile = () => {
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userProfileDetails, setUserProfileDetails] = useState();
  const [userAceessToken, setUserAccessToken] = useState("");
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openPostDetails, setOpenPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendPost = (user) => {
    setOpenShare(false);
    setSelectedUser(user)
    setOpenPostDetails(false)
  };

  const instaUsers = [
    {
      username: "wanderlust_queen",
      fullName: "Aarushi Sharma",
      bio: "✈️ Globetrotter | Coffee Addict ☕ | Capturing Moments 📸",
      profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
      followers: 12400,
      following: 382,
      posts: 76,
      isVerified: true,
    },
    {
      username: "techie_aj",
      fullName: "Ajay Kumar",
      bio: "💻 Frontend Dev | Open Source 💡 | Tweets → IG 📱",
      profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
      followers: 8400,
      following: 512,
      posts: 102,
      isVerified: false,
    },
    {
      username: "petverse",
      fullName: "Simran & Max 🐶",
      bio: "Dog mom 🐾 | Daily pawsitivity 🐕 | #GoldenRetrieverLife",
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      followers: 15600,
      following: 390,
      posts: 144,
      isVerified: false,
    },
    {
      username: "fitness_junkie_92",
      fullName: "Rahul Dev",
      bio: "🏋️‍♂️ Trainer | Meal Preps | Hustle & Muscle 💪",
      profilePic: "https://randomuser.me/api/portraits/men/56.jpg",
      followers: 9900,
      following: 610,
      posts: 88,
      isVerified: true,
    },
    {
      username: "artistic.anvi",
      fullName: "Anvi Choudhary",
      bio: "🎨 Digital Artist | Commissions open | DM me ✉️",
      profilePic: "https://randomuser.me/api/portraits/women/30.jpg",
      followers: 5200,
      following: 290,
      posts: 47,
      isVerified: false,
    },
  ];

  const handleShare = () => {
    setOpenShare(true);
  };

  console.log("loaded:", loaded);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getUserInstagramProfile = async (accessToken) => {
  //   try {
  //     const userProfile = await getInstagramProfile({
  //       accessToken: accessToken,
  //     });

  //     setUserProfileDetails(userProfile);

  //     console.log("userProfile:", userProfile);
  //   } catch (err) {
  //     console.error("User Profile", err);
  //     setError("Failed to fetch user profile");
  //   }
  // };

  // useEffect(() => {
  //   if (userAceessToken) {
  //     getUserInstagramProfile(userAceessToken);
  //   }
  // })

  useEffect(() => {
    const userAccounts = [
      {
        user_id: 1,
        username: "PixelFrame",
        profile_picture_url:
          "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?...",
        description: "Capturing moments one pixel at a time. 📷",
        location: "Bangalore, India",
        media_count: 9,
        followers_count: 3024,
        follows_count: 311,
        dummyPosts: [
          {
            type: "image",
            likes: 120,
            comments: 15,
            caption: "A beautiful sunset over the mountains.",
            commentsDetails: ["Great shot!", "Love this!"],
            src: "https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            type: "image",
            likes: 920,
            comments: 65,
            commentsDetails: ["Great shot!", "Love this!"],
            src: "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            type: "image",
            likes: 120,
            comments: 15,
            src: "https://images.unsplash.com/photo-1744039016504-9927d8e7e101?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDl8fHxlbnwwfHx8fHw%3D",
          },
          {
            type: "video",
            likes: 120,
            comments: 15,
            src: "https://cdn.pixabay.com/video/2024/02/28/202368-918049003_large.mp4",
          },
          {
            type: "image",
            likes: 120,
            comments: 15,
            src: "https://images.unsplash.com/photo-1682687219640-b3f11f4b7234?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            type: "video",
            likes: 120,
            comments: 15,
            src: "https://videos.pexels.com/video-files/33005130/14067143_2560_1440_60fps.mp4",
          },
          {
            type: "video",
            likes: 120,
            comments: 15,
            src: "https://videos.pexels.com/video-files/7857990/7857990-uhd_1440_2560_24fps.mp4",
          },
          {
            type: "video",
            likes: 120,
            comments: 15,
            src: "https://videos.pexels.com/video-files/32921141/14031244_2560_1440_30fps.mp4",
          },
          {
            type: "image",
            likes: 120,
            comments: 15,
            src: "https://images.unsplash.com/photo-1741696482470-37544b32e8e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            type: "tags",
            likes: 120,
            comments: 15,
            src: "https://images.pexels.com/photos/3910065/pexels-photo-3910065.jpeg",
          },
        ],
      },
      // {
      //   user_id: 2,
      //   username: "NatureSoul",
      //   profile_picture_url:
      //     "https://plus.unsplash.com/premium_photo-1661952578770-79010299a9f9?...",
      //   description: "Exploring the wild & living slow 🌿 #NatureLover",
      //   location: "Manali, Himachal",
      //   media_count: 10,
      //   followers_count: 4120,
      //   follows_count: 500,
      //   dummyPosts: [
      //     {
      //       type: "image",
      //       src: "https://images.unsplash.com/photo-1597167231350-d057a45dc868?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //     },
      //     {
      //       type: "video",
      //       src: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
      //     },
      //     {
      //       type: "image",
      //       src: "https://images.unsplash.com/photo-1634019580756-22eb6d705cf2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //     },
      //     {
      //       type: "image",
      //       src: "https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //     },
      //     {
      //       type: "video",
      //       src: "https://videos.pexels.com/video-files/6981411/6981411-hd_1920_1080_25fps.mp4",
      //     },
      //     {
      //       type: "video",
      //       src: "https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4",
      //     },
      //     {
      //       type: "video",
      //       src: "https://videos.pexels.com/video-files/5147455/5147455-hd_1080_1920_30fps.mp4",
      //     },
      //     {
      //       type: "image",
      //       src: "https://images.unsplash.com/photo-1657894736581-ccc35d62d9e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //     },
      //     {
      //       type: "image",
      //       src: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //     },
      //     {
      //       type: "video",
      //       src: "https://videos.pexels.com/video-files/4919750/4919750-uhd_2732_1440_25fps.mp4",
      //     },
      //   ],
      // },
    ];

    setUserProfileDetails(userAccounts);
  }, []);

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
            src={account.profile_picture_url}
            alt={account.username}
            className="w-20 h-20 rounded-full border-4 border-black shadow-md object-cover bg-gray-200"
          />

          <div className="text-between  md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">{account.username}</h2>
            <p className="text-sm mt-1 max-w-md leading-relaxed text-center md:text-start">
              {account.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">{account.location}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-col lg:flex-row md:items-center gap-4 mt-4 sm:mt-0">
          <div className="flex gap-6 text-black font-medium justify-center md:justify-start">
            <div className="flex flex-col justify-center items-center">
              Posts <span>{account.media_count}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              Followers <span>{account.followers_count}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              Following <span>{account.follows_count}</span>
            </div>
          </div>

          <button className="ml-4 px-5 py-2 border border-black text-black font-medium hover:bg-black hover:text-white transition-all rounded-md">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Post Gallery */}

      <div className="flex items-center justify-between mt-6">
        {/* Centered Tabs */}
        <div className="flex-1 flex justify-center">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Posts" />
            <Tab label="Reels" />
            <Tab label="Tags" />
          </Tabs>
        </div>

        {/* Right-aligned Button */}
        <button
          onClick={() => setOpenPostDialog(true)}
          className="ml-4 px-2 py-1 border border-black text-black font-medium hover:bg-black hover:text-white transition-all rounded-md"
        >
          Add New Post
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {account.dummyPosts
          .filter((post) => {
            if (value === 0) return post.type === "image";
            if (value === 1) return post.type === "video";
            if (value === 2) return post.type === "tags";
            return false;
          })
          .map((post, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden border border-black rounded-md shadow-sm hover:scale-105 transition-transform"
              onClick={() => {
                setOpenPostDetails(true);
                setSelectedPost(post);
              }}
            >
              {!loaded && (
                <Skeleton
                  height="100%"
                  width="100%"
                  className="absolute inset-0 z-0"
                />
              )}

              {/* Media */}
              {value === 0 || value === 2 ? (
                <img
                  src={post.src}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => setLoaded(true)}
                />
              ) : (
                <video
                  src={post.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoadedData={() => setLoaded(true)}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white flex items-center gap-4 text-sm sm:text-base font-medium">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.02 4.02 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C13.09 5.01 14.76 4 16.5 4 18.98 4 21 6.02 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 2H4C2.897 2 2 2.897 2 4v14l4-4h14c1.103 0 2-.897 2-2V4C22 2.897 21.103 2 20 2z" />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {openPostDialog && (
        <AddPostDialog
          open={openPostDialog}
          setOpenPostDialog={setOpenPostDialog}
          setUserProfileDetails={setUserProfileDetails}
        />
      )}

      {openPostDetails && selectedPost && (
        <Dialog
          header={null}
          visible={openPostDetails}
          style={{ width: "480px", maxWidth: "90vw" }}
          onHide={() => setOpenPostDetails(false)}
          className="rounded-xl overflow-hidden"
        >
          <div className="flex flex-col gap-4 p-4">
            {/* Media */}
            <div className="w-full h-56 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
              {selectedPost.type === "image" || selectedPost.type === "tags" ? (
                <img
                  src={selectedPost.src}
                  alt="Selected Post"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <video
                  src={selectedPost.src}
                  controls
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Metadata */}
            <div className="flex justify-between text-gray-700 text-sm font-medium">
              {/* Likes & Share */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-red-500">❤️</span>
                  <span>{selectedPost.likes}</span>
                </div>

                {/* Share button */}
                <button
                  onClick={() => setOpenShare((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-black transition"
                >
                  <span className="text-green-500">🔗</span>
                  <span className="text-xs">Share</span>
                </button>
              </div>

              {/* Comments Count */}
              <div className="flex items-center gap-1">
                <span className="text-blue-500">💬</span>
                <span>{selectedPost.comments}</span>
              </div>
            </div>

            {/* Caption */}
            {selectedPost.caption && (
              <p className="text-gray-700 text-sm">{selectedPost.caption}</p>
            )}

            {/* Comments */}
            {selectedPost.commentsDetails?.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-md text-sm max-h-40 overflow-y-auto">
                <h4 className="font-medium text-gray-800 mb-2">Comments</h4>
                <ul className="space-y-1">
                  {selectedPost.commentsDetails.map((comment, index) => (
                    <li key={index} className="text-gray-600">
                      • {comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 👇 Share List */}
            {openShare && (
              <div className="mt-2 max-h-48 overflow-y-auto bg-gray-50 rounded-md p-2">
                <h4 className="font-semibold text-gray-800 mb-2">Share with</h4>
                {instaUsers.map((user) => (
                  <div
                    key={user.username}
                    onClick={() =>handleSendPost(user.username)}
                    className={`flex items-center gap-4 p-2 border-b last:border-none cursor-pointer transition-colors ${
                      selectedUser === user.username
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={user.profilePic}
                      alt={user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1">
                        {user.username}
                        {user.isVerified && (
                          <span className="text-blue-500">✔️</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{user.fullName}</p>
                      <p className="text-xs text-gray-400">{user.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );

  const renderMultipleProfiles = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userProfileDetails?.map((account) => (
        <div
          key={account?.user_id}
          className="bg-white shadow-md p-5 rounded-xl border border-gray-200"
        >
          <div className="flex flex-col items-center">
            <img
              src={account?.profile_picture_url}
              alt={account?.username}
              className="w-20 h-20 rounded-full border-4 border-black object-cover bg-gray-200 mb-4"
            />
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold">{account?.username}</h3>
              <p className="text-xs text-gray-500">{account?.location}</p>
              <p className="text-sm text-center mt-2">{account?.description}</p>
            </div>
            <div className="flex justify-center gap-6 text-sm font-medium mt-4">
              <div>
                Posts <div>{account?.media_count}</div>
              </div>
              <div>
                Followers <div>{account?.followers_count}</div>
              </div>
              <div>
                Following <div>{account?.follows_count}</div>
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
      <EmbeddedInstagram
        setStep={setStep}
        userAceessToken={userAceessToken}
        setUserAccessToken={setUserAccessToken}
      />
      <div className="bg-blue-50 w-full min-h-screen text-gray-800 dark:text-white p-10">
        {selectedProfile
          ? renderSingleProfile(selectedProfile)
          : userProfileDetails?.length === 1
          ? renderSingleProfile(userProfileDetails[0])
          : renderMultipleProfiles()}
      </div>
    </>
  );
};

export default ManageInstaProfile;
