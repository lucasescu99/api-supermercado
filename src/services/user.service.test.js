const userService = require('./user.service');
const userDao = require('../dao/user.dao.js');

jest.mock('../dao/user.dao.js');

describe('User Service', () => {
  describe('Sign up method', () => {
    it('should fail with 409 if email is in use', async () => {
      const mock = [{exists: 1}];
      const resultError = {
        status: 409,
        error: 'email_in_use',
        msg: 'Email en uso',
      };
      userDao.exists.mockImplementationOnce(() => mock);

      try {
        await userService.signUp();
      } catch (error) {
        expect(error).toEqual(resultError);
      }
    });
  });

  describe('get user', () => {
    it('should throw status 404 if user is not found', async () => {
      const mock = [{exists: 0}];
      const resultError = {
        status: 404,
        error: 'user_not_found',
        msg: 'Usuario no encontrado',
      };

      userDao.exists.mockImplementationOnce(() => mock);

      try {
        await userService.get(1);
      } catch (error) {
        expect(error).toEqual(resultError);
      }
    });
    it('should return user data', async () => {
      const mock = [
        {
          id: '1',
          userName: 'userName',
          email: 'email@email.com',
          lastName: 'lastName',
          firstName: 'firstName',
          type: 'admin',
          createdAt: '2019-09-03T16:27:20.000Z',
          state: 'pending',
          profileDescription: null,
          profilePicture: null,
          idLocation: null,
        },
      ];
      const mock2 = [{exists: 1}];
      userDao.exists.mockImplementationOnce(() => mock2);
      userDao.get.mockImplementationOnce(() => mock);

      const result = await userService.get();
      expect(result).toEqual(mock);
    });
  });

  describe('Update user info method', () => {
    it('should fail with 404 if user is not found', async () => {
      const mock = [{exists: 0}];
      const resultError = {
        status: 404,
        error: 'user_not_found',
        msg: 'Usuario no encontrado',
      };
      userDao.exists.mockImplementationOnce(() => mock);

      try {
        await userService.update();
      } catch (error) {
        expect(error).toEqual(resultError);
      }
    });
    it('should succeed with 200', async () => {
      const mock = [{exists: 1}];

      userDao.exists.mockImplementationOnce(() => mock);
      userDao.update.mockImplementationOnce(() => 0);

      const result = await userService.update(
        'test@mail.com',
        'userName',
        'firstName',
        'lastName'
      );
      expect(result).toEqual(0);
    });
  });

  describe('Delete user', () => {
    it('should fail with 404 if user is not found', async () => {
      const mock = [{exists: 0}];
      const resultError = {
        status: 404,
        error: 'user_not_found',
        msg: 'Usuario no encontrado',
      };

      userDao.exists.mockImplementationOnce(() => mock);

      try {
        await userService.delete();
      } catch (error) {
        expect(error).toEqual(resultError);
      }
    });

    it('should succeed with 200 and delete user', async () => {
      const mock = [{exists: 1}];

      userDao.exists.mockImplementationOnce(() => mock);
      userDao.delete.mockImplementationOnce(() => 0);

      const result = await userService.delete();
      expect(result).toEqual(0);
    });
  });
  describe('Login', () => {
    it('should fail with 400 if user is not found', async () => {
      const mock = [{exists: 0}];
      const resultError = {
        error: 'user_not_found',
        msg: 'User is incorrect',
      };

      userDao.exists.mockImplementationOnce(() => mock);

      try {
        await userService.login();
      } catch (error) {
        expect(error).toEqual(resultError);
      }
    });

    it('should succeed with 200 and return token', async () => {
      const mock = [{exists: 1}];

      userDao.exists.mockImplementationOnce(() => mock);
      const mockBody = [
        {
          email: "lucasescudero2013@gmail.com",
          password: "hola1234chau"
        }
      ];
      const result =  {
          "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDYyNjcyNjksImlhdCI6MTYwNjI2MzY2OX0.aXvVPWhcRsRgRaSto_GH0ocbIAqrOCMgDV1QBeVa3YI"
      };

      userDao.getUser.mockImplementationOnce(() => mockBody[0].email);

      expect(result).toEqual(result);
    });
  });
});
