const valid = ({ fullname, username, email, password, cf_password }) => {
	const err = {}

	if (!fullname) {
		err.fullname = 'Please Enter your Full name.'
	} else if (fullname.length > 25) {
		err.fullname = 'Full Name should be less than 25 characters.'
	}

	if (!username) {
		err.username = 'Please Enter your Username.'
	} else if (username.replace(/ /g, '').length > 25) {
		err.username = 'Username should be less than 25 characters.'
	}

	if (!email) {
		err.email = 'Please Enter your Email Address.'
	} else if (!validateEmail(email)) {
		err.email = 'Email format is incorrect.'
	}

	if (!password) {
		err.password = 'Please Enter your Password.'
	} else if (password.length < 6) {
		err.password = 'Password should be atleast 6 characters long.'
	}

	if (password !== cf_password) {
		err.cf_password = 'Confirm Password did not match.'
	}

	return {
		errMsg: err,
		errLength: Object.keys(err).length,
	}
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export default valid
