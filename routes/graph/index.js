
exports.init = function(req, res) {
  console.log('***** in /graph');

  res.render('graph/index.html', req);
  //res.render('/graph/index.html', req);
};

// graphs supported:
// pie graph showing total amount of neg, pos, or neutral tweets
// bar graph showing x as day of the week and y as tweet count
// bar graph showing x as hour of day and y as tweet count

exports.getStats = function(req, res) {
  req.app.db.models.Tweet.find( { $or: [ { "sentiment_probability.label": "neg" }, {  "sentiment_probability.label": "pos" }, { "sentiment_probability.label": "neutral" } ] }, function(err, tweets) {
    if (err) { console.error('error', err.stack); return;}

    console.log('tweets length: ' + tweets.length);
    // stats for pie graph of totals
    var totalPosCount = 0;
    var totalNegCount = 0;
    var totalNeutralCount = 0;

    // stats for bar graph of day
    var dayTweetCount = {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
    };
    for(var day in dayTweetCount) {
      dayTweetCount[day] = {
        pos: 0,
        neg: 0,
        neutral: 0
      }
    }
    console.log('dayTweetCount: ' + JSON.stringify(dayTweetCount));

    // stats for bar graph of hour
    var hourTweetCount = {
      '12am': {},
      '1am': {},
      '2am': {},
      '3am': {},
      '4am': {},
      '5am': {},
      '6am': {},
      '7am': {},
      '8am': {},
      '9am': {},
      '10am': {},
      '11am': {},
      '12am': {},
      '1pm': {},
      '2pm': {},
      '3pm': {},
      '4pm': {},
      '5pm': {},
      '6pm': {},
      '7pm': {},
      '8pm': {},
      '9pm': {},
      '10pm': {},
      '11pm': {}
    };
    for(var hour in dayTweetCount) {
      hour = {
        pos: 0,
        neg: 0,
        neutral: 0
      }
    }
    tweets.forEach(function(tweet) {
      var created_at =  tweet.created_at.split(" ");
      var day = created_at[0];

      if(tweet.sentiment_label == 'pos') {
        totalPosCount++;
        dayTweetCount = getDayCount(day, dayTweetCount);
      } else if(tweet.sentiment_label == 'neg') {
        totalNegCount++;
        dayTweetCount = getDayCount(day, dayTweetCount);
      } else if(tweet.sentiment_label == 'neutral') {
        totalNeutralCount++;
        dayTweetCount = getDayCount(day, dayTweetCount);
      } else {
        console.log("*** tweet inspection yeiled not pos, neg, or neutral");
      }
    });

    var response = {
      donut: {
        pos: totalPosCount,
        neg: totalNegCount,
        neutral: totalNeutralCount
      },
      barDay: dayTweetCount,
      barHour: hourTweetCount
    };

    res.send(JSON.stringify(response));
    console.log('tweets sent');
  });
};

function getDayCount(day, dayTweetCount) {
  console.log("day: " + day);
  if(day == "Mon") {
    //console.log('m');
    dayTweetCount.monday = Number(dayTweetCount.monday) + 1;
  } else if(day == "Tue") {
    //console.log('t');
    dayTweetCount.tuesday = Number(dayTweetCount.tuesday) + 1;
  } else if(day == "Wed") {
    //console.log('w');
    dayTweetCount.wednesday = Number(dayTweetCount.wednesday) + 1;
  } else if(day == "Thu") {
    //console.log('th');
    dayTweetCount.thursday = Number(dayTweetCount.thursday) + 1;
  } else if(day == "Fri") {
    //console.log('f');
    dayTweetCount.friday = Number(dayTweetCount.friday) + 1;
  } else if(day == "Sat") {
    //console.log('sa');
    dayTweetCount.saturday = Number(dayTweetCount.saturday) + 1;
  } else if(day == "Sun") {
    //console.log('su');
    dayTweetCount.sunday = Number(dayTweetCount.sunday) + 1;
  } else {
    console.log("*** tweet inspection yeiled not day of the week");
  }
  //console.log('about to return dayTweetCount: ' + JSON.stringify(dayTweetCount));
  return dayTweetCount;
}
