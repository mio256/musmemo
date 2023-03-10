const list = async (req, res) => {
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    const url = process.env.UPSTASH_REDIS_REST_URL + '/lrange/todo/0/100?_token=' + token;

    return fetch(url)
        .then((r) => r.json())
        .then((data) => {
            let result = JSON.stringify(data.result);
            return res.status(200).json(result);
        });
};

export default list;
