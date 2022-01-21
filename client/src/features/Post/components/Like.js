import React, { useState } from 'react';

function Like({ likes }) {
	const [isLikePost, setIsLikePost] = useState(true);
	const handleLikePost = () => {
		setIsLikePost(!isLikePost);
	};
	return (
		<>
			<div className="relative flex-1">
				<div
					className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative dark:text-textColorDark"
					onClick={handleLikePost}
				>
					<i
						className={`${
							isLikePost ? ' text-blue-700 fas' : 'far text-black far'
						} fa-thumbs-up `}
					></i>{' '}
					Like
				</div>
			</div>
		</>
	);
}

export default Like;
