$(function($) {
  $(".bassKnob").knob({
    change : function (value) {
        console.log("change : " + parseFloat(value.toFixed(1)));
        bassValue = parseFloat(value.toFixed(1));
    },
    release : function (value) {
        //console.log(this.$.attr('value'));
        //console.log("release : " + value);
    },
    cancel : function () {
        console.log("cancel : ", this);
    },
  });
});

$(function($) {
  $(".gainKnob").knob({
    change : function (value) {
        console.log("change : " + parseFloat(value.toFixed(1)));
        gainValue = parseFloat(value.toFixed(1));
    },
    release : function (value) {
    },
    cancel : function () {
        console.log("cancel : ", this);
    },
  });
});

$(function($) {
  $(".detuneKnob").knob({
    change : function (value) {
        console.log("change : " + value);
        detuneValue = Math.round(value/100)*100;
    },
    release : function (value) {
        //console.log(this.$.attr('value'));
        //console.log("release : " + value);
    },
    cancel : function () {
        console.log("cancel : ", this);
    },
  });
});

$(function($) {
  $(".reverbKnob").knob({
    change : function (value) {
        console.log("change : " + parseFloat(value.toFixed(1)));
        reverbValue = parseFloat(value.toFixed(1));
    },
    release : function (value) {
        //console.log(this.$.attr('value'));
        //console.log("release : " + value);
    },
    cancel : function () {
        console.log("cancel : ", this);
    },
  });
});