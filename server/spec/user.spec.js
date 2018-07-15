const userCtrl = require('../user/controller');

describe('user controller', () => {
    let controller;
    describe('newUser', () => {
        it('should return status 400 and error message if email is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.newUser(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing email'
            });
        });

        it('should return status 400 and error message if password is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    name: 'mark',
                    type: 'customer'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.newUser(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing password'
            });
        });

        it('should return status 400 and error message if name is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    type: 'customer'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.newUser(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing name'
            });
        });

        it('should return status 400 and error message if type is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.newUser(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'Invalid user type'
            });
        });

        it('should call repo.checkEmails with email in request body', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            const mockRepo = jasmine.createSpyObj('mockRepo', ['checkEmails']);
            mockRepo.checkEmails.and.callFake(() => {
                return Promise.resolve();
            })
            controller = userCtrl(mockRepo, null);

            // act
            controller.newUser(mockReq, mockRes);

            // assert
            expect(mockRepo.checkEmails).toHaveBeenCalledWith(mockReq.body.email);
        });

        // fit('should return status 400 and error message if email is in use', (done) => {
        //     // arrange
        //     const mockReq = {
        //         body: {
        //             email: 'mark@mark.com',
        //             password: '1234',
        //             name: 'mark',
        //             type: 'customer'
        //         }
        //     };

        //     const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
        //     const mockRepo = jasmine.createSpyObj('mockRepo', ['checkEmails']);
        //     mockRepo.checkEmails.and.callFake(() => {
        //         return Promise.resolve([1]);
        //     });

        //     controller = userCtrl(mockRepo, null);

        //     // act
        //     controller.newUser(mockReq, mockRes);

        //     // assert
        //     expect(mockRes.status).toHaveBeenCalledWith(400);
        //     expect(mockRes.send).toHaveBeenCalledWith({
        //         error: 'Email in use'
        //     });
        //     done();
        // });

        it('should return status 200 and session.user if success', (done) => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                },
                session: {
                    user: null
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            const mockRepo = jasmine.createSpyObj('mockRepo', ['checkEmails', 'newUser']);
            mockRepo.checkEmails.and.callFake(() => {
                return Promise.resolve([null]);
            });
            mockRepo.newUser.and.callFake(() => {
                return Promise.resolve({
                    insertId: 1
                });
            });
            const mockBcrypt = jasmine.createSpyObj('mockBcrypt', ['genSalt', 'hash']);
            mockBcrypt.genSalt.and.callFake((saltRounds, callback) => {
                return callback(null, 'anysalt');
            });
            mockBcrypt.hash.and.callFake((password, salt, callback) => {
                return callback(null, 'anyhash');
            });

            mockRes.send.and.callFake(() => {
                // assert
                const mockNewUser = {
                    userID: 1,
                    username: 'mark',
                    usertype: 'c'
                };
                expect(mockReq.session.user).toEqual(mockNewUser)
                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.send).toHaveBeenCalledWith(mockNewUser);
                done();
            });

            controller = userCtrl(mockRepo, mockBcrypt);

            // act
            controller.newUser(mockReq, mockRes);
        });
    });

    describe('setRestoID', () => {
        it('should return status 400 and error message if user session is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                },
                session: {
                    user: {userID: null}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.setRestoID(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'No user ID'
            });
        });
    });

    describe('logout', () => {
        it('should return status 400 and error message if user session is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                },
                session: {
                    user: {userID: null}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.logout(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: "You are not logged in"
            });
        });

        it('should return status 200 and message Logged out if success', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                },
                session: {
                    user: {userID: '111'}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);
            // mockRes.destroy.callFake(() =>{
            //     return null;
            // })

            // act
            controller.logout(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith({
                message: "Logged out"
            });
        });
    });

    describe('checkSession', () => {
        it('should return status 200 and user session if success', () => {
            // arrange
            const mockReq = {
                body: {
                    email: 'mark.aldecimo@saperium.com',
                    password: '1234',
                    name: 'mark',
                    type: 'customer'
                },
                session: {
                    user: {userID: 1}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = userCtrl(null, null);

            // act
            controller.checkSession(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith({
                user: mockReq.session
            });
        });
    });
    
});