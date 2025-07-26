import React from "react";

export default function HashtagMedia({ media }) {
  if (!media || media.length === 0) {
    return <p className="text-center text-gray-500">No media found. Try another hashtag.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {media.map((item) => (
        <div key={item.id} className="bg-gray-50 border rounded p-3 shadow">
          {item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM" ? (
            <img
              src={item.media_url}
              alt={item.caption || ""}
              className="w-full rounded"
            />
          ) : (
            <video controls className="w-full rounded">
              <source src={item.media_url} type="video/mp4" />
            </video>
          )}
          {item.caption && (
            <p className="mt-2 text-sm text-gray-700">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
