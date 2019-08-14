import { inject as service } from '@ember/service';
import $ from 'jquery';
import Controller from '@ember/controller';

export default Controller.extend({
  notifications : service('notification-messages'),
  actions       : {
    openModal(message) {
      $('.ui.admin-message.modal').modal('show');
      this.set('selectedMsg', message);
    },

    editMessage(element, component) {
      this.set('isModalLoading', true);
      this.get('selectedMsg')
        .save()
        .then(() => this.get('notifications').success('Updated', {
          autoClear     : true,
          clearDuration : 1500
        }))
        .catch(() => this.get('notifications').error('Unable to Update', {
          autoClear     : true,
          clearDuration : 1500
        }))
        .finally(() => {
          $('.ui.admin-message.modal').modal('hide');
          this.set('isModalLoading', false);
        });
    },

    denyModal(element, component) {
      return true;
    }
  }
});
