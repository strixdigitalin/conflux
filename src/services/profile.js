export const userProfile = (id, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    endpoint: 'profile',
    action: 'my_profile',
    product_code: 'JO',
    params: {
      staffid: id,
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://gclfo3ljyh.execute-api.us-east-1.amazonaws.com/prod/confluxhr',
    requestOptions,
  )
    .then(response => response.text())
    .then(res => {
      console.log(result);
      const result = JSON.parse(res);
      if (result.statusCode == 200) {
        console.log(result, '<<<<result at api');
        callBack({ success: true, data: result.body });
      } else {
        callBack({ success: false, data: result.body });
      }
    })
    .catch(error => console.log('error', error));
};

export const getPayslipData = (id, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'payslip',
    action: 'payslip',
    product_code: 'JO',
    params: {
      staffid: 327,
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://gclfo3ljyh.execute-api.us-east-1.amazonaws.com/prod/confluxhr',
    requestOptions,
  )
    .then(response => response.json())
    .then(result => {
      callBack(result);
    })
    .catch(error => console.log('error', error));
};
