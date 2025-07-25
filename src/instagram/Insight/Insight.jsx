import React, { useState, useEffect } from "react";
import FollowersChart from "@/instagram/Insight/components/FollowersChart";
import AudienceSection from "@/instagram/Insight/components/Audiences";
import AgeRangeInsights from "@/instagram/Insight/components/AgeRange";
import TopCitiesInsight from "@/instagram/Insight/components/TownCities";
import ProfileActivity from "@/instagram/Insight/components/ProfileActivity";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";

const Insight = () => {
  const [selectedTab, setSelectedTab] = useState("7days");
  const [selectedContentType, setSelectedContentType] = useState("All");
  const [accountSelection, setAccountSelection] = useState(null);
  const [selectMedia, setSelectMedia] = useState(null);
  const [reelSelection, setReelSelection] = useState(null);
  const [imageSelection, setImageSelection] = useState(null);

  const stats = [
    { label: "Profile Visits", value: 1200 },
    { label: "Reach", value: 980 },
    { label: "Impressions", value: 3400 },
    { label: "Website Clicks", value: 76 },
  ];

  const tabs = ["7days", "30days", "90days"];
  const ContentTypes = ["All", "Followers", "Non-Followers"];

  const ContentTypeStats = [
    { label: "Stories", percent: 95.0, followers: 15, nonFollowers: 80 },
    { label: "Reels", percent: 2.9, followers: 1, nonFollowers: 1.9 },
    { label: "Posts", percent: 2.1, followers: 0.5, nonFollowers: 1.6 },
    { label: "Videos", percent: 0.0, followers: 0, nonFollowers: 0 },
  ];

  const TopContent = [
    {
      date: "26 Jun",
      views: "39K",
      type: "image",
      src: "https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      date: "15 Jul",
      views: "541",
      type: "image",
      src: "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      date: "12 Jul",
      views: "260",
      type: "video",
      src: "https://cdn.pixabay.com/video/2024/02/28/202368-918049003_large.mp4",
    },
    {
      date: "18 Jul",
      views: "232",
      type: "video",
      src: "https://videos.pexels.com/video-files/33005130/14067143_2560_1440_60fps.mp4",
    },
  ];

  const userSelection = [
    { label: "PixelFrame", value: "1" },
    { label: "NatureSoul", value: "2" },
  ];

  const MediaSelection = [
    { label: "All", value: "all" },
    { label: "Posts", value: "posts" },
  ];

  const PostSelection = [
    { label: "Reels", value: "reels" },
    { label: "Image", value: "Image" },
  ];

  const ReelStats = [
    { label: "Reels1", value: "reels1" },
    { label: "Reels2", value: "reels2" },
    { label: "Reels3", value: "reels3" },
    { label: "Reels4", value: "reels4" },
    { label: "Reels5", value: "reels5" },
    { label: "Reels6", value: "reels6" },
    { label: "Reels7", value: "reels7" },
    { label: "Reels8", value: "reels8" },
    { label: "Reels9", value: "reels9" },
    { label: "Reels10", value: "reels10" },
  ];

  const ImageStats = [
    { label: "Image1", value: "Image1" },
    { label: "Image2", value: "Image2" },
    { label: "Image3", value: "Image3" },
    { label: "Image4", value: "Image4" },
    { label: "Image5", value: "Image5" },
    { label: "Image6", value: "Image6" },
    { label: "Image7", value: "Image7" },
    { label: "Image8", value: "Image8" },
    { label: "Image9", value: "Image9" },
    { label: "Image10", value: "Image10" },
  ];

  
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
      {
        user_id: 2,
        username: "NatureSoul",
        profile_picture_url:
          "https://plus.unsplash.com/premium_photo-1661952578770-79010299a9f9?...",
        description: "Exploring the wild & living slow 🌿 #NatureLover",
        location: "Manali, Himachal",
        media_count: 10,
        followers_count: 4120,
        follows_count: 500,
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

  

  return (
    <>
      <div className="  bg-gray-50  px-4 py-6 flex flex-row space-x-6 ">
        <div className="w-full md:w-66 ">
          <AnimatedDropdown
            label="Instagram Account"
            value={accountSelection}
            options={userSelection}
            onChange={setAccountSelection}
          />
        </div>

        {accountSelection && (
          <div className="w-full md:w-66 ">
            <AnimatedDropdown
              label="Instagram Media"
              value={selectMedia}
              options={MediaSelection}
              onChange={setSelectMedia}
              className="w-56"
            />
          </div>
        )}

        {selectMedia === "posts" && (
          <>
            <div className="w-full md:w-66 ">
              <AnimatedDropdown
                label="Instagram Reels"
                value={reelSelection}
                options={ReelStats}
                onChange={setReelSelection}
                className="w-56"
              />
            </div>
            <div className="w-full md:w-66 ">
              <AnimatedDropdown
                label="Instagram Image"
                value={imageSelection}
                options={ImageStats}
                onChange={setImageSelection}
                className="w-56"
              />
            </div>
          </>
        )}
      </div>


      <div className=" mx-auto px-4 py-6 space-y-6 bg-gray-50">
        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full font-medium transition-colors text-sm
              ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>


        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <h4 className="text-sm text-gray-500">{label}</h4>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {/* Post Info Section */}
        {(() => {
          // Find the selected account from userAccounts (from useEffect)
          let selectedAccount = null;
          if (Array.isArray(accountSelection)) {
            // If accountSelection is the array of accounts (initial load)
            selectedAccount = null;
          } else if (accountSelection && accountSelection.label) {
            // If accountSelection is the selected dropdown value
            const allAccounts = [
              {
                user_id: 1,
                username: "PixelFrame",
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
                  // ... (add the rest of PixelFrame's dummyPosts here)
                ],
              },
              {
                user_id: 2,
                username: "NatureSoul",
                dummyPosts: [
                  {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1597167231350-d057a45dc868?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    type: "video",
                    src: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
                  },
                  // ... (add the rest of NatureSoul's dummyPosts here)
                ],
              },
            ];
            selectedAccount = allAccounts.find(
              acc => acc.username === accountSelection.label
            );
          }
          if (selectedAccount && selectedAccount.dummyPosts) {
            return (
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-2">Posts Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedAccount.dummyPosts.map((post, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow p-4">
                      <div className="mb-2">
                        {post.type === "image" ? (
                          <img src={post.src} alt="post" className="w-full h-40 object-cover rounded" />
                        ) : post.type === "video" ? (
                          <video src={post.src} controls className="w-full h-40 object-cover rounded" />
                        ) : null}
                      </div>
                      {post.caption && <p className="text-sm mb-1">{post.caption}</p>}
                      {typeof post.likes !== 'undefined' && <p className="text-xs">Likes: {post.likes}</p>}
                      {typeof post.comments !== 'undefined' && <p className="text-xs">Comments: {post.comments}</p>}
                      {post.commentsDetails && (
                        <ul className="text-xs text-gray-500 mt-1">
                          {post.commentsDetails.map((c, i) => <li key={i}>- {c}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* Chart Section */}

        <div className="bg-white w-full p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Follower Growth</h3>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[320px] flex items-center justify-center">
              <FollowersChart
                selectedTab={selectedTab}
                width="100%"
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Content Type Stats Section */}
        <div className="bg-white p-6 rounded-2xl shadow  mt-4">
          <h2 className="text-lg font-semibold mb-3">By Content Type</h2>
          <div className="flex gap-2">
            {ContentTypes.map((ContentTypes) => (
              <button
                key={ContentTypes}
                onClick={() => setSelectedContentType(ContentTypes)}
                className={`px-4 py-2 rounded-full font-medium transition-colors text-sm 
              ${
                selectedContentType === ContentTypes
                  ? "bg-blue-600 text-white "
                  : "bg-gray-200 text-gray-800 "
              }`}
              >
                {ContentTypes.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {ContentTypeStats.map(
              ({ label, percent, followers, nonFollowers }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 font-medium">
                      {label}
                    </span>
                    <span className="text-sm text-gray-600">{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                    <div
                      className="bg-[#9431A8] h-full"
                      style={{ width: `${followers}%` }}
                    ></div>
                    <div
                      className="bg-[#8D4EDB] h-full"
                      style={{ width: `${nonFollowers}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}

            <div className="text-xs text-gray-500 flex justify-end gap-4 mt-2 pr-1">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-pink-500 rounded-full inline-block" />
                Followers
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-purple-600 rounded-full inline-block" />
                Non-followers
              </div>
            </div>
          </div>

          {/* Top ContentType section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">By Top Content</h2>
              <button className="text-sm text-blue-600 font-medium">
                See All
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {TopContent.map(({ date, views, type, src }, index) => (
                <div
                  key={index}
                  className="relative w-28 h-48 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0"
                >
                  {type === "video" ? (
                    <video
                      src={src}
                      className="object-cover w-full h-full"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={src}
                      alt="top content"
                      className="object-cover w-full h-full"
                    />
                  )}
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-sm text-center py-1">
                    {views}
                  </div>
                  <div className="absolute bottom-0 left-0 text-[10px] text-white p-1">
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AudienceSection  */}
          <div className="flex flex-wrap gap-4 mt-6">
            <h2 className="text-lg font-semibold  ">Audiences </h2>
            <div className="mt-6 w-full flex flex-row gap-4">
              <div className="card bg-white rounded-2xl shadow p-4  gap-2  w-[50%]">
                <AudienceSection />
              </div>
              <div className="card bg-white rounded-2xl shadow p-4 gap-2 w-[50%] ">
                <AgeRangeInsights />
              </div>
              <div className="card bg-white rounded-2xl shadow p-4 gap-2 w-[50%] ">
                <TopCitiesInsight />
              </div>
            </div>
          </div>

          {/* Profile active section */}
          <div>
            {/* <ProfileActivity
              data={{
                total: 472,
                visits: 462,
                visitGrowth: 3.8,
                linkTaps: 10,
                linkGrowth: 100,
              }}
            /> */}

            <ProfileActivity/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insight;
