// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    var button;
    $.fn.spin = function(opts, color, content) {
      var presets;
      presets = {
        tiny: {
          lines: 8,
          length: 2,
          width: 2,
          radius: 3
        },
        small: {
          lines: 8,
          length: 1,
          width: 2,
          radius: 5
        },
        large: {
          lines: 10,
          length: 8,
          width: 4,
          radius: 8
        }
      };
      if (Spinner) {
        return this.each(function() {
          var $this, spinner;
          $this = $(this);
          $this.html("&nbsp;");
          spinner = $this.data("spinner");
          if (spinner != null) {
            spinner.stop();
            $this.data("spinner", null);
            return $this.html(content);
          } else if (opts !== false) {
            if (typeof opts === "string") {
              if (opts in presets) {
                opts = presets[opts];
              } else {
                opts = {};
              }
              if (color) {
                opts.color = color;
              }
            }
            spinner = new Spinner($.extend({
              color: $this.css("color")
            }, opts));
            spinner.spin(this);
            return $this.data("spinner", spinner);
          }
        });
      } else {
        console.log("Spinner class not available.");
        return null;
      }
    };
    button = $('#generate-btn');
    button.startLoading = function() {
      button.text('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
      return button.spin('tiny');
    };
    button.endLoading = function() {
      button.spin();
      return button.html('Reset Credentials');
    };
    button.click(function() {
      button.startLoading();
      return client.post('token', {}, {
        success: function(data) {
          $('#login-span').html(data.account.login);
          $('#password-span').html(data.account.token);
          return button.endLoading();
        },
        error: function(err) {
          return button.endLoading();
        }
      });
    });
    $('.tab.caldav').click(function() {
      var device;
      $('.tab.caldav.selected').removeClass('selected');
      $('.caldavconf:visible').hide();
      $(this).addClass('selected');
      device = $(this).data('device');
      return $(".caldavconf[data-device='" + device + "']").show();
    });
    return $('.tab.carddav').click(function() {
      var device;
      $('.tab.carddav.selected').removeClass('selected');
      $('.carddavconf:visible').hide();
      $(this).addClass('selected');
      device = $(this).data('device');
      return $(".carddavconf[data-device='" + device + "']").show();
    });
  });

}).call(this);
