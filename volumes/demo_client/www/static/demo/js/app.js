
function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&')
}

function serializeFormData(formElement) {
  const data = {}
  for (let item of formElement.getElementsByTagName('input')) {
    data[item.name] = item.value
  }
  return data
}

function apiCall(endpoint, payload) {
  let secret = document.getElementById('secret')
  if (secret.value != '') {
    payload.secret = secret.value
  }
  let apiResource = endpoint.url
  const fetchOptions = {
    credentials: 'same-origin',
    method: endpoint.method,
    headers: new Headers({ 'Content-Type': 'application/json' })
  }
  if (endpoint.method === 'POST' || endpoint.method === 'DELETE') {
    fetchOptions.body = JSON.stringify(payload)
  }
  else if (endpoint.method === 'GET') {
    apiResource = `${endpoint.url}?${objToQueryString(payload)}`
  }

  return fetch(apiResource, fetchOptions)
    .then(response => response.json())
    .catch(function (error) {
      console.log('error:', error)
    })  
}
































const u2fTimeout = 10
const dataStore = window.localStorage;


const origin = window.location.origin
for (let field of document.getElementsByClassName('appId')) {
  field.value = origin
}


const demoForms = document.querySelectorAll('form._demo_form')


demoForms.forEach(demoForm => {

  const demo_feedback = demoForm.closest("div.album")
    .nextElementSibling
    .querySelector('._demo_feedback')
  const demoDisplay = {
    feedback_notice: demo_feedback.querySelector('._feedback_notice'),
    feedback_instruction: demo_feedback.querySelector('._feedback_instruction'),
    feedback_instruction_text: demo_feedback.querySelector('._feedback_instruction_text'),
    feedback_api_response: demo_feedback.querySelector('._feedback_api_response'),
    feedback_api_response_text: demo_feedback.querySelector('._feedback_api_response_text'),
    feedback_api_secret_image: demo_feedback.querySelector('._feedback_api_secret_image'),
    feedback_api_secret_string: demo_feedback.querySelector('._feedback_api_secret_string'),
    feedback_api_secret_string_text: demo_feedback.querySelector('._feedback_api_secret_string_text')
  }

  demoForm.addEventListener("click", function(event){
    event.preventDefault()
  })

  let _check = demoForm.querySelector('button._check')
  let _register = demoForm.querySelector('button._register')
  let _register2 = demoForm.querySelector('button._register2')
  let _auth = demoForm.querySelector('button._auth')
  let _delete = demoForm.querySelector('button._delete')
  
  if (_check) {
    _check.onclick = function() {
      console.log('_check', this.id)
      const formData = serializeFormData(this.parentNode)
      console.log(formData)
      console.log(apiRouter[this.id])

      demoDisplay.feedback_api_response_text.innerHTML = initDisplays[this.id][0]
      demoDisplay.feedback_instruction_text.innerHTML = initDisplays[this.id][1]

      apiCall(apiRouter[this.id], formData)
        .then(apiResponse => apiCallbacks[this.id](demoDisplay, formData, apiResponse))

    }
  }

  if (_register) {
    _register.onclick = function() {
      console.log('_register', this.id)
      const formData = serializeFormData(this.parentNode)
      console.log(formData)
      console.log(apiRouter[this.id])

      demoDisplay.feedback_api_response_text.innerHTML = initDisplays[this.id][0]
      demoDisplay.feedback_instruction_text.innerHTML = initDisplays[this.id][1]

      apiCall(apiRouter[this.id], formData)
        .then(apiResponse => apiCallbacks[this.id](demoDisplay, formData, apiResponse))

    }
  }

  if (_register2) {
    _register2.onclick = function() {
      console.log('_register2', this.id)
      const formData = serializeFormData(this.parentNode)
      console.log(formData)
      console.log(apiRouter[this.id])

      demoDisplay.feedback_api_response_text.innerHTML = initDisplays[this.id][0]
      demoDisplay.feedback_instruction_text.innerHTML = initDisplays[this.id][1]

      apiCall(apiRouter[this.id], formData)
        .then(apiResponse => apiCallbacks[this.id](demoDisplay, formData, apiResponse))

    }
  }


  
  if (_auth) {
    _auth.onclick = function() {
      console.log('_auth', this.id)
      const formData = serializeFormData(this.parentNode)
      console.log(formData)
      console.log(apiRouter[this.id])

      demoDisplay.feedback_api_response_text.innerHTML = initDisplays[this.id][0]
      demoDisplay.feedback_instruction_text.innerHTML = initDisplays[this.id][1]

      apiCall(apiRouter[this.id], formData)
        .then(apiResponse => apiCallbacks[this.id](demoDisplay, formData, apiResponse))
    }
  }

  if (_delete) {
    _delete.onclick = function() {
      console.log('_delete', this.id)
      const formData = serializeFormData(this.parentNode)
      console.log(formData)
      console.log(apiRouter[this.id])

      demoDisplay.feedback_api_response_text.innerHTML = initDisplays[this.id][0]
      demoDisplay.feedback_instruction_text.innerHTML = initDisplays[this.id][1]

      apiCall(apiRouter[this.id], formData)
        .then(apiResponse => apiCallbacks[this.id](demoDisplay, formData, apiResponse))
    }
  }



})












function keyAuthenticateProcess(demoDisplay, formData, u2f_authRequest) {

  u2f.sign(u2f_authRequest.authRequest.appId, u2f_authRequest.authRequest.challenge, u2f_authRequest.key_handles, (deviceResponse) => {
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(deviceResponse)

    if (deviceResponse.errorCode) {
      let errorMessage = 'U2F Token Registration Error'
      switch (deviceResponse.errorCode) {
        // case 0:
        //   errorMessage = 'U2F Token Registration Successful'
        //   break
        // case 1:
        //   errorMessage = 'U2F Token Registration Error'
        //   break
        case 2:
          errorMessage = 'Bad Registration Request'
          break
        case 3:
          errorMessage = 'U2F Token Configuration Unsupported'
          break
        case 4:
          errorMessage = 'U2F Token Device Ineligible'
          break
        case 5:
          errorMessage = 'Registration Timed Out. Retry!'
          break
        default:
          errorMessage = 'U2F Token Registration Error'

      }
      demoDisplay.feedback_instruction_text.innerHTML = errorMessage
    }
    else {

      demoDisplay.feedback_instruction_text.innerHTML = 'U2F Token Signed Challenged. Submitted to API.'
      demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(deviceResponse)


      formData.deviceResponse = deviceResponse
      
      apiCall(apiRouter.keyAuthenticateFinish, formData)
        .then(keyAuthenticateFinalStatus => {
          demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(keyAuthenticateFinalStatus)
          if (keyAuthenticateFinalStatus.result) {
            demoDisplay.feedback_instruction_text.innerHTML = 'U2F Token Auth Successful'
          }
          else {
            demoDisplay.feedback_instruction_text.innerHTML = 'U2F Token Auth Unsuccessful'
          }
        })
  
    }



  }, u2fTimeout)


  
}






function keyRegisterProcess(demoDisplay, formData, u2f_registerRequest) {
  u2f.register(u2f_registerRequest.appId, [u2f_registerRequest], [], (deviceResponse) => {
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(deviceResponse)
    if (deviceResponse.errorCode) {
      let errorMessage = 'U2F Token Registration Error'
      switch (deviceResponse.errorCode) {
        // case 0:
        //   errorMessage = 'U2F Token Registration Successful'
        //   break
        // case 1:
        //   errorMessage = 'U2F Token Registration Error'
        //   break
        case 2:
          errorMessage = 'Bad Registration Request'
          break
        case 3:
          errorMessage = 'U2F Token Configuration Unsupported'
          break
        case 4:
          errorMessage = 'U2F Token Device Ineligible'
          break
        case 5:
          errorMessage = 'Registration Timed Out. Retry!'
          break
        default:
          errorMessage = 'U2F Token Registration Error'

      }
      demoDisplay.feedback_instruction_text.innerHTML = errorMessage
    }
    else {
      demoDisplay.feedback_instruction_text.innerHTML = 'U2F Token Signed Challenged. Submitted to API.'
      formData.registrationResponse = deviceResponse
      apiCall(apiRouter.keyRegisterFinish, formData)
        .then(keyRegisterFinalStatus => {
          demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(keyRegisterFinalStatus)
          if (keyRegisterFinalStatus.public_key) {
            demoDisplay.feedback_instruction_text.innerHTML = 'U2F Token Successfully Registered to Account'
          }
          else {
            demoDisplay.feedback_instruction_text.innerHTML = 'U2F Token Unsuccessfully Registered to Account'
          }
        })
  
    }



    

  
  }, u2fTimeout)
}



function otpRegisterProcess(demoDisplay, formData, totp_RegisterRequest) {

  demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(totp_RegisterRequest)
  demoDisplay.feedback_api_secret_image.src = totp_RegisterRequest.imageUrl
  demoDisplay.feedback_api_secret_string_text.innerHTML = totp_RegisterRequest.secret


  
}




























const apiHost = 'https://api.example.com'
const apiEndpoint = (path) => {
  return `${apiHost}${path}`
}
const apiRouter = {
  keyRegisterStart: {
    method: 'POST',
    url: apiEndpoint('/key/register')
  },
  keyRegisterFinish: {
    method: 'POST',
    url: apiEndpoint('/key/register/finish')
  },
  keyAuthenticateStart: {
    method: 'POST',
    url: apiEndpoint('/key/authenticate')
  },
  keyAuthenticateFinish: {
    method: 'POST',
    url: apiEndpoint('/key/authenticate/finish')
  },
  keyRemove: {
    method: 'DELETE',
    url: apiEndpoint('/key/remove')
  },
  keyStatus: {
    method: 'GET',
    url: apiEndpoint('/status')
  },
  codeIssue: {
    method: 'POST',
    url: apiEndpoint('/code/issue')
  },
  codeAuthenticate: {
    method: 'GET',
    url: apiEndpoint('/code/authenticate')
  },
  otpRegisterStart: {
    method: 'POST',
    url: apiEndpoint('/otp/register')
  },
  otpRegisterFinish: {
    method: 'POST',
    url: apiEndpoint('/otp/register/finish')
  },
  otpAuthenticate: {
    method: 'GET',
    url: apiEndpoint('/otp/authenticate')
  },
  otpStatus: {
    method: 'GET',
    url: apiEndpoint('/status')
  },
  otpRemove: {
    method: 'DELETE',
    url: apiEndpoint('/otp/remove')
  },  
  mfaStatus: {
    method: 'GET',
    url: apiEndpoint('/status')
  },
  mfaLogs: {
    method: 'GET',
    url: apiEndpoint('/logs')
  }  

}

const apiCallbacks = {
  keyStatus: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'Current U2F Status.'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  keyRegisterStart: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'U2F Key Challenge Recieved. Trigger key to Sign'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
    keyRegisterProcess(demoDisplay, formData, apiResponse)
  },
  keyAuthenticateStart: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'U2F Key Auth Challenge Recieved. Trigger key to Sign'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
    keyAuthenticateProcess(demoDisplay, formData, apiResponse)
  },
  keyRemove: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'U2F Key Removed'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  codeIssue: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'Codes issued for your account!'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  codeAuthenticate: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'Code Auth Complete'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  otpRegisterStart: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'Store OTP Secret and Present Authentication'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
    otpRegisterProcess(demoDisplay, formData, apiResponse)
  },
  otpRegisterFinish: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'OTP Verification Response'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  otpStatus: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'Current OTP Status...'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  otpAuthenticate: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'OTP Token Outcome.'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  otpRemove: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'OTP Device Removed'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  mfaStatus: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'MFA Status:.'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  },
  mfaLogs: (demoDisplay, formData, apiResponse) => {
    demoDisplay.feedback_instruction_text.innerHTML = 'MFA Logs:'
    demoDisplay.feedback_api_response_text.innerHTML = JSON.stringify(apiResponse)
  }  
}

const initDisplays = {
  keyStatus: ['Pending...', 'Looking up Registered U2F Keys'],
  keyRegisterStart: ['Pending...', 'Initializing U2F Key Registration'],
  keyAuthenticateStart: ['Pending...', 'Initializing U2F Key Registration'],
  keyRemove: ['Pending...', 'Removing U2F Key'],
  codeIssue: ['Pending...', 'Issing codes for your account!'],
  codeAuthenticate: ['Pending...', 'Verifying Submitted Backup code!'],
  otpRegisterStart: ['Pending...', 'Fetching OTP Secret (String and QR Code!'],
  otpRegisterFinish: ['Pending...', 'Verifiung OTP Token!'],
  otpStatus: ['Pending...', 'Looking Up OTP Status!'],
  otpAuthenticate: ['Pending...', 'Verifying OTP Token!'],
  otpRemove: ['Pending...', 'Removing OTP Device'],
  mfaStatus: ['Pending...', 'Checking MFA Status!'],
  mfaLogs: ['Pending...', 'Checking MFA Logs!'],
}
