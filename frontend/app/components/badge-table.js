import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
  },

  notifications: service('notification-messages'),

  actions: {

    deleteBadge(badge) {
      badge.destroyRecord()
        .then(() => {
          this.get('notifications').clearAll();
          this.get('notifications').success('Badge Deleted successfully', {
            autoClear     : true,
            clearDuration : 1500
          });
        })
        .catch(() => {
          this.get('notifications').clearAll();
          this.get('notifications').error('Unable to delete Badge', {
            autoClear     : true,
            clearDuration : 1500
          });
        });
    },

    prevPage() {
      this.get('prevPage')();
    },

    nextPage() {
      this.get('nextPage')();
    }
  }
});
