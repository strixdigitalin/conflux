export const mobileLoginPostRequest = async (
  phone,
  companyId,
  successCallBack,
) => {
  console.log('\n\n mobileLoginPostRequest Called : ', phone, companyId);

  const body = {
    endpoint: 'auth',
    action: 'loginByOTP',
    product_code: companyId.toLocaleUpperCase(),
    params: {
      number: phone, // "8768407750"
    },
  };

  try {
    let response = await fetch(
      'https://gclfo3ljyh.execute-api.us-east-1.amazonaws.com/prod/confluxhr',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    let json = await response.json();
    console.log('\n\n mobileLoginPostRequest success: ', json);
    successCallBack(json);
  } catch (error) {
    console.log('\n\n mobileLoginPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const matchOTPPostRequest = async (phone, otpVal, successCallBack) => {
  console.log('\n\n matchOTPPostRequest Called : ', phone, otpVal);

  const body = {
    endpoint: 'auth',
    action: 'verifyOTP',
    product_code: 'JO',
    params: {
      number: phone,
      otp: otpVal,
    },
  };

  try {
    let response = await fetch(
      'https://gclfo3ljyh.execute-api.us-east-1.amazonaws.com/prod/confluxhr',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    let json = await response.json();
    console.log('\n\n matchOTPPostRequest success: ', json);
    successCallBack(json);
  } catch (error) {
    console.log('\n\n matchOTPPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const applyLeave = async (payload, successCallBack) => {
  const {staffid, type, start_date, end_date, reason} = payload;
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'leave',
    action: 'apply_leave',
    product_code: 'JO',
    params: {
      staff_id: staffid, //326,
      leave_type: type, //'Full Day',
      start_date: start_date, //'2022-09-12',
      end_date: end_date, //'2022-09-15',
      reason: reason, //'Test Reason',
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
    .then(result => {
      console.log(result, '<<<Result');
      successCallBack(result);
    })
    .catch(error => console.log('error', error));
};
export const upCommingHoliday = async (payload, successCallBack) => {
  const {staffid, type, start_date, end_date, reason} = payload;
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'dashboard',
    action: 'upcoming_holiday',
    product_code: 'JO',
    params: {
      staffid: payload.staffid,
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
    .then(result => {
      console.log(result, '\n\n\n\n\n\n\n<<<Result');
      successCallBack(result);
    })
    .catch(error => console.log('error', error));
};

export const getAllLeaves = async (id, callBack) => {
  console.log(id, 'get all leave id');
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'leave',
    action: 'get_leave',
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
    .then(result => {
      // console.log(result, '<<<<< get all leave result');
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const getNotice = callBack => {
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'dashboard',
    action: 'all_notice',
    product_code: 'JO',
    params: {
      staffid: 1,
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
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

export const getAttedance = async (id, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'attendance',
    action: 'get_attendance',
    product_code: 'JO',
    params: {
      staffid: id, //152
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
    .then(result => {
      // console.log(result, '<<<<attandance result at api screen');
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const getBirthdays = callBack => {
  var myHeaders = new Headers();
  myHeaders.append('X-api-key', 'xDC7BEzNo44zu1Nk7GlE564V2jlsjnsf2RrO2ErD');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    endpoint: 'dashboard',
    action: 'upcoming_birthday',
    product_code: 'JO',
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
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};
