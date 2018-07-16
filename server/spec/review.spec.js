const reviewCtrl = require('../review/controller');

describe('review controller', () => {
    let controller;
    describe('makeReview', () => {
        it('should return status 400 and error message if customer id is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    resto_id: '2',
                    review_body: 'its good food',
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reviewCtrl(null, null);

            // act
            controller.makeReview(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing customer id'
            });
        });

        it('should return status 400 and error message if restaurant id is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    customer_id: '1',
                    review_body: 'its good food',
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reviewCtrl(null, null);

            // act
            controller.makeReview(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing restaurant id'
            });
        });

        it('should return status 400 and error message if review body is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    customer_id: '1',
                    resto_id: '2',
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reviewCtrl(null, null);

            // act
            controller.makeReview(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing review'
            });
        });
    });

    describe('getReviews', () => {
        it('should return status 400 and error message if restaurant id is missing', () => {
            // arrange
            const mockReq = {
                params: {
                }
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reviewCtrl(null, null);

            // act
            controller.getReviews(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing restaurant id'
            });
        });
    });
});