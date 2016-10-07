'use-strict';

(function() {


  $('.date').each(function() {
    var postDate = $(this).html();
    var processedDate = moment().diff(postDate, 'seconds');
    var duration = moment.duration(processedDate, "seconds").humanize();

    var timeSince = 'posted ' + duration + ' ago';
    
    return $(this).html(timeSince);
  });

  var content = $('.post-content').text();

  console.log(content.split('').length);

})();