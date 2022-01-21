import React, { Fragment, useState } from 'react';

import axios from 'axios';
import RegisterForm from './features/Auth/components/RegisterForm';

const Test = () => {
	const [file, setFile] = useState('');
	const [filename, setFilename] = useState('Choose File');
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		console.log(formData);

		try {
			const res = await axios.post(
				`http://localhost:9999/api/auth/register`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			const { fileName, filePath } = res.data;
			console.log(res.data);
			setUploadedFile({ fileName, filePath });
		} catch (err) {
			if (err.response.status === 500) {
			} else {
			}
		}
	};

	return (
		<div className="w-full">
			<RegisterForm />
		</div>
	);
};

export default Test;
