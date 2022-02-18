import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CardSection from '../../../components/CardSection';
import QuickViewUser from '../../../components/QuickViewUser';
import Follow from '../../Follow';

function ListOfSearch({ listOfSearch }) {
	const navigate = useNavigate();
	useEffect(() => {
		if (!listOfSearch) {
			navigate('/');
		}
	}, [listOfSearch]);

	return (
		<>
			{listOfSearch && (
				<div className="w-[48.2rem] ml-2">
					<CardSection title="Search Result">
						<div className="space-y-4">
							{listOfSearch.length > 0 ? (
								listOfSearch.map((user, index) => (
									<div
										key={index}
										className="flex justify-between p-2 rounded-lg shadow bg-slate-200 dark:bg-indigo-1000 dark:border dark:border-indigo-950"
										width="full"
									>
										<QuickViewUser user={user} showFollower={true} />
										<Follow id={user._id} listOfFollowers={user.followers} />
									</div>
								))
							) : (
								<div className="flex justify-center">
									<span className="text-indigo-600">
										Sorry, we couldn't find any results for this search
									</span>
								</div>
							)}
						</div>
					</CardSection>
				</div>
			)}
		</>
	);
}

export default ListOfSearch;
