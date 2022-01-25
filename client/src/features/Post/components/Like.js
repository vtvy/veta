import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import postApi from '../../../api/postApi';

function Like({ listLike, postID, setLikes }) {
	const [isLikePost, setIsLikePost] = useState(
		listLike.includes(useSelector((state) => state.user.current._id))
	);
	const handleLikePost = async () => {
		try {
			const res = await postApi.setLove(postID);
			if (res.data.success) {
				const isLikePost = res.data.state === 1 ? true : false;
				setIsLikePost(isLikePost);
				setLikes((prev) => res.data.state + prev);
			} else console.log(res.data.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="relative flex-1">
				<div
					className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative "
					onClick={handleLikePost}
				>
					{isLikePost === false ? (
						<i className="text-black dark:text-textColorDark far fa-thumbs-up "></i>
					) : (
						<i className="text-indigo-600 fas fa-thumbs-up"></i>
					)}
					Like
				</div>
			</div>
		</>
	);
}

export default Like;
