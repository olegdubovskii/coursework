export default class AuthService {
    static async logIn(loginForm) {
        const response = await fetch('http://localhost:3030/api/v1/login', {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method:'POST',
          body: JSON.stringify(loginForm),
        });
        return response;
    };

    static async register(registrationForm) {
      const response = await fetch('http://localhost:3030/api/v1/registration', {
        headers: {
          'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify(registrationForm),
      });
      return response;
    };


}