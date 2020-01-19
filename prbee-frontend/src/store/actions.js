export default {
  updateTotalPrice({ commit }, totalPrice) {
    commit('UPDATE_TOTAL_PRICE', totalPrice);
  },
  updatePostLv({ commit }, postLv) {
    commit('UPDATE_POST_LV', postLv);
  },
  updateMeetingLv({ commit }, meetingLv) {
    commit('UPDATE_MEETING_LV', meetingLv);
  },
};
