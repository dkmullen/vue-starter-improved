/* eslint-disable no-unused-vars */
import { ENV } from '../../.env.js';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  // CognitoUserSession,
} from 'amazon-cognito-identity-js';

// const POOL_DATA = {
//   UserPoolId: ENV.USERPOOL_ID,
//   ClientId: ENV.CLIENT_ID,
// };
// const userPool = new CognitoUserPool(POOL_DATA);

export function signUp(username, password, email, phone) {
  console.log('hey now', username);
  var poolData = {
    UserPoolId: ENV.USERPOOL_ID,
    ClientId: ENV.CLIENT_ID,
  };
  var userPool = new CognitoUserPool(poolData);

  var attributeList = [];

  var dataEmail = {
    Name: 'email',
    Value: email,
  };

  var dataPhone = {
    Name: 'phone_number',
    Value: phone,
  };

  var attributeEmail = new CognitoUserAttribute(dataEmail);
  var attributePhone = new CognitoUserAttribute(dataPhone);

  attributeList.push(attributeEmail, attributePhone);

  userPool.signUp(
    username,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
    }
  );
}

export function authenticateNewUser(userName, code) {
  var poolData = {
    UserPoolId: ENV.USERPOOL_ID,
    ClientId: ENV.CLIENT_ID,
  };
  var userPool = new CognitoUserPool(poolData);
  var userData = {
    Username: userName,
    Pool: userPool,
  };

  var cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log('call result: ' + result);
  });
}

export function signIn(username, password) {
  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);
  var poolData = {
    UserPoolId: ENV.USERPOOL_ID,
    ClientId: ENV.CLIENT_ID,
  };
  var userPool = new CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken);

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      // AWS.config.region = '<region>';

      // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      //   IdentityPoolId: '...', // your identity pool id here
      //   Logins: {
      //     // Change the key below according to the specific region your user pool is in.
      //     'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result
      //       .getIdToken()
      //       .getJwtToken(),
      //   },
      // });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      // AWS.config.credentials.refresh((error) => {
      //   if (error) {
      //     console.error(error);
      //   } else {
      //     // Instantiate aws sdk service objects now that the credentials have been updated.
      //     // example: var s3 = new AWS.S3();
      //     console.log('Successfully logged!');
      //   }
      // });
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
    mfaSetup: function (challengeName, challengeParameters) {
      console.log('one');
      cognitoUser.associateSoftwareToken(this);
    },

    associateSecretCode: function (secretCode) {
      var challengeAnswer = prompt('Please input the TOTP code.', '');
      cognitoUser.verifySoftwareToken(challengeAnswer, 'My TOTP device', this);
    },

    selectMFAType: function (challengeName, challengeParameters) {
      var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
      cognitoUser.sendMFASelectionAnswer(mfaType, this);
    },

    totpRequired: function (secretCode) {
      var challengeAnswer = prompt('Please input the TOTP code.', '');
      cognitoUser.sendMFACode(challengeAnswer, this, 'SOFTWARE_TOKEN_MFA');
    },

    mfaRequired: function (codeDeliveryDetails) {
      console.log(codeDeliveryDetails);
      var verificationCode = prompt('Please input ya verification code', '');
      cognitoUser.sendMFACode(verificationCode, this);
    },
  });
}
