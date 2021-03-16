import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPost, updatePost } from '../redux/actions/postAction'
import { GLOBALTYPES } from '../redux/constants'

const StatusModal = () => {
	const { auth, theme, status } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [content, setContent] = useState('')
	const [images, setImages] = useState([])

	const [stream, setStream] = useState(false)
	const videoRef = useRef()
	const refCanvas = useRef()
	const [tracks, setTracks] = useState('')

	const handleChangeImages = (e) => {
		const files = [...e.target.files]
		let error = ''
		let newImages = []

		files.forEach((file) => {
			if (!file) return (error = 'Please select a file.')

			if (file.type !== 'image/jpeg' && file.type !== 'image/png') return (error = 'Image format is incorrect.')

			return newImages.push(file)
		})

		if (error) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error } })

		setImages([...images, ...newImages])
	}

	const deleteImages = (index) => {
		const newArr = [...images]
		newArr.splice(index, 1)
		setImages(newArr)
	}

	const handleStream = () => {
		setStream(true)

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((mediaStream) => {
					videoRef.current.srcObject = mediaStream
					videoRef.current.play()

					const track = mediaStream.getTracks()

					setTracks(track[0])
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	const handleCapture = () => {
		const width = videoRef.current.clientWidth
		const height = videoRef.current.clientHeight

		refCanvas.current.setAttribute('width', width)
		refCanvas.current.setAttribute('height', height)

		const ctx = refCanvas.current.getContext('2d')
		ctx.drawImage(videoRef.current, 0, 0, width, height)
		let URL = refCanvas.current.toDataURL()

		setImages([...images, { camera: URL }])
	}

	const handleStopStream = () => {
		if (tracks.stop) {
			tracks.stop()
		}
		setStream(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (images.length === 0) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Please add your photo.' } })

		if (status.onEdit) {
			dispatch(updatePost({ content, images, auth, status }))
		} else {
			dispatch(createPost({ content, images, auth }))
		}

		setContent('')
		setImages([])
		if (tracks) tracks.stop()
		dispatch({ type: GLOBALTYPES.STATUS, payload: false })
	}

	useEffect(() => {
		if (status.onEdit) {
			setContent(status.content)
			setImages(status.images)
		}
	}, [status])

	return (
		<div className="status_modal">
			<form onSubmit={handleSubmit}>
				<div className="status_header">
					<h5 className="m-0">Create Post</h5>
					<span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>&times;</span>
				</div>

				<div className="status_body">
					<textarea
						name="content"
						value={content}
						placeholder={`${auth.user.username}, What are you thinking? `}
						onChange={(e) => setContent(e.target.value)}
					/>

					<div className="show_images">
						{images.map((img, index) => (
							<div key={index} id="file_img">
								<img
									src={img.camera ? img.camera : img.url ? img.url : URL.createObjectURL(img)}
									alt="images"
									className="img-thumbnail"
									style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
								/>
								<span onClick={() => deleteImages(index)}>&times;</span>
							</div>
						))}
					</div>

					{stream && (
						<div className="stream position-relative">
							<video autoPlay muted ref={videoRef} width="100%" height="100%" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

							<span onClick={handleStopStream}>&times;</span>
							<canvas ref={refCanvas} style={{ display: 'none' }} />
						</div>
					)}

					<div className="input_images">
						{stream ? (
							<i className="fas fa-camera" onClick={handleCapture} />
						) : (
							<>
								<i className="fas fa-camera" onClick={handleStream} />
								<div className="file_upload">
									<i className="fas fa-images" />

									<input type="file" name="file" id="file" multiple accept="image/*" onChange={handleChangeImages} />
								</div>
							</>
						)}
					</div>
				</div>

				<div className="status_footer my-3">
					<button className="btn btn-secondary w-100" type="submit">
						Post
					</button>
				</div>
			</form>
		</div>
	)
}

export default StatusModal
