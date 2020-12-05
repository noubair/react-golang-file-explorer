let connect = (cb) => {
};

const url = 'http://localhost:1234/send';

let sendMsg = (msg, action) => {
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messageBody: msg,
      action: action
    })
  }).then(
    response => response.json(),

    error => console.log('An error occurred.', error)
  )
};

let  send = async function(v, action) {
  var response = await sendMsg(v, action);
  return response;
}

export { connect, sendMsg, send };
