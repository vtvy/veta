import React, { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';

function ListOfChildrenComments() {
	const apiURL = '/childrenComment';
	const [listOfComments, setListOfComments] = useState([]);

	const myListOfComments = [
		{
			_id: 1,
			commentText: '2',
			commentImage: '',
			user: { _id: '1', name: 'Nhat', avatar: '' },
			post: { _id: '' },
		},
		{
			_id: 1,
			commentText: '3',
			commentImage: '',
			user: { _id: '1', name: 'Nhat', avatar: '' },
			post: { _id: '' },
		},
		{
			_id: 1,
			commentText: '4',
			commentImage: '',
			user: { _id: '1', name: 'Nhat', avatar: '' },
			post: { _id: '' },
		},
		{
			_id: 1,
			commentText: '5',
			commentImage: '',
			user: { _id: '1', name: 'Nhat', avatar: '' },
			post: { _id: '' },
		},
	];
	useEffect(() => {
		const getListOfComments = async () => {
			try {
				const res = await axiosClient.get(apiURL);
				if (res.data.success) {
					// setListOfComments([...res.data.listOfComments]);
					setListOfComments(myListOfComments);
				} else console.log(1);
			} catch (error) {
				console.log(error);
			}
		};
		getListOfComments();
	}, []);
	return <div></div>;
}

export default ListOfChildrenComments;
