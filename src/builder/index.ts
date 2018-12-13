class UserContext {
  constructor(
    public isAuthenticated: boolean,
    public hasOrganization: boolean,
    public customerRegionId: Number,
    public discountCodes: string[], 
    public organizationId: Number
  ) {
    
  }

  public toString(): String {
    return `
      auth: ${this.isAuthenticated}
      org: ${this.organizationId}
      discounts: ${this.discountCodes.join(', ')}
      customer region: ${this.customerRegionId}
    `
  }
}

class UserContextBuilder {
  
  private isAuthenticated: boolean
  private hasOrganization: boolean
  private customerRegionId: Number
  private discountCodes: string[] = []
  private organizationId: Number

  public whoIsAuthenticated(): UserContextBuilder {
    this.isAuthenticated = true
    return this
  }

  public withOrganization(orgId: Number): UserContextBuilder {
    this.hasOrganization = true
    this.organizationId = orgId
    return this
  }

  public inCustomerRegion(customerRegion: Number): UserContextBuilder {
    this.customerRegionId = customerRegion
    return this
  }

  public addDiscount(discountCode: string): UserContextBuilder {
    this.discountCodes.push(discountCode)
    return this
  }

  public build(): UserContext {
    return new UserContext(
      this.isAuthenticated,
      this.hasOrganization,
      this.customerRegionId,
      this.discountCodes,
      this.organizationId
    )
  }
}

// benefits

// 1. make construction code more readable
const user = new UserContextBuilder()
  .whoIsAuthenticated()
  .withOrganization(123)
  .inCustomerRegion(2)
  .addDiscount('FALL2019')
  .build()

console.log(user.toString())

// 2. use builders to make many objects with the same properties

const unAuthedUserBuilder = new UserContextBuilder()
  .inCustomerRegion(2)

const unAuth1 = unAuthedUserBuilder.build()
const unAuth2 = unAuthedUserBuilder.build()

const typicalDiscountBuilder = new UserContextBuilder()
  .whoIsAuthenticated()
  .addDiscount('BIRTHDAY')

const typicalDiscountUser = typicalDiscountBuilder.build()
const typicalDiscountUser2 = typicalDiscountBuilder.build()
