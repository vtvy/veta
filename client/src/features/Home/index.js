import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../api/postApi";
import Box from "../../components/Box";
import Post from "../Post";
import PostCard from "../Post/components/PostCard";
import { setPostList } from "../Post/postSlice";

function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await postApi.getAll();
        if (res.data.success) {
          const action = setPostList(res.data.listOfPost);
          dispatch(action);
          setIsLoading(false);
        }
      } catch (error) {
        alert(error);
      }
    };
    getAllPosts();
  }, []);

  const postList = useSelector((state) => state.post.postList);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="story-slide">
        <Box width="w-full">
          <div className="h-80"></div>
        </Box>
      </div>
      <Post />
      {isLoading && (
        <Box custom="h-96">
          <div className="animate-pulse flex space-x-4 h-96">
            <div className="rounded-full bg-gray-700 h-20 w-20"></div>
            <div className="flex-1 space-y-20 py-1">
              <div className="h-8 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-8 bg-gray-700 rounded col-span-2"></div>
                  <div className="h-8 bg-gray-700 rounded col-span-1"></div>
                </div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </Box>
      )}
      {!isLoading &&
        postList.map((post, index) => (
          <div key={index}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
}
export default Home;
