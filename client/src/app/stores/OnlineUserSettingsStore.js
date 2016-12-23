import flux from 'flux-react';
import Actions from '../actions/OnlineUserSettingsActions';
import { cloneDeep } from 'lodash';
import Gender from '../common/Gender';
import Level from '../common/Level';

export default flux.createStore({
  settings: {
    id: undefined,
    userName: '',
    gender: Gender.MALE,
    countryCode: '',
    topics: [],
    level: Level.BEGINNER
  },
  actions: [
    Actions.setSettings,
    Actions.setUserId
  ],
  setSettings: function (settings) {
    this.settings = cloneDeep(settings);
    this.emit('settings.setAll');
  },
  setUserId: function (id) {
    this.settings['id'] = id;
    this.emit('settings.setUserId');
  },
  exports: {
    getSettings: function () {
      return this.settings;
    }
  }
});
