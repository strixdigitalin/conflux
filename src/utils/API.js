export const mobileLoginPostRequest = async (phone, companyId, successCallBack) => {
    console.log('\n\n mobileLoginPostRequest Called : ', phone, companyId);

    const body = {
        "endpoint": "auth",
        "action": "loginByOTP",
        "product_code": "JO",
        "params": {
            "number": "8768407750" // "8768407750"
        }
    }

    try {
        let response = await fetch('https://gclfo3ljyh.execute-api.us-east-1.amazonaws.com/prod/confluxhr', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
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
        "endpoint": "auth",
        "action": "verifyOTP",
        "product_code": "JO",
        "params": {
            "number": "8768407750",
            "otp": "490967"
        }
    }

    try {
        let response = await fetch('https://gclfo3ljyh.execute-api.us-east-1.amazonaws.com/prod/confluxhr', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n matchOTPPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n matchOTPPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};