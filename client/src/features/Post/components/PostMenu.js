import React from 'react';
import Box from '../../../components/Box';

function PostMenu({ setIsEditPost }) {
	return (
		<div className="absolute right-2">
			<Box
				width="w-56"
				custom="py-6"
				bg="bg-slate-300 border-slate-400 border-solid border shadow-2xl"
			>
				<ul>
					<li
						className="hover:bg-slate-200 hover: py-2 -mx-4 px-4 flex items-center border-y border-solid border-slate-200"
						onClick={() => setIsEditPost(true)}
					>
						<i class="fas fa-edit w-10"></i> Edit
					</li>
					<li className="hover:bg-slate-200 hover: py-2 -mx-4 px-4 flex items-center border-b border-solid border-slate-200">
						<i class="fas fa-trash-alt w-10"></i>Delete
					</li>
				</ul>
			</Box>
		</div>
	);
}

export default PostMenu;