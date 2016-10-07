(function() {


  var postDate = moment().diff('2016-10-05', 'hours');
  var dur = moment.duration(postDate, "hours").humanize();


  var timeSince = 'posted ' + dur + ' ago';

  $('.post-date').html(function() {
    return timeSince;
  })

})();