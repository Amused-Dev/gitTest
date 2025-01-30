const opts = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic OW5XVUNuM1g4U1phYUphS0xnQUl2TG9HT0Z2ZXY1QWk6WW5ZRG43ckF5dkRhREFTMQ==",
        Accept: "application/json",
    },
    data: {},
    body: { grant_type: "client_credentials", scope: "data:read" },
};

try {
    // Send api request.
    const response = await apis.token(opts);
     //log.info(response);
    var temp_headers = requestConfig.headers;
    temp_headers.Authorization = "Bearer " + response.data.access_token;

    requestConfig.headers = temp_headers;

} catch (error) {
    log.error("Error in request: ", error);
    return fail();
}

//log.info("API requestConfig", requestConfig);

complete();
