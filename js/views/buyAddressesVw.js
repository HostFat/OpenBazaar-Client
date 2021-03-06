var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
    'change .js-buyWizardAddressRadio': 'selectAddress'
  },

  className: "flexRow",

  initialize: function() {
    "use strict";
    var shippableAddresses = [],
        nonshippableAddresses = [],
        shippingRegions = this.model.get('vendor_offer').listing.shipping_regions;
    //don't render on init, let parent trigger the render
  },

  render: function(selected){
    var self = this;
    var modelData = this.model.toJSON();
    if(selected){
      modelData.selected = selected;
      this.setAddress(selected);
    }
    loadTemplate('./js/templates/buyAddresses.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(modelData));
      //this does not add it to the DOM, that is done by the parent view
    });
    return this;
  },

  selectAddress: function(){
    "use strict";
    var index = this.$el.find('.js-buyWizardAddressRadio:checked').val();
    this.setAddress(index);
  },

  setAddress: function(index){
    "use strict";
    var selectedAddress = this.model.get('user').shipping_addresses[index];
    if(selectedAddress){
      this.trigger("setAddress", selectedAddress);
    }
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }

});