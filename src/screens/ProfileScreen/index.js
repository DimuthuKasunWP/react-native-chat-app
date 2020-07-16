import React from 'react'
import PropTypes from 'prop-types'


import Profile from './Profile'

const ProfileScreen = (props) => <Profile {...props} />

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen