(function() {


  $('.date').each(function() {
    var postDate = $(this).html();
    var processedDate = moment().diff(postDate, 'hours');
    var dur = moment.duration(processedDate, "hours").humanize();

    var timeSince = 'posted ' + dur + ' ago';
    return $(this).html(timeSince);
  });

})();