export const getHeadlineNews = async () => {
  const res = await fetch(
    "https://api-berita-indonesia.vercel.app/cnn/terbaru"
  );
  const data = await res.json();
  return data.data.posts;
};
