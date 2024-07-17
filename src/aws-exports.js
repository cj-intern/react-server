const awsConfig = {
  Auth: {
    region: 'ap-northeast-2',
    userPoolId: 'ap-northeast-2_lycrORCUa',
    userPoolWebClientId: '4n3d4hevdm33ml78s7mck0sdo4',
    oauth: {
      domain: 'intern-user-pool.auth.ap-northeast-2.amazoncognito.com',
      scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'https://ecommerce.p-e.kr/',
      redirectSignOut: 'https://ecommerce.p-e.kr/',
      responseType: 'code' // or 'token'
    }
  }
};

export default awsConfig;
