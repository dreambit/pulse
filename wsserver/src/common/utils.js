
module.exports = {

    /**
     * {
     *   name
     *   gender
     *   countryCode
     *   level
     *   favoriteTopics [
     *     {
     *       topicName
     *     }
     *   ]
     *   contacts [
     *     {
     *       type
     *       value
     *     }
     *   ]
     *
     * }
     * @param user
     */
    validateUser: (user) => {
        return user.userName;
    }
}
