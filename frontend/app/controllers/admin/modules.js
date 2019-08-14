import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  notifications : service('notification-messages'),
  actions       : {
    submit() {
      let modules = this.get('model');
      this.set('isLoading', true);
      modules.save()
        .then(() => {
          this.get('notifications').success('Settings have been saved successfully.', {
            autoClear     : true,
            clearDuration : 1500
          });
        })
        .catch(() => {
          this.get('notifications').error('An unexpected error has occurred. Settings not saved.', {
            autoClear     : true,
            clearDuration : 1500
          });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
