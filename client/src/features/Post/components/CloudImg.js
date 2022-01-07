import { Image } from 'cloudinary-react';
import React from 'react';

function CloudImg({ publicId }) {
	return (
		<Image
			className="h-full w-full object-cover"
			publicId={publicId}
			cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
		/>
	);
}

export default CloudImg;
