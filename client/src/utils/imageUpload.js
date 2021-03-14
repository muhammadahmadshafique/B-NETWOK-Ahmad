export const checkImage = (file) => {
	let error = ''
	if (!file) return (error = 'File does not exist.')

	if (file.size > 1024 * 1024)
		// 1MB
		return (error = 'File should be less than 1MB.')

	if (file.type !== 'image/jpeg' && file.type !== 'image/png') return (error = 'Image format is incorrect.')

	return error
}

export const imageUpload = async (images) => {
	let imageArr = []
	for (const item of images) {
		const formData = new FormData()

		if (item.camera) {
			formData.append('file', item.camera)
		} else {
			formData.append('file', item)
		}

		formData.append('upload_preset', 'uj5bctsw')
		formData.append('cloud_name', 'bilal-cloud')

		const res = await fetch('https://api.cloudinary.com/v1_1/bilal-cloud/image/upload', {
			method: 'POST',
			body: formData,
		})

		const data = await res.json()
		imageArr.push({ public_id: data.public_id, url: data.secure_url })
	}
	return imageArr
}
