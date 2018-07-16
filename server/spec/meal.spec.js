const mealCtrl = require('../meal/controller');

describe('meal controller', () => {
    let controller;
    describe('addMeal', () => {
        it('should return status 400 and error message if meal_name is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    meal_description: 'mark',
                    meal_price: 'customer',
                },
                session: {
                    restoid: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.addMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing name'
            });
        });

        it('should return status 400 and error message if meal_description is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    meal_name: 'chicken',
                    meal_price: 'customer',
                },
                session: {
                    restoid: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.addMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing description'
            });
        });

        it('should return status 400 and error message if meal_price is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    meal_name: 'chicken',
                    meal_description: 'mark',
                },
                session: {
                    restoid: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.addMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing price'
            });
        });

        it('should return status 400 and error message if restoid is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    meal_name: 'chicken',
                    meal_description: 'mark',
                    meal_price: 'customer',
                },
                session: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.addMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'You have no restaurant. Login as an owner to add a restaurant'
            });
        });
    });

    describe('editMeal', () => {
        it('should return status 400 and error message if name is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    description: 'yummy!',
                    price: '100',
                    meal_id: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.editMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing name'
            });
        });

        it('should return status 400 and error message if price is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    name: 'chicken',
                    description: 'yummy!',
                    meal_id: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.editMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing price'
            });
        });

        it('should return status 400 and error message if meal_id is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    name: 'chicken',
                    description: 'yummy!',
                    price: '100'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.editMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing meal id'
            });
        });

        it('should return status 400 and error message if description is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    name: 'chicken',
                    price: '100',
                    meal_id: '1'
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.editMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing description'
            });
        });
    });

    describe('editMeal', () => {
        it('should return status 400 and error message if id is missing', () => {
            // arrange
            const mockReq = {
                params: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.deleteMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing meal id'
            });
        });
    });

    describe('getMeals', () => {
        it('should return status 400 and error message if id is missing', () => {
            // arrange
            const mockReq = {
                params: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.getMeals(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing restaurant id'
            });
        });
    });

    describe('getMeal', () => {
        it('should return status 400 and error message if id is missing', () => {
            // arrange
            const mockReq = {
                params: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = mealCtrl(null, null);

            // act
            controller.getMeal(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing meal id'
            });
        });
    });
});