/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [{
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}, {
    "user": {
        "name": "Descartes",
        "avatars": {
            "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
            "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
            "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
    },
    "content": {
        "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
}, {
    "user": {
        "name": "Johann von Goethe",
        "avatars": {
            "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
            "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
            "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
    },
    "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
}];

var createTweetElement = function(tweetData) {
    console.log(tweetData);
    const {
        user,
        content,
        created_at
    } = tweetData;
    const {
        name,
        avatars,
        handle
    } = user;
    const {
        small,
        regular,
        large
    } = avatars;
    const {
        text
    } = content;
    const article = $('<article>', {
        class: 'article'
    });
    const header = $('<header>', {
        class: 'head'
    });
    const userProfilePicture = $('<img>');
    userProfilePicture.attr('src', small);
    const userName = $('<h1>', {
        class: 'name'
    });
    userName.text(name);
    const userHandle = $('<h1>', {
        class: 'tag'
    });
    userHandle.text(handle);
    const userTweet = $('<div>', {
        class: 'tweet'
    });
    userTweet.text(text);
    const footer = $('<footer>', {
        class: 'foot'
    });
    const userTime = $('<span>', {
        class: 'time'
    });
    userTime.text(created_at);
    const userLike = $('<span>', {
        class: 'heart'
    });
    const userDummy = $('<span>', {
        class: 'dummy'
    });
    header.append(userProfilePicture);
    header.append(userName);
    header.append(userHandle);
    footer.append(userTime);
    footer.append(userLike);
    footer.append(userDummy);
    article.append(header);
    article.append(userTweet);
    article.append(footer);
    return article;
}

function renderTweets(data) {
    data.forEach(function(tweet) {
        $('.tweet-container').prepend(createTweetElement(tweet));
    });
}

function loadTweets() {
    var tweets = $.ajax('/tweets', {
        method: 'GET'
    }).then(function(content) {
        $('.tweet-container').empty();
        renderTweets(content);
    });
    return;
}
$(document).ready(() => {
    loadTweets();

    var $form = $('#form');
    $form.on('submit', function(event) {
        event.preventDefault();
        console.log('Button clicked, performing ajax call...');
        console.log($form.find("#field").val());
        var serForm = $(this).serialize();
        console.log(serForm);
        if ($form.find("#field").val() === "") {
            $("#empty").show();
        }else if ($form.find("#field").val().length > 140) {
            $("#tooLong").show();
        } else {
            $.post("/tweets", serForm);
            $(".new-tweet").toggle();
            $("#empty").hide();
        $("#tooLong").hide();
        }
        loadTweets();


    });




    var $button = $('#compose');
    $button.on('click', function(event) {
        event.preventDefault();

        $(".new-tweet").slideToggle("medium");
        $(".new-tweet textarea").focus();

    });
});
// to add it to the page so we can make sure it's got all the right elements, classes, etc.