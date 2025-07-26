import React, { useState } from "react";

export default function HashtagSearch({ accessToken, userId }) {
  const [hashtag, setHashtag] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHashtag = async () => {
    setLoading(true);
    try {
      const searchUrl = `https://graph.facebook.com/v20.0/ig_hashtag_search?user_id=${userId}&q=${hashtag}&access_token=${accessToken}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (searchData.data && searchData.data.length > 0) {
        const tagId = searchData.data[0].id;
        fetchHashtagMedia(tagId);
      } else {
        setMedia([]);
        alert("Hashtag not found.");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching hashtag.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHashtagMedia = async (tagId) => {
    const mediaUrl = `https://graph.facebook.com/v20.0/${tagId}/recent_media?user_id=${userId}&fields=id,media_type,media_url,caption,timestamp&access_token=${accessToken}`;
    const mediaRes = await fetch(mediaUrl);
    const mediaData = await mediaRes.json();
    setMedia(mediaData.data || []);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Instagram Hashtag Media Viewer</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          className="border rounded px-4 py-2 w-full sm:w-auto"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="Enter hashtag (no #)"
        />
        <button
          onClick={searchHashtag}
          disabled={loading || !hashtag.trim()}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {media.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-gray-50 border rounded p-3 shadow">
              {item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM" ? (
                <img src={item.media_url} alt={item.caption || ""} className="w-full rounded" />
              ) : (
                <video controls className="w-full rounded">
                  <source src={item.media_url} type="video/mp4" />
                </video>
              )}
              {item.caption && <p className="mt-2 text-sm text-gray-700">{item.caption}</p>}
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No media found. Try another hashtag.</p>
      )}
    </div>
  );
}