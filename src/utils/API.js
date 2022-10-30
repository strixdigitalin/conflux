export const mobileLoginPostRequest = async (
  phone,
  companyId,
  successCallBack,
) => {
  console.log('\n\n mobileLoginPostRequest Called : ', phone, companyId);

  const body = {
    endpoint: 'auth',
    action: 'loginByOTP',
    product_code: companyId,
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

    console.log('\n\n mobileLoginPostRequest success: ', json.statusCode);
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
