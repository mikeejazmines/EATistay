const restaurantCtrl = require('../restaurant/controller');

describe('restaurant controller', () => {
    let controller;
    describe('newRestaurant', () => {
        it('should return status 400 and error message if name is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    description: 'good korean fast food',
                    location: 'BGC',
                },
                session: {
                    user: {userID: '15'}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.newRestaurant(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing name'
            });
        });

        it('should return status 400 and error message if description is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    name: 'bchon',
                    location: 'BGC',
                },
                session: {
                    user: {userID: '15'}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.newRestaurant(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing description'
            });
        });

        it('should return status 400 and error message if location is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    name: 'bchon',
                    description: 'good korean fast food',
                },
                session: {
                    user: {userID: '15'}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.newRestaurant(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing location'
            });
        });

        it('should return status 400 and error message if userID is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    name: 'bchon',
                    description: 'good korean fast food',
                    location: 'BGC',
                },
                session: {
                    user: {}
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.newRestaurant(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing owner id'
            });
        });
    });

    describe('getRestaurant', () => {
        it('should return status 400 and error message if resto id is missing', () => {
            // arrange
            const mockReq = {
                params: {
                },
                session: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.getRestaurant(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing restaurant id'
            });
        });
    });

    describe('editDescription', () => {
        it('should return status 400 and error message if resto id is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    description: 'good'
                },
                session: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.editDescription(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'You have no restaurant. Login as an owner to add a restaurant'
            });
        });

        it('should return status 400 and error message if description is missing', () => {
            // arrange
            const mockReq = {
                body: {
                },
                session: {
                    restoid: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.editDescription(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing description'
            });
        });
    });

    describe('editLimit', () => {
        it('should return status 400 and error message if limit is missing', () => {
            // arrange
            const mockReq = {
                body: {
                },
                session: {
                    restoid: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.editLimit(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'No value for limit'
            });
        });

        it('should return status 400 and error message if restoid is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    limit: '1'
                },
                session: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = restaurantCtrl(null, null);

            // act
            controller.editLimit(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'You have no restaurant. Login as an owner to add a restaurant'
            });
        });
    });
});