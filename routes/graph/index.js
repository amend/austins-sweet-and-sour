
var response = {};

var lStats = {};

var gramophone = require('gramophone');

exports.init = function(req, res) {
  console.log('***** in /graph');

  res.render('graph/index.html', req);
  //res.render('/graph/index.html', req);
};

exports.stats = function(req, res) {
  console.log('***** in /graph/stats');

  res.send(JSON.stringify(response));
};

// graphs supported:
// donut graph showing total amount of neg, pos, or neutral tweets
// bar graph showing x as day of the week and y as tweet count
// bar graph showing x as hour of day and y as tweet count
exports.getStats = function(app, callback) {
  app.db.models.TweetComplete.find({}, function(err, tweets) {
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
    //console.log('dayTweetCount: ' + JSON.stringify(dayTweetCount));

    // stats for bar graph of hour
    var hourTweetCount = {};
    for(var i = 0; i < 24; i++) {
      var s = i;
      if(s < 10) {
        s = '0' + s.toString();
      }
      hourTweetCount[s] = {};
    }
    for(var hour in hourTweetCount) {
      hourTweetCount[hour] = {
        pos: 0,
        neg: 0,
        neutral: 0
      };
    }

    //console.log('hourTweetCount: ' + JSON.stringify(hourTweetCount));
    //console.log('*** before forEach');
    tweets.forEach(function(tweet) {
      var created_at =  tweet.created_at.split(" ");
      var day = created_at[0];
      var date = Number(created_at[2]);
      var hourTime = created_at[3].split(":")[0];
      //console.log('created_at: 3 ' + created_at[3]);
      //console.log('created_at: 3 ' + created_at[3].split(":")[0]);

      //console.log('date: ' + date);
      //console.log('tweet sentiment: ' + tweet.sentiment);

      if(tweet.sentiment == 'Positive') {
        totalPosCount++;
        dayTweetCount = getDayCount('pos', date, day, dayTweetCount);
        hourTweetCount = getHourCount('pos', date, hourTime, hourTweetCount);
      } else if(tweet.sentiment == 'Negative') {
        totalNegCount++;
        dayTweetCount = getDayCount('neg', date, day, dayTweetCount);
        hourTweetCount = getHourCount('neg', date, hourTime, hourTweetCount);
      } else if(tweet.sentiment == 'Neutral') {
        totalNeutralCount++;
        dayTweetCount = getDayCount('neutral', date, day, dayTweetCount);
        hourTweetCount = getHourCount('neutral', date, hourTime, hourTweetCount);
      } else {
        console.log("*** tweet inspection yeiled not pos, neg, or neutral");
      }
      //console.log('*** forEach unit end');
    });

    //console.log('*** after for each');
    response = {
      donutTotal: {
        pos: totalPosCount,
        neg: totalNegCount,
        neutral: totalNeutralCount
      },
      barDay: dayTweetCount,
      barHour: hourTweetCount
    };

    //res.send(JSON.stringify(response));
    console.log('exiting getStats');
    callback(response)
  });
};

function getDayCount(sentiment, date, day, dayTweetCount) {
  if(date >= 9 && date <= 15) {
    if(day == "Mon") {
      dayTweetCount.monday[sentiment] = Number(dayTweetCount.monday[sentiment]) + 1;
    } else if(day == "Tue") {
      dayTweetCount.tuesday[sentiment] = Number(dayTweetCount.tuesday[sentiment]) + 1;
    } else if(day == "Wed") {
      dayTweetCount.wednesday[sentiment] = Number(dayTweetCount.wednesday[sentiment]) + 1;
    } else if(day == "Thu") {
      dayTweetCount.thursday[sentiment] = Number(dayTweetCount.thursday[sentiment]) + 1;
    } else if(day == "Fri") {
      dayTweetCount.friday[sentiment] = Number(dayTweetCount.friday[sentiment]) + 1;
    } else if(day == "Sat") {
      dayTweetCount.saturday[sentiment] = Number(dayTweetCount.saturday[sentiment]) + 1;
    } else if(day == "Sun") {
      dayTweetCount.sunday[sentiment] = Number(dayTweetCount.sunday[sentiment]) + 1;
    } else {
      console.log("*** tweet inspection yeiled not day of the week");
    }
  }
  //console.log('about to return dayTweetCount: ' + JSON.stringify(dayTweetCount));
  return dayTweetCount;
}

function getHourCount(sentiment, date, hour, hourTweetCount) {
  //console.log('hour: ' + hour);
  //console.log('number hour: ' + Number(hour));
  //console.log('sentiment: ' + sentiment);
  if(date >= 9 && date <= 15) {
    for(var i = 0; i < 25; i++) {
      //console.log('i: ' + i);
      if(Number(hour) == i) {
        hourTweetCount[hour][sentiment] = Number((hourTweetCount[hour])[sentiment]) + 1;
        break;
      } else if(i == 24) {
        console.log('oh no');
      } else {
        //console.log('*** wut');
      }
    }
  }
  //console.log('hourTweetCount: ' + JSON.stringify(hourTweetCount));
  return hourTweetCount;
}

exports.getLangaugeStats = function(app, callback) {
  console.log('in getLangaugeStats')
  app.db.models.TweetComplete.find({}, function(err, tweets) {
    if (err) { console.error('error', err.stack); return;}

    console.log('tweets length: ' + tweets.length);

    var gS = '';
    var hashTable = {};
    tweets.forEach(function(tweet) {
      if(!(tweet.text in hashTable)) {

        gS += tweet.text + ' ';
        hashTable[tweet.text] = 'who dis';
      } else {
        // console.log('tweet already in hashTable: ' + tweet.text);
      }
    });
    console.log('gS length: ' + gS.length);

    console.log('extracing most common words');
    var mostCommon = gramophone.extract(gS, {stopWords: ['http t', 's', 'm', 'amp',
      'tx https t', 'austin tx https', 'tx http t', 'austin tx http', 'austin tx', 'texas'
    ], limit: 70});
    console.log('done extracting most common words: ' + mostCommon);

    console.log('exiting getLangaugeStats');
    callback(lStats)
  });
};
