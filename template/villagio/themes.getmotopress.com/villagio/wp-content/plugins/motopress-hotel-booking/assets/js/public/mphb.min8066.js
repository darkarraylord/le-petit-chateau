!function(e){e(function(){MPHB.DateRules=can.Construct.extend({},{dates:{},init:function(e){this.dates=e},canCheckIn:function(e){var t=this.formatDate(e);return!this.dates.hasOwnProperty(t)||!this.dates[t].not_check_in&&!this.dates[t].not_stay_in},canCheckOut:function(e){var t=this.formatDate(e);return!this.dates.hasOwnProperty(t)||!this.dates[t].not_check_out},canStayIn:function(e){var t=this.formatDate(e);return!this.dates.hasOwnProperty(t)||!this.dates[t].not_stay_in},getNearestNotStayInDate:function(t,a){var i=MPHB.Utils.cloneDate(a),n=e.datepick.formatDate("yyyy-mm-dd",t),s=e.datepick.formatDate("yyyy-mm-dd",a);return e.each(this.dates,function(t,a){return!(t>s)&&(n>t||(a.not_stay_in?(i=e.datepick.parseDate("yyyy-mm-dd",t),!1):void 0))}),i},formatDate:function(t){return e.datepick.formatDate("yyyy-mm-dd",t)}}),MPHB.Datepicker=can.Control.extend({},{form:null,hiddenElement:null,init:function(e,t){this.form=t.form,this.setupHiddenElement(),this.initDatepick()},setupHiddenElement:function(){var t=this.element.attr("id")+"-hidden";if(this.hiddenElement=e("#"+t),this.hiddenElement.val()){var a=e.datepick.parseDate(MPHB._data.settings.dateTransferFormat,this.hiddenElement.val()),i=e.datepick.formatDate(MPHB._data.settings.dateFormat,a);this.element.val(i)}else;},initDatepick:function(){var t={dateFormat:MPHB._data.settings.dateFormat,altFormat:MPHB._data.settings.dateTransferFormat,altField:this.hiddenElement,minDate:MPHB.HotelDataManager.myThis.today,monthsToShow:MPHB._data.settings.numberOfMonthDatepicker,firstDay:MPHB._data.settings.firstDay,pickerClass:MPHB._data.settings.datepickerClass},a=e.extend(t,this.getDatepickSettings());this.element.datepick(a)},getDatepickSettings:function(){return{}},getDate:function(){var t=this.element.val(),a=null;try{a=e.datepick.parseDate(MPHB._data.settings.dateFormat,t)}catch(e){a=null}return a},getFormattedDate:function(t){"undefined"==typeof t&&(t=MPHB._data.settings.dateFormat);var a=this.getDate();return a?e.datepick.formatDate(t,a):""},setDate:function(e){this.element.datepick("setDate",e)},getOption:function(e){return this.element.datepick("option",e)},setOption:function(e,t){this.element.datepick("option",e,t)},getMinDate:function(){var e=this.getOption("minDate");return null!==e&&""!==e?MPHB.Utils.cloneDate(e):null},getMaxDate:function(){var e=this.getOption("maxDate");return null!==e&&""!==e?MPHB.Utils.cloneDate(e):null},clear:function(){this.element.datepick("clear")},formatDate:function(t,a){return a="undefined"!=typeof a?a:"yyyy-mm-dd",e.datepick.formatDate(a,t)},refresh:function(){e.datepick._update(this.element[0],!0),e.datepick._updateInput(this.element[0],!1)}}),MPHB.FlexsliderGallery=can.Control.extend({},{sliderEl:null,navSliderEl:null,groupId:null,init:function(t,a){this.sliderEl=t,this.groupId=t.data("group");var i=e('.mphb-gallery-thumbnail-slider[data-group="'+this.groupId+'"]');i.length&&(this.navSliderEl=i);var n=this;e(window).on("load",function(){n.initSliders()})},initSliders:function(){var e=this.sliderEl.data("flexslider-atts");if(this.navSliderEl){var t=this.navSliderEl.data("flexslider-atts");t.asNavFor='.mphb-flexslider-gallery-wrapper[data-group="'+this.groupId+'"]',t.itemWidth=this.navSliderEl.find("ul > li img").width(),e.sync='.mphb-gallery-thumbnail-slider[data-group="'+this.groupId+'"]',this.navSliderEl.addClass("flexslider mphb-flexslider mphb-gallery-thumbnails-slider").flexslider(t)}this.sliderEl.addClass("flexslider mphb-flexslider mphb-gallery-slider").flexslider(e)}}),MPHB.GlobalRules=can.Construct.extend({},{minDays:null,maxDays:null,checkInDays:null,checkOutDays:null,init:function(e){this.minDays=e.min_stay_length,this.maxDays=e.max_stay_length,this.checkInDays=e.check_in_days,this.checkOutDays=e.check_out_days},isCheckOutSatisfy:function(t){var a=t.getDay();return e.inArray(a,this.checkOutDays)!==-1},isCheckInSatisfy:function(t){var a=t.getDay();return e.inArray(a,this.checkInDays)!==-1},isCorrect:function(t,a){if("undefined"==typeof t||"undefined"==typeof a)return!0;if(!this.isCheckInSatisfy(t))return!1;if(!this.isCheckOutSatisfy(a))return!1;var i=e.datepick.add(MPHB.Utils.cloneDate(t),this.minDays),n=e.datepick.add(MPHB.Utils.cloneDate(t),this.maxDays);return a>=i&&a<=n},getMinCheckOutDate:function(t){return e.datepick.add(MPHB.Utils.cloneDate(t),this.minDays,"d")},getMaxCheckOutDate:function(t){return e.datepick.add(MPHB.Utils.cloneDate(t),this.maxDays,"d")}}),MPHB.HotelDataManager=can.Construct.extend({myThis:null,ROOM_STATUS_AVAILABLE:"available",ROOM_STATUS_NOT_AVAILABLE:"not-available",ROOM_STATUS_BOOKED:"booked",ROOM_STATUS_PAST:"past"},{today:null,roomTypesData:{},globalRules:null,dateRules:null,typeRules:{},init:function(t){MPHB.HotelDataManager.myThis=this,this.initRoomTypesData(t.room_types_data),this.initRules(t.rules),this.setToday(e.datepick.parseDate(MPHB._data.settings.dateTransferFormat,t.today))},initRoomTypesData:function(t){var a=this;e.each(t,function(e,t){a.roomTypesData[e]=new MPHB.RoomTypeData(e,t)})},initRules:function(t){this.globalRules=new MPHB.GlobalRules(t.global),this.dateRules=new MPHB.DateRules(t.dates);var a=this;e.each(t.dates_by_type,function(e,t){a.typeRules[e]=new MPHB.DateRules(t)})},setToday:function(e){this.today=e},getRoomTypeData:function(e){return!!this.roomTypesData.hasOwnProperty(e)&&this.roomTypesData[e]},fillDateCellData:function(e,t){var a=[],i=[],n=e.roomTypeId;return this.notStayIn(t,n)&&(a.push(MPHB._data.translations.notStayIn),i.push("mphb-not-stay-in-date")),this.notCheckIn(t,n)&&(a.push(MPHB._data.translations.notCheckIn),i.push("mphb-not-check-in-date")),this.notCheckOut(t,n)&&(a.push(MPHB._data.translations.notCheckOut),i.push("mphb-not-check-out-date")),a.length&&(e.title+=" "+MPHB._data.translations.rules+" "+a.join(", ")),i.length&&(e.dateClass+=(e.dateClass.length?" ":"")+i.join(" ")),e},notStayIn:function(e,t){var a=this.dateRules.canStayIn(e);return this.typeRules[t]&&(a=a&&this.typeRules[t].canStayIn(e)),!a},notCheckIn:function(e,t){var a=this.dateRules.canCheckIn(e);return a=a&&this.globalRules.isCheckInSatisfy(e),this.typeRules[t]&&(a=a&&this.typeRules[t].canCheckIn(e)),!a},notCheckOut:function(e,t){var a=this.dateRules.canCheckOut(e);return a=a&&this.globalRules.isCheckOutSatisfy(e),this.typeRules[t]&&(a=a&&this.typeRules[t].canCheckOut(e)),!a}}),MPHB.Utils=can.Construct.extend({formatDateToCompare:function(t){return e.datepick.formatDate("yyyymmdd",t)},cloneDate:function(e){return new Date(e.getTime())}},{}),MPHB.Gateway=can.Construct.extend({},{amount:0,paymentDescription:"",init:function(e){this.billingSection=e.billingSection,this.initSettings(e.settings)},initSettings:function(e){this.amount=e.amount,this.paymentDescription=e.paymentDescription},canSubmit:function(){return!0},updateData:function(e){this.amount=e.amount,this.paymentDescription=e.paymentDescription},afterSelection:function(e){},cancelSelection:function(){}}),MPHB.BeanstreamGateway=MPHB.Gateway.extend({},{scriptUrl:"",isCanSubmit:!1,loadHandler:null,validityHandler:null,tokenRequestHandler:null,tokenUpdatedHandler:null,initSettings:function(e){this._super(e),this.scriptUrl=e.scriptUrl||"https://payform.beanstream.com/v1.1.0/payfields/beanstream_payfields.js",this.validityHandler=this.validityChanged.bind(this),this.tokenRequestHandler=this.tokenRequested.bind(this),this.tokenUpdatedHandler=this.tokenUpdated.bind(this)},canSubmit:function(){return this.isCanSubmit},afterSelection:function(t){if(this._super(t),t.length>0){var a=document.createElement("script");a.id="payfields-script",a.src=this.scriptUrl,a.dataset.submitform="true",a.dataset.async="true",null!=this.loadHandler&&e(document).off("beanstream_payfields_loaded",this.loadHandler),this.loadHandler=function(a){e("[data-beanstream-id]").appendTo(t)},e(document).on("beanstream_payfields_loaded",this.loadHandler),t.append(a),t.removeClass("mphb-billing-fields-hidden")}e(document).on("beanstream_payfields_inputValidityChanged",this.validityHandler).on("beanstream_payfields_tokenRequested",this.tokenRequestHandler).on("beanstream_payfields_tokenUpdated",this.tokenUpdatedHandler)},cancelSelection:function(){e(document).off("beanstream_payfields_inputValidityChanged",this.validityHandler).off("beanstream_payfields_tokenRequested",this.tokenRequestHandler).off("beanstream_payfields_tokenUpdated",this.tokenUpdatedHandler)},validityChanged:function(e){var t=e.eventDetail||e.originalEvent.eventDetail;t.isValid||(this.isCanSubmit=!1)},tokenRequested:function(e){this.billingSection.showPreloader()},tokenUpdated:function(e){var t=e.eventDetail||e.originalEvent.eventDetail;t.success?this.isCanSubmit=!0:(this.isCanSubmit=!1,this.billingSection.showError(MPHB._data.translations.tokenizationFailure.replace("(%s)",t.message))),this.billingSection.hidePreloader()}}),MPHB.StripeGateway=MPHB.Gateway.extend({},{publicKey:"",imageUrl:"",locale:"",allowRememberMe:!1,needBillingAddress:!1,useBitcoin:!1,panelLabel:"",handler:null,init:function(e){this._super(e),this.initHandler()},initSettings:function(e){this._super(e),this.publicKey=e.publicKey,this.imageUrl=e.checkoutImageUrl,this.allowRememberMe=e.allowRememberMe,this.needBillingAddress=e.needBillingAddress,this.useBitcoin=e.useBitcoin,this.locale=e.locale},initHandler:function(){var e=this,t={key:this.publicKey,image:this.imageUrl,locale:this.locale,name:MPHB._data.settings.siteName,bitcoin:this.useBitcoin,currency:MPHB._data.settings.currency.toLowerCase(),billingAddress:this.needBillingAddress,allowRememberMe:this.allowRememberMe};e.panelLabel&&(t.panelLabel=e.panelLabel),this.handler=StripeCheckout.configure(t),window.addEventListener("popstate",function(){e.handler.close()})},openModal:function(){var e=this;this.handler.open({amount:e.amount,description:e.paymentDescription,token:function(t,a){e.storeToken(t),e.needBillingAddress&&e.storeBillingData(a),e.storeEmail(t.email),e.billingSection.parentForm.element.submit(),e.billingSection.showPreloader()}})},canSubmit:function(){if(this.isTokenStored())return!0;try{this.openModal()}catch(e){console.log("error:",e)}return!1},storeToken:function(e){var t=this.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_token"]');t.val(e.id)},isTokenStored:function(){var e=this.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_token"]');return e.length&&""!==e.val()},storeEmail:function(e){this.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_email"]').val(e)},storeBillingData:function(t){var a=this,i=["billing_address_city","billing_address_country","billing_address_country_code","billing_address_line1","billing_address_line2","billing_address_state","billing_address_zip","billing_name"];e.each(i,function(e,i){if(t.hasOwnProperty(i)){var n=a.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_'+i+'"]');n.length&&n.val(t[i])}})}}),MPHB.BillingSection=can.Control.extend({},{updateBillingFieldsTimeout:null,parentForm:null,billingFieldsWrapperEl:null,gateways:{},lastGatewayId:null,init:function(e,t){this.parentForm=t.form,this.billingFieldsWrapperEl=this.element.find(".mphb-billing-fields"),this.initGateways(t.gateways)},initGateways:function(t){var a=this;e.each(t,function(e,t){var i=null;switch(e){case"stripe":i=new MPHB.StripeGateway({billingSection:a,settings:MPHB._data.gateways[e]});break;case"braintree":i=new MPHB.BraintreeGateway({billingSection:a,settings:MPHB._data.gateways[e]});break;case"beanstream":i=new MPHB.BeanstreamGateway({billingSection:a,settings:MPHB._data.gateways[e]});break;default:i=new MPHB.Gateway({billingSection:a,settings:MPHB._data.gateways[e]})}"undefined"!=typeof i&&(a.gateways[e]=i)}),this.notifySelectedGateway()},'[name="mphb_gateway_id"] change':function(t,a){var i=this,n=t.val();this.showPreloader(),this.billingFieldsWrapperEl.empty().addClass("mphb-billing-fields-hidden"),clearTimeout(this.updateBillingFieldsTimeout),this.updateBillingFieldsTimeout=setTimeout(function(){var t=i.parentForm.parseFormToJSON();e.ajax({url:MPHB._data.ajaxUrl,type:"GET",dataType:"json",data:{action:"mphb_get_billing_fields",mphb_nonce:MPHB._data.nonces.mphb_get_billing_fields,mphb_gateway_id:n,formValues:t},success:function(e){e.hasOwnProperty("success")?e.success?(i.lastGatewayId&&i.gateways[i.lastGatewayId].cancelSelection(),i.billingFieldsWrapperEl.html(e.data.fields),e.data.hasVisibleFields?i.billingFieldsWrapperEl.removeClass("mphb-billing-fields-hidden"):i.billingFieldsWrapperEl.addClass("mphb-billing-fields-hidden"),i.notifySelectedGateway(n)):i.showError(e.data.message):i.showError(MPHB._data.translations.errorHasOccured)},error:function(e){i.showError(MPHB._data.translations.errorHasOccured)},complete:function(e){i.hidePreloader()}})},500)},hideErrors:function(){this.parentForm.hideErrors()},showError:function(e){this.parentForm.showError(e)},showPreloader:function(){this.parentForm.showPreloader()},hidePreloader:function(){this.parentForm.hidePreloader()},canSubmit:function(){var e=this.getSelectedGateway();return!this.gateways.hasOwnProperty(e)||this.gateways[e].canSubmit()},getSelectedGateway:function(){var e=this.element.find('[name="mphb_gateway_id"]'),t=1===e.length?e:e.filter(":checked");return t.val()},notifySelectedGateway:function(e){e=e||this.getSelectedGateway(),e&&this.gateways[e].afterSelection(this.billingFieldsWrapperEl),this.lastGatewayId=e},updateGatewaysData:function(t){var a=this;e.each(t,function(e,t){a.gateways.hasOwnProperty(e)&&a.gateways[e].updateData(t)})}}),MPHB.BraintreeGateway=MPHB.Gateway.extend({},{clientToken:"",checkout:null,initSettings:function(e){this._super(e),this.clientToken=e.clientToken},canSubmit:function(){return this.isNonceStored()},storeNonce:function(e){var t=this.billingSection.billingFieldsWrapperEl.find('[name="mphb_braintree_payment_nonce"]');t.val(e)},isNonceStored:function(){var e=this.billingSection.billingFieldsWrapperEl.find('[name="mphb_braintree_payment_nonce"]');return e.length&&""!=e.val()},afterSelection:function(e){if(this._super(e),void 0!=braintree){var t="mphb-braintree-container-"+this.clientToken.substr(0,8);e.append('<div id="'+t+'"></div>');var a=this;braintree.setup(this.clientToken,"dropin",{container:t,onReady:function(e){a.checkout=e},onPaymentMethodReceived:function(e){a.storeNonce(e.nonce),a.billingSection.parentForm.element.submit(),a.billingSection.showPreloader()}}),e.removeClass("mphb-billing-fields-hidden")}},cancelSelection:function(){if(this._super(),null!=this.checkout){var e=this;this.checkout.teardown(function(){e.checkout=null})}}}),MPHB.CouponSection=can.Control.extend({},{applyCouponTimeout:null,parentForm:null,appliedCouponEl:null,couponEl:null,messageHolderEl:null,init:function(e,t){this.parentForm=t.form,this.couponEl=e.find('[name="mphb_coupon_code"]'),this.appliedCouponEl=e.find('[name="mphb_applied_coupon_code"]'),this.messageHolderEl=e.find(".mphb-coupon-message")},".mphb-apply-coupon-code-button click":function(t,a){a.preventDefault(),a.stopPropagation(),this.clearMessage();var i=this.couponEl.val();if(!i.length)return void this.showMessage(MPHB._data.translations.emptyCouponCode);this.appliedCouponEl.val("");var n=this;this.showPreloader(),clearTimeout(this.applyCouponTimeout),this.applyCouponTimeout=setTimeout(function(){var t=n.parentForm.parseFormToJSON();e.ajax({url:MPHB._data.ajaxUrl,type:"POST",dataType:"json",data:{action:"mphb_apply_coupon",mphb_nonce:MPHB._data.nonces.mphb_apply_coupon,mphb_coupon_code:i,formValues:t},success:function(e){e.hasOwnProperty("success")?e.success?(n.parentForm.setCheckoutData(e.data),n.couponEl.val(""),n.appliedCouponEl.val(e.data.coupon.applied_code),n.showMessage(e.data.coupon.message)):n.showMessage(e.data.message):n.showMessage(MPHB._data.translations.errorHasOccured)},error:function(e){n.showMessage(MPHB._data.translations.errorHasOccured)},complete:function(e){n.hidePreloader()}})},500)},removeCoupon:function(){this.appliedCouponEl.val(""),this.clearMessage()},showPreloader:function(){this.parentForm.showPreloader()},hidePreloader:function(){this.parentForm.hidePreloader()},clearMessage:function(){this.messageHolderEl.html("").addClass("mphb-hide")},showMessage:function(e){this.messageHolderEl.html(e).removeClass("mphb-hide")}}),MPHB.CheckoutForm=can.Control.extend({myThis:null},{priceBreakdownTableEl:null,bookBtnEl:null,errorsWrapperEl:null,preloaderEl:null,billingSection:null,couponSection:null,waitResponse:!1,updateInfoTimeout:null,freeBooking:!1,init:function(e,t){MPHB.CheckoutForm.myThis=this,this.bookBtnEl=this.element.find("input[type=submit]"),this.errorsWrapperEl=this.element.find(".mphb-errors-wrapper"),this.preloaderEl=this.element.find(".mphb-preloader"),this.priceBreakdownTableEl=this.element.find("table.mphb-price-breakdown"),MPHB._data.settings.useBilling&&(this.billingSection=new MPHB.BillingSection(this.element.find("#mphb-billing-details"),{form:this,gateways:MPHB._data.gateways})),MPHB._data.settings.useCoupons&&(this.couponSection=new MPHB.CouponSection(this.element.find("#mphb-coupon-details"),{form:this}))},setTotal:function(e){var t=this.element.find(".mphb-total-price-field");t.length&&t.html(e)},setDeposit:function(e){var t=this.element.find(".mphb-deposit-amount-field");t.length&&t.html(e)},setupPriceBreakdown:function(e){this.priceBreakdownTableEl.replaceWith(e),this.priceBreakdownTableEl=this.element.find("table.mphb-price-breakdown")},updateCheckoutInfo:function(){var t=this;t.hideErrors(),t.showPreloader(),clearTimeout(this.updateInfoTimeout),this.updateInfoTimeout=setTimeout(function(){var a=t.parseFormToJSON();e.ajax({url:MPHB._data.ajaxUrl,type:"GET",dataType:"json",data:{action:"mphb_update_checkout_info",mphb_nonce:MPHB._data.nonces.mphb_update_checkout_info,formValues:a},success:function(e){e.hasOwnProperty("success")?e.success?t.setCheckoutData(e.data):t.showError(e.data.message):t.showError(MPHB._data.translations.errorHasOccured)},error:function(e){t.showError(MPHB._data.translations.errorHasOccured)},complete:function(e){t.hidePreloader()}})},500)},setCheckoutData:function(e){this.setTotal(e.total),this.setupPriceBreakdown(e.priceBreakdown),MPHB._data.settings.useBilling&&(this.setDeposit(e.deposit),this.billingSection.updateGatewaysData(e.gateways),e.isFree?this.setFreeMode():this.unsetFreeMode())},setFreeMode:function(){this.freeBooking=!0,this.billingSection.element.addClass("mphb-hide"),this.element.append(e("<input />",{type:"hidden",name:"mphb_gateway_id",value:"manual",id:"mphb-manual-payment-input"}))},unsetFreeMode:function(){this.freeBooking=!1,this.billingSection.element.removeClass("mphb-hide"),this.element.find("#mphb-manual-payment-input").remove()},".mphb_sc_checkout-guests-chooser change":function(e,t){this.updateCheckoutInfo()},".mphb_sc_checkout-rate change":function(e,t){this.updateCheckoutInfo()},".mphb_sc_checkout-service, .mphb_sc_checkout-service-adults change":function(e,t){this.updateCheckoutInfo()},".mphb-price-breakdown-expand click":function(t,a){a.preventDefault(),e(t).blur();var i=e(t).parents("tr.mphb-price-breakdown-group");i.find(".mphb-price-breakdown-rate").toggleClass("mphb-hide"),i.nextUntil("tr.mphb-price-breakdown-group").toggleClass("mphb-hide")},hideErrors:function(){this.errorsWrapperEl.empty().addClass("mphb-hide")},showError:function(e){this.errorsWrapperEl.html(e).removeClass("mphb-hide")},showPreloader:function(){this.waitResponse=!0,this.bookBtnEl.attr("disabled","disabled"),this.preloaderEl.removeClass("mphb-hide")},hidePreloader:function(){this.waitResponse=!1,this.bookBtnEl.removeAttr("disabled"),this.preloaderEl.addClass("mphb-hide")},parseFormToJSON:function(){return this.element.serializeJSON()},submit:function(e,t){return!this.waitResponse&&(!(MPHB._data.settings.useBilling&&!this.freeBooking&&!this.billingSection.canSubmit())&&void 0)},"#mphb-price-details .mphb-remove-coupon click":function(e,t){t.preventDefault(),t.stopPropagation(),MPHB._data.settings.useCoupons&&(this.couponSection.removeCoupon(),this.updateCheckoutInfo())}}),MPHB.ReservationForm=can.Control.extend({MODE_SUBMIT:"submit",MODE_NORMAL:"normal",MODE_WAITING:"waiting"},{formEl:null,checkInDatepicker:null,checkOutDatepicker:null,reserveBtn:null,reserveBtnPreloader:null,errorsWrapper:null,mode:null,roomTypeId:null,roomTypeData:null,setup:function(e,t){this._super(e,t),this.mode=MPHB.ReservationForm.MODE_NORMAL},init:function(t,a){this.formEl=t,this.roomTypeId=parseInt(this.formEl.attr("id").replace(/^booking-form-/,"")),this.roomTypeData=MPHB.HotelDataManager.myThis.getRoomTypeData(this.roomTypeId),this.errorsWrapper=this.formEl.find(".mphb-errors-wrapper"),this.initCheckInDatepicker(),this.initCheckOutDatepicker(),this.initReserveBtn();var i=this;e(window).on("mphb-update-date-room-type-"+this.roomTypeId,function(){i.reservationForm.refreshDatepickers()})},proceedToCheckout:function(){this.mode=MPHB.ReservationForm.MODE_SUBMIT,this.unlock(),this.formEl.submit()},showError:function(t){this.clearErrors();var a=e("<p>",{class:"mphb-error",html:t});this.errorsWrapper.append(a).removeClass("mphb-hide")},clearErrors:function(){this.errorsWrapper.empty().addClass("mphb-hide")},lock:function(){this.element.find("[name]").attr("disabled","disabled"),this.reserveBtn.attr("disabled","disabled").addClass("mphb-disabled"),this.reserveBtnPreloader.removeClass("mphb-hide")},unlock:function(){this.element.find("[name]").removeAttr("disabled"),this.reserveBtn.removeAttr("disabled","disabled").removeClass("mphb-disabled"),this.reserveBtnPreloader.addClass("mphb-hide")},setFormWaitingMode:function(){this.mode=MPHB.ReservationForm.MODE_WAITING,this.lock()},setFormNormalMode:function(){this.mode=MPHB.ReservationForm.MODE_NORMAL,this.unlock()},initCheckInDatepicker:function(){var e=this.formEl.find('input[type="text"][id^=mphb_check_in_date]');this.checkInDatepicker=new MPHB.RoomTypeCheckInDatepicker(e,{form:this})},initCheckOutDatepicker:function(){var e=this.formEl.find('input[type="text"][id^=mphb_check_out_date]');this.checkOutDatepicker=new MPHB.RoomTypeCheckOutDatepicker(e,{form:this})},initReserveBtn:function(){this.reserveBtn=this.formEl.find(".mphb-reserve-btn"),this.reserveBtnPreloader=this.formEl.find(".mphb-preloader"),this.setFormNormalMode()},updateCheckOutLimitations:function(e){"undefined"==typeof e&&(e=!0);var t=this.retrieveCheckOutLimitations(this.checkInDatepicker.getDate(),this.checkOutDatepicker.getDate());this.checkOutDatepicker.setOption("minDate",t.minDate),this.checkOutDatepicker.setOption("maxDate",t.maxDate),this.checkOutDatepicker.setDate(e?t.date:null)},retrieveCheckOutLimitations:function(e,t){var a=MPHB.HotelDataManager.myThis.today,i=null,n=null;if(null!==e){var a=MPHB.HotelDataManager.myThis.globalRules.getMinCheckOutDate(e),i=MPHB.HotelDataManager.myThis.globalRules.getMaxCheckOutDate(e);i=this.roomTypeData.getNearestLockedDate(e,i),i=this.roomTypeData.getNearestHaveNotPriceDate(e,i),i=MPHB.HotelDataManager.myThis.dateRules.getNearestNotStayInDate(e,i),n=this.isCheckOutDateNotValid(t,a,i)?this.retrieveRecommendedCheckOutDate(a,i):t}return{minDate:a,maxDate:i,date:n}},retrieveRecommendedCheckOutDate:function(t,a){for(var i=null,n=MPHB.Utils.cloneDate(t);MPHB.Utils.formatDateToCompare(n)<=MPHB.Utils.formatDateToCompare(a);){var s=e.datepick.add(MPHB.Utils.cloneDate(n),-1,"d");if(!this.isCheckOutDateNotValid(n,t,a)&&this.roomTypeData.hasPriceForDate(s)){i=n;break}n=e.datepick.add(n,1,"d")}return i},isCheckOutDateNotValid:function(e,t,a){return null===e||MPHB.Utils.formatDateToCompare(e)<MPHB.Utils.formatDateToCompare(t)||MPHB.Utils.formatDateToCompare(e)>MPHB.Utils.formatDateToCompare(a)||!MPHB.HotelDataManager.myThis.globalRules.isCheckOutSatisfy(e)||!MPHB.HotelDataManager.myThis.dateRules.canCheckOut(e)},clearDatepickers:function(){this.checkInDatepicker.clear(),this.checkOutDatepicker.clear()},refreshDatepickers:function(){this.checkInDatepicker.refresh(),this.checkOutDatepicker.refresh()}}),MPHB.RoomTypeCalendar=can.Control.extend({},{roomTypeData:null,roomTypeId:null,init:function(t,a){this.roomTypeId=parseInt(t.attr("id").replace(/^mphb-calendar-/,"")),this.roomTypeData=MPHB.HotelDataManager.myThis.getRoomTypeData(this.roomTypeId);var i=this;t.hide().datepick({onDate:function(e,t){var a={selectable:!1,dateClass:"mphb-date-cell",title:"",roomTypeId:i.roomTypeId};return t?a=i.roomTypeData.fillDateData(a,e):a.dateClass+=" mphb-extra-date",a},minDate:MPHB.HotelDataManager.myThis.today,monthsToShow:MPHB._data.settings.numberOfMonthCalendar,firstDay:MPHB._data.settings.firstDay,pickerClass:MPHB._data.settings.datepickerClass}).show(),e(window).on("mphb-update-room-type-data-"+this.roomTypeId,function(e){i.refresh()})},refresh:function(){this.element.hide(),e.datepick._update(this.element[0],!0),this.element.show()}}),MPHB.RoomTypeCheckInDatepicker=MPHB.Datepicker.extend({},{getDatepickSettings:function(){var e=this;return{onDate:function(t,a){var i={dateClass:"mphb-date-cell",selectable:!1,title:""};if(a){var n=e.form.roomTypeData.getDateStatus(t);i=e.form.roomTypeData.fillDateData(i,t);var s=n===MPHB.HotelDataManager.ROOM_STATUS_AVAILABLE&&MPHB.HotelDataManager.myThis.globalRules.isCheckInSatisfy(t)&&MPHB.HotelDataManager.myThis.dateRules.canCheckIn(t);s&&(i.selectable=!0)}else i.dateClass+=" mphb-extra-date";return i.selectable&&(i.dateClass+=" mphb-date-selectable"),i},onSelect:function(t){e.form.updateCheckOutLimitations()},pickerClass:"mphb-datepick-popup mphb-check-in-datepick "+MPHB._data.settings.datepickerClass}},setDate:function(e){return null==e?this._super(e):MPHB.HotelDataManager.myThis.globalRules.isCheckInSatisfy(e)&&MPHB.HotelDataManager.myThis.dateRules.canCheckIn(e)?this._super(e):this._super(null)}}),MPHB.RoomTypeCheckOutDatepicker=MPHB.Datepicker.extend({},{getDatepickSettings:function(){var e=this;return{onDate:function(t,a){var i={dateClass:"mphb-date-cell",selectable:!1,title:""};if(a){var n=e.form.checkInDatepicker.getDate(),s=null!==e.getMinDate()&&MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(e.getMinDate()),o=null!==e.getMaxDate()&&MPHB.Utils.formatDateToCompare(t)>MPHB.Utils.formatDateToCompare(e.getMaxDate());if(null!==n&&MPHB.Utils.formatDateToCompare(t)===MPHB.Utils.formatDateToCompare(n)&&(i.dateClass+=" mphb-check-in-date",i.title+=MPHB._data.translations.checkInDate),s){var r=!!n&&MPHB.HotelDataManager.myThis.globalRules.getMinCheckOutDate(n);MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(n)?i.dateClass+=" mphb-earlier-min-date mphb-earlier-check-in-date":r&&MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(r)&&(i.dateClass+=" mphb-earlier-min-date",i.title+=(i.title.length?" ":"")+MPHB._data.translations.lessThanMinDaysStay)}if(o){var l=!!n&&MPHB.HotelDataManager.myThis.globalRules.getMaxCheckOutDate(n);!l||MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(l)?i.title+=(i.title.length?" ":"")+MPHB._data.translations.laterThanMaxDate:i.title+=(i.title.length?" ":"")+MPHB._data.translations.moreThanMaxDaysStay,i.dateClass+=" mphb-later-max-date"}i=e.form.roomTypeData.fillDateData(i,t);var c=!s&&!o&&MPHB.HotelDataManager.myThis.globalRules.isCheckOutSatisfy(t)&&MPHB.HotelDataManager.myThis.dateRules.canCheckOut(t);c&&(i.selectable=!0)}else i.dateClass+=" mphb-extra-date";return i.selectable?i.dateClass+=" mphb-selectable-date":i.dateClass+=" mphb-unselectable-date",i},pickerClass:"mphb-datepick-popup mphb-check-out-datepick "+MPHB._data.settings.datepickerClass}},setDate:function(e){return null==e?this._super(e):MPHB.HotelDataManager.myThis.globalRules.isCheckOutSatisfy(e)&&MPHB.HotelDataManager.myThis.dateRules.canCheckOut(e)?this._super(e):this._super(null)}}),MPHB.RoomTypeData=can.Construct.extend({},{id:null,bookedDates:{},havePriceDates:{},activeRoomsCount:0,init:function(e,t){this.id=e,this.setRoomsCount(t.activeRoomsCount),this.setDates(t.dates)},update:function(t){t.hasOwnProperty("activeRoomsCount")&&this.setRoomsCount(t.activeRoomsCount),t.hasOwnProperty("dates")&&this.setDates(t.dates),e(window).trigger("mphb-update-room-type-data-"+this.id)},setRoomsCount:function(e){this.activeRoomsCount=e},setDates:function(e){this.bookedDates=e.hasOwnProperty("booked")?e.booked:{},this.havePriceDates=e.hasOwnProperty("havePrice")?e.havePrice:{}},getNearestLockedDate:function(t,a){var i=a,n=this,s=e.datepick.formatDate("yyyy-mm-dd",t),o=e.datepick.formatDate("yyyy-mm-dd",a);return e.each(n.getLockedDates(),function(t,a){return!(o<t)&&(s>t||(a>=n.activeRoomsCount?(i=e.datepick.parseDate("yyyy-mm-dd",t),!1):void 0))}),i},getNearestHaveNotPriceDate:function(t,a){for(var i=MPHB.Utils.cloneDate(a),n=MPHB.Utils.cloneDate(t);MPHB.Utils.formatDateToCompare(n)<=MPHB.Utils.formatDateToCompare(a);){if(!this.hasPriceForDate(n)){i=n;break}n=e.datepick.add(n,1,"d")}return i},getLockedDates:function(){var t={};return e.extend(t,this.bookedDates)},getHavePriceDates:function(){var t={};return e.extend(t,this.havePriceDates)},getDateStatus:function(e){var t=MPHB.HotelDataManager.ROOM_STATUS_AVAILABLE;return this.isEarlierThanToday(e)?t=MPHB.HotelDataManager.ROOM_STATUS_PAST:this.isDateBooked(e)?t=MPHB.HotelDataManager.ROOM_STATUS_BOOKED:this.hasPriceForDate(e)||(t=MPHB.HotelDataManager.ROOM_STATUS_NOT_AVAILABLE),t},isDateBooked:function(t){var a=e.datepick.formatDate("yyyy-mm-dd",t);return this.bookedDates.hasOwnProperty(a)&&this.bookedDates[a]>=this.activeRoomsCount},hasPriceForDate:function(t){var a=e.datepick.formatDate("yyyy-mm-dd",t);return e.inArray(a,this.havePriceDates)!==-1},getAvailableRoomsCount:function(t){var a=e.datepick.formatDate("yyyy-mm-dd",t),i=this.bookedDates.hasOwnProperty(a)?this.activeRoomsCount-this.bookedDates[a]:this.activeRoomsCount;return i<0&&(i=0),i},fillDateData:function(e,t){var a=this.getDateStatus(t),i=[],n=[];switch(a){case MPHB.HotelDataManager.ROOM_STATUS_PAST:n.push("mphb-past-date"),i.push(MPHB._data.translations.past);break;case MPHB.HotelDataManager.ROOM_STATUS_AVAILABLE:n.push("mphb-available-date"),i.push(MPHB._data.translations.available+"("+this.getAvailableRoomsCount(t)+")");break;case MPHB.HotelDataManager.ROOM_STATUS_NOT_AVAILABLE:n.push("mphb-not-available-date"),i.push(MPHB._data.translations.notAvailable);break;case MPHB.HotelDataManager.ROOM_STATUS_BOOKED:n.push("mphb-booked-date"),i.push(MPHB._data.translations.booked)}return e.dateClass+=(e.dateClass.length?" ":"")+n.join(" "),e.title+=(e.title.length?", ":"")+i.join(", "),e=MPHB.HotelDataManager.myThis.fillDateCellData(e,t)},appendRulesToTitle:function(e,t){var a=[];return MPHB.HotelDataManager.myThis.dateRules.canStayIn(e)||a.push(MPHB._data.translations.notStayIn),MPHB.HotelDataManager.myThis.dateRules.canCheckIn(e)||a.push(MPHB._data.translations.notCheckIn),MPHB.HotelDataManager.myThis.dateRules.canCheckOut(e)||a.push(MPHB._data.translations.notCheckOut),a.length&&(t+=" "+MPHB._data.translations.rules+" "+a.join(", ")),t},isEarlierThanToday:function(e){return MPHB.Utils.formatDateToCompare(e)<MPHB.Utils.formatDateToCompare(MPHB.HotelDataManager.myThis.today)}}),MPHB.SearchCheckInDatepicker=MPHB.Datepicker.extend({},{getDatepickSettings:function(){var e=this;return{onSelect:function(t){e.form.updateCheckOutLimitations()},onDate:function(e,t){var a={dateClass:"mphb-date-cell",selectable:!1,title:""};if(t){var i=MPHB.HotelDataManager.myThis.globalRules.isCheckInSatisfy(e)&&MPHB.HotelDataManager.myThis.dateRules.canCheckIn(e);i&&(a.selectable=!0),a=MPHB.HotelDataManager.myThis.fillDateCellData(a,e)}else a.dateClass+=" mphb-extra-date";return a.selectable?a.dateClass+=" mphb-selectable-date":a.dateClass+=" mphb-unselectable-date",a},pickerClass:"mphb-datepick-popup mphb-check-in-datepick "+MPHB._data.settings.datepickerClass}}}),MPHB.SearchCheckOutDatepicker=MPHB.Datepicker.extend({},{getDatepickSettings:function(){var e=this;return{onDate:function(t,a){var i={dateClass:"mphb-date-cell",selectable:!1,title:""};if(a){var n=e.form.checkInDatepicker.getDate(),s=null!==e.getMinDate()&&MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(e.getMinDate()),o=null!==e.getMaxDate()&&MPHB.Utils.formatDateToCompare(t)>MPHB.Utils.formatDateToCompare(e.getMaxDate());
if(null!==n&&MPHB.Utils.formatDateToCompare(t)===MPHB.Utils.formatDateToCompare(n)&&(i.dateClass+=" mphb-check-in-date",i.title+=MPHB._data.translations.checkInDate),s&&(MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(n)?i.dateClass+=" mphb-earlier-min-date mphb-earlier-check-in-date":(i.dateClass+=" mphb-earlier-min-date",i.title+=(i.title.length?" ":"")+MPHB._data.translations.lessThanMinDaysStay)),o){var r=!!n&&MPHB.HotelDataManager.myThis.globalRules.getMaxCheckOutDate(n);!r||MPHB.Utils.formatDateToCompare(t)<MPHB.Utils.formatDateToCompare(r)?i.title+=(i.title.length?" ":"")+MPHB._data.translations.laterThanMaxDate:i.title+=(i.title.length?" ":"")+MPHB._data.translations.moreThanMaxDaysStay,i.dateClass+=" mphb-later-max-date"}i=MPHB.HotelDataManager.myThis.fillDateCellData(i,t);var l=!s&&!o&&MPHB.HotelDataManager.myThis.globalRules.isCheckOutSatisfy(t)&&MPHB.HotelDataManager.myThis.dateRules.canCheckOut(t);l&&(i.selectable=!0)}else i.dateClass+=" mphb-extra-date";return i.selectable?i.dateClass+=" mphb-selectable-date":i.dateClass+=" mphb-unselectable-date",i},pickerClass:"mphb-datepick-popup mphb-check-out-datepick "+MPHB._data.settings.datepickerClass}}}),MPHB.SearchForm=can.Control.extend({},{checkInDatepickerEl:null,checkOutDatepickerEl:null,checkInDatepicker:null,checkOutDatepicker:null,init:function(e,t){this.checkInDatepickerEl=this.element.find(".mphb-datepick[name=mphb_check_in_date]"),this.checkOutDatepickerEl=this.element.find(".mphb-datepick[name=mphb_check_out_date]"),this.checkInDatepicker=new MPHB.SearchCheckInDatepicker(this.checkInDatepickerEl,{form:this}),this.checkOutDatepicker=new MPHB.SearchCheckOutDatepicker(this.checkOutDatepickerEl,{form:this})},updateCheckOutLimitations:function(e){"undefined"==typeof e&&(e=!0);var t=this.retrieveCheckOutLimitations(this.checkInDatepicker.getDate(),this.checkOutDatepicker.getDate());this.checkOutDatepicker.setOption("minDate",t.minDate),this.checkOutDatepicker.setOption("maxDate",t.maxDate),this.checkOutDatepicker.setDate(e?t.date:null)},retrieveCheckOutLimitations:function(e,t){var a=MPHB.HotelDataManager.myThis.today,i=null,n=null;if(null!==e){var a=MPHB.HotelDataManager.myThis.globalRules.getMinCheckOutDate(e),i=MPHB.HotelDataManager.myThis.globalRules.getMaxCheckOutDate(e);i=MPHB.HotelDataManager.myThis.dateRules.getNearestNotStayInDate(e,i),n=this.isCheckOutDateNotValid(t,a,i)?this.retrieveRecommendedCheckOutDate(a,i):t}return{minDate:a,maxDate:i,date:n}},retrieveRecommendedCheckOutDate:function(t,a){for(var i=null,n=MPHB.Utils.cloneDate(t);MPHB.Utils.formatDateToCompare(n)<=MPHB.Utils.formatDateToCompare(a);){if(!this.isCheckOutDateNotValid(n,t,a)){i=n;break}n=e.datepick.add(n,1,"d")}return i},isCheckOutDateNotValid:function(e,t,a){return null===e||MPHB.Utils.formatDateToCompare(e)<MPHB.Utils.formatDateToCompare(t)||MPHB.Utils.formatDateToCompare(e)>MPHB.Utils.formatDateToCompare(a)||!MPHB.HotelDataManager.myThis.globalRules.isCheckOutSatisfy(e)||!MPHB.HotelDataManager.myThis.dateRules.canCheckOut(e)}}),MPHB.RoomBookSection=can.Control.extend({},{roomTypeId:null,roomTitle:"",roomPrice:0,quantitySelect:null,bookButton:null,confirmButton:null,removeButton:null,messageHolder:null,messageWrapper:null,form:null,init:function(e,t){this.reservationCart=t.reservationCart,this.roomTypeId=parseInt(e.attr("data-room-type-id")),this.roomTitle=e.attr("data-room-type-title"),this.roomPrice=parseFloat(e.attr("data-room-price")),this.confirmButton=e.find(".mphb-confirm-reservation"),this.quantitySelect=e.find(".mphb-rooms-quantity"),this.messageWrapper=e.find(".mphb-rooms-reservation-message-wrapper"),this.messageHolder=e.find(".mphb-rooms-reservation-message")},getRoomTypeId:function(){return this.roomTypeId},getPrice:function(){return this.roomPrice},".mphb-book-button click":function(e,t){t.preventDefault(),t.stopPropagation();var a=parseInt(this.quantitySelect.val());this.reservationCart.addToCart(this.roomTypeId,a);var i=1==a?MPHB._data.translations.roomsAddedToReservation_singular:MPHB._data.translations.roomsAddedToReservation_plural,n=i.replace("%1$d",a).replace("%2$s",this.roomTitle);this.messageHolder.html(n),this.element.addClass("mphb-rooms-added")},".mphb-remove-from-reservation click":function(e,t){t.preventDefault(),t.stopPropagation(),this.reservationCart.removeFromCart(this.roomTypeId),this.messageHolder.empty(),this.element.removeClass("mphb-rooms-added")},".mphb-confirm-reservation click":function(e,t){t.preventDefault(),t.stopPropagation(),this.reservationCart.confirmReservation()}}),MPHB.ReservationCart=can.Control.extend({},{cartForm:null,cartDetails:null,roomBookSections:{},cartContents:{},init:function(e,t){this.cartForm=e.find("#mphb-reservation-cart"),this.cartDetails=e.find(".mphb-reservation-details"),this.initRoomBookSections(e.find(".mphb-reserve-room-section"))},initRoomBookSections:function(t){var a,i=this;e.each(t,function(t,n){a=new MPHB.RoomBookSection(e(n),{reservationCart:i}),i.roomBookSections[a.getRoomTypeId()]=a})},addToCart:function(e,t){this.cartContents[e]=t,this.updateCartView(),this.updateCartInputs()},removeFromCart:function(e){delete this.cartContents[e],this.updateCartView(),this.updateCartInputs()},calcRoomsInCart:function(){var t=0;return e.each(this.cartContents,function(e,a){t+=a}),t},calcTotalPrice:function(){var t=0,a=0,i=this;return e.each(this.cartContents,function(e,n){a=i.roomBookSections[e].getPrice(),t+=a*n}),t},updateCartView:function(){if(e.isEmptyObject(this.cartContents))this.cartForm.addClass("mphb-empty-cart");else{var t=this.calcRoomsInCart(),a=1==t?MPHB._data.translations.countRoomsSelected_singular:MPHB._data.translations.countRoomsSelected_plural,i=a.replace("%s",t);this.cartDetails.find(".mphb-cart-message").html(i);var n=this.calcTotalPrice(),s=MPHB._data.translations.priceFormat.replace("%s",n);this.cartDetails.find(".mphb-cart-total-price>.mphb-cart-total-price-value").html(s),this.cartForm.removeClass("mphb-empty-cart")}},updateCartInputs:function(){this.cartForm.find('[name^="mphb_rooms_details"]').remove();var t=this;e.each(this.cartContents,function(a,i){var n=e("<input />",{name:"mphb_rooms_details["+a+"]",type:"hidden",value:i});t.cartForm.prepend(n)})},confirmReservation:function(){this.cartForm.submit()}}),new MPHB.HotelDataManager(MPHB._data),MPHB._data.page.isCheckoutPage&&new MPHB.CheckoutForm(e(".mphb_sc_checkout-form")),MPHB._data.page.isSearchResultsPage&&new MPHB.ReservationCart(e(".mphb_sc_search_results-wrapper"));var t=e(".mphb-calendar.mphb-datepick");e.each(t,function(t,a){new MPHB.RoomTypeCalendar(e(a))});var a=e(".mphb-booking-form");e.each(a,function(t,a){new MPHB.ReservationForm(e(a))});var i=e("form.mphb_sc_search-form,form.mphb_widget_search-form");e.each(i,function(t,a){new MPHB.SearchForm(e(a))});var n=e(".mphb-flexslider-gallery-wrapper");e.each(n,function(e,t){new MPHB.FlexsliderGallery(t)})})}(jQuery);