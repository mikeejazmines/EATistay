const reservationCtrl = require('../reservation/controller');

describe('reservation controller', () => {
    let controller;
    describe('newReservation', () => {
        it('should return status 400 and error message if customer id is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    resto_id: '1',
                    resdate: '2018-05-04 14:00:08',
                },
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reservationCtrl(null, null);

            // act
            controller.newReservation(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing customer id'
            });
        });

        it('should return status 400 and error message if customer id is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    resto_id: '1',
                    resdate: '2018-05-04 14:00:08',
                },
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reservationCtrl(null, null);

            // act
            controller.newReservation(mockReq, mockRes);

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
                    resdate: '2018-05-04 14:00:08',
                },
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reservationCtrl(null, null);

            // act
            controller.newReservation(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing restaurant id'
            });
        });

        it('should return status 400 and error message if date is missing', () => {
            // arrange
            const mockReq = {
                body: {
                    customer_id: '1',
                    resto_id: '1',
                },
            };

            const mockRes = jasmine.createSpyObj('mockRes', ['status', 'send']);
            controller = reservationCtrl(null, null);

            // act
            controller.newReservation(mockReq, mockRes);

            // assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({
                error: 'missing date'
            });
        });
    });
});