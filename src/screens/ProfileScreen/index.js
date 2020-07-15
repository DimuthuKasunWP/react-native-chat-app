import React from 'react'
import PropTypes from 'prop-types'

import contactData from 'src/components/profile/contact.json'

import Profile from './Profile'

const ProfileScreen = (props) => <Profile {...props} />

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen