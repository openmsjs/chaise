msjs.publish(function(response) {
    return 200 <= response.status && response.status < 300;
});
