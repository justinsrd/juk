'use strict';

var ytPlayer;
var scIframe;
var scIframeWidget;

// Constructors
var Track = function(source, url) {
  this.source = source;
  this.url = url;
};

var Playlist = function(listOfTracks) {
  this.listOfTracks = listOfTracks;
};

function init() {
  // SoundCloud API Init -- LEAVE HERE
  SC.initialize({
    client_id: 'YOUR_CLIENT_ID'
  });

  playTrack(andosList.listOfTracks[currentTrack]);
}

// Sim DB
var t1 = new Track('sc', 'https://soundcloud.com/cleanbandit/rather-be-feat-jess-glynne');
var t2 = new Track('sc', 'https://soundcloud.com/fosterthepeoplemusic/pumpedupkicks');
var t3 = new Track('yt', 'https://www.youtube.com/watch?v=RIZdjT1472Y');
var t4 = new Track('yt', 'https://www.youtube.com/watch?v=bdSykIx5Lxk');
var t5 = new Track('sc', 'https://soundcloud.com/lastlightuk/86a');

// On page load, grab PlayList
var andosList = new Playlist([t1, t2, t3, t4, t5]);
// On page load, set currentTrack
var currentTrack = 0;
// On page load, init API Objects
init();

function previousTrack() {
  if (currentTrack == 0) {
    currentTrack = andosList.listOfTracks.length - 1;         
  } else {
    currentTrack--;
  }

  playTrack(andosList.listOfTracks[currentTrack]);
  // DB set currentTrack to counter
};

function nextTrack() {
  if (currentTrack == andosList.listOfTracks.length - 1) {
    currentTrack = 0;         
  } else {
    currentTrack++;
  }

  playTrack(andosList.listOfTracks[currentTrack]);
  // DB set currentTrack to counter
};

function playTrack(track) {   
  var source = track.source;
  var url = track.url;

  var activePlayer = $('.active');

  if (activePlayer.attr('id') === 'scPlayer') {
    activePlayer.html('');
  } else if (activePlayer.attr('id') === 'ytPlayer') {
    if (ytPlayer) {
      ytPlayer.videoId = '';
      ytPlayer.stopVideo();
    }
  }

  activePlayer.removeClass('active');

  if (source === 'sc') {
    playSoundCloud(url);
  } else if (source === 'yt') {
    playYoutube(url);
  } else if (source === 'sy') {
    alert('cry');
  }
};

function playSoundCloud(url) {
  $('#scPlayer').addClass('active');
  SC.oEmbed(url, {
    element: document.getElementById('scPlayer'),  //cant use jQuery here, idk why
    auto_play: true,
    show_comments: false,
    iframe: true
  }).then(function(oEmbed) {
    var scIframe = document.querySelector('#scPlayer iframe'); //cant use jQuery here, idk why
    var scIframeWidget = SC.Widget(scIframe);
    scIframeWidget.bind(SC.Widget.Events.FINISH, function() {
      nextTrack();
    });
  });
}

function playYoutube(url) {
  $('#ytPlayer').addClass('active');
  url = url.split('');
  url = url.splice(url.indexOf('=')+1);
  url = url.join('');
  ytPlayer.loadVideoById(url);
  ytPlayer.playVideo();
}

/***********************************/
// global youtube player stuff
// creates dummy youtube player so we dont have to load a new DOM obj on nextTrack()

function onYouTubePlayerAPIReady() {
  ytPlayer = new YT.Player('ytPlayer', {
    height: '400',
    width: '640',
    videoId: '',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// when video ends
function onPlayerStateChange(event) {        
  if(event.data === 0) {            
    nextTrack();
  }
}

/***********************************/