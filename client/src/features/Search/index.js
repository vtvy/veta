import React, { useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import StorageKeys from '../../constants/storageKeys';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { SearchContext } from '../../App';

function Search() {
	const setSearchResult = useContext(SearchContext);
	let navigate = useNavigate();
	const handleSearch = async (data) => {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		try {
			const url = `user/search/${data.searchValue}`;
			const res = await axiosClient.get(url, { headers: { accessToken } });
			if (res.data.success) {
				setSearchResult(res.data.searchUser);
				navigate('/search');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<SearchBar onSubmit={handleSearch} />
		</>
	);
}

export default Search;
