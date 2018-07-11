import { RestaurantOwnerModule } from './restaurant-owner.module';

describe('RestaurantOwnerModule', () => {
  let restaurantOwnerModule: RestaurantOwnerModule;

  beforeEach(() => {
    restaurantOwnerModule = new RestaurantOwnerModule();
  });

  it('should create an instance', () => {
    expect(restaurantOwnerModule).toBeTruthy();
  });
});
