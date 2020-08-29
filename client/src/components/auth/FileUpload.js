import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './file-upload.scss';


const FileUpload = () => {
	const [ file, setFile ] = useState(''); // store the uploaded file/received file from backend
	const [ data, setFiles ] = useState({ name: '', path: '' });
	const [ progress, setProgress ] = useState(0); //progress bar


	const el = useRef(); // access inp el

	const handleChangeFile = (e) => {
		setProgress(0);
		const file = e.target.files[0];
		setFile(file);
	};

	const uploadFile = async () => {
		const formData = new FormData();
		formData.append('file', file);
		await axios
			.post('/upload', formData, {
				onUploadProgress: (ProgressEvent) => {
					let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
					setProgress(progress);
				}
			})
			.then((res) => {
				setFiles({
					name: res.data.name,
					path: 'http://localhost:4000' + res.data.path
				});
			})
			.catch((err) => console.log(err));
	};

  const copyToClipboard = () => {
    const copyText = document.getElementById('fileFilename');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    console.log('copied', copyText.value);
  }

  // console.log(data.name);

	return (
		<div>
			<div className="file-upload">
				<input className="button upload-button" type="file" ref={el} onChange={handleChangeFile} />

				<div className="progessBar" >
					{progress}%
				</div>

				<button className="button" onClick={uploadFile} >
					Upload
				</button>

				{/* display received image*/}
				{ /* data.path && <img src={data.path} alt={data.name} /> */}

				<br />
				<input type="text" className="clipboard" defaultValue={data.name}  id="fileFilename" required />

        <button className="button" onClick={copyToClipboard}>Copy File Name</button>
				<hr />

			
			</div>
		</div>
	);
};

FileUpload.propTypes = {};

export default FileUpload;
