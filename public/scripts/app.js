var createTweetElement = function(tweetData) {
    //Deconstructs tweet data
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
    // assigns html values to later construct them together
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
    const icon1 = $('<img>', {
        class: "icon1"
    });
    icon1.attr('src', "https://cdn3.iconfinder.com/data/icons/black-easy/512/538774-like_512x512.png");
    const icon2 = $('<img>', {
        class: "icon1"
    });
    icon2.attr('src', "https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-3/72/115-512.png");
    const icon3 = $('<img>', {
        class: "icon1"
    });
    icon3.attr('src', "https://image.flaticon.com/icons/png/512/127/127998.png");
    const userTime = $('<span>', {
        class: 'time'
    });
    let time = moment(Number(created_at)).fromNow();
    userTime.text(time);
    const userLike = $('<span>', {
        class: 'heart'
    });
    const userDummy = $('<span>', {
        class: 'dummy'
    });
    //connect everything together
    header.append(userProfilePicture);
    header.append(userName);
    header.append(userHandle);
    footer.append(userTime);
    footer.append(userLike);
    footer.append(icon1);
    footer.append(icon2);
    footer.append(icon3);
    footer.append(userDummy);
    article.append(header);
    article.append(userTweet);
    article.append(footer);
    return article;
}

function renderTweets(data) {
    //loop through each tweet and create them
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
    //loads what every existing tweets that exist
    loadTweets();

    //event listener 'on click' to submit a tweet
    var $form = $('#form');
    $form.on('submit', function(event) {
        event.preventDefault();
        var serForm = $(this).serialize();
        //visual error logic
        if ($form.find("#field").val().trim() === "") {
            $("#empty").show();
            $("#tooLong").hide();
        } else if ($form.find("#field").val().length > 140) {
            $("#tooLong").show();
            $("#empty").hide();
        }
        //actual error logic which would prevent submitting a tweet
        if (!($form.find("#field").val().trim() === "") && !($form.find("#field").val().length > 140)) {
            $.post("/tweets", serForm)
            .then(()=>{
                loadTweets();
            });
            $(".new-tweet").slideToggle("slow");
            $("#empty").hide();
            $("#tooLong").hide();
        }
    });
    //on click to toggle the tweet maker
    var $button = $('#compose');
    $button.on('click', function(event) {
        event.preventDefault();
        document.getElementById("field").value = "";
        $(".new-tweet").slideToggle("slow");
        $(".new-tweet textarea").focus();
    });
});
// to add it to the page so we can make sure it's got all the right elements, classes, etc.