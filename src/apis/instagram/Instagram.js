// exchange the code for token
// export const exchangeCodeForToken = async (data) => {
//   console.log("Exchanging code for token with data:", data);
//   // const params = new URLSearchParams(data);
//   return await fetch("https://api.instagram.com/oauth/access_token", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// };

export const exchangeCodeForToken = async (data) => {
  console.log("Exchanging code for token with data:", data);

  // Convert data object into URL-encoded format
  const params = new URLSearchParams(data);

  return await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Required for Instagram
    },
    body: params.toString(), // URL-encoded form data
  });
};

// get a long lived token
export const getLongLivedToken = async (data) => {
  console.log("Exchanging code for token with data:", data);
  return await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${data.client_secret}&access_token=${data.access_token}`,
    {
      method: "GET",
    }
  );
};

// get a Instagram profile
export const getInstagramProfile = async (accessToken) => {
  return await fetch(
    "https://graph.instagram.com/v23.0/me?fields=user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
