
namespace Services.Tests;

public class OrderDTOMapperTests
{
    private readonly Mock<IEntityService<Filling>> _mockFillingService;
    private readonly Mock<IEntityService<Topping>> _mockToppingService;
    private readonly Mock<IEntityService<FoodType>> _mockFoodTypeService;
    private readonly Mock<IEntityService<User>> _mockUserService;
    private readonly Mock<IEntityService<Base>> _mockBaseService;
    private readonly OrderDTOMapper _orderDTOMapper;

    public OrderDTOMapperTests()
    {
        _mockFillingService = new Mock<IEntityService<Filling>>();
        _mockToppingService = new Mock<IEntityService<Topping>>();
        _mockFoodTypeService = new Mock<IEntityService<FoodType>>();
        _mockUserService = new Mock<IEntityService<User>>();
        _mockBaseService = new Mock<IEntityService<Base>>();

        _orderDTOMapper = new OrderDTOMapper(
            fs: _mockFillingService.Object,
            ts: _mockToppingService.Object,
            fts: _mockFoodTypeService.Object,
            us: _mockUserService.Object,
            bs: _mockBaseService.Object
        );
    }

    [Fact]
    public async Task MapDTO_ValidOrder_ReturnsOrderDTO()
    {
        // Arrange
        var order = new Order
        {
            FoodId = 1,
            Fillings = [ 1, 2 ],
            Toppings = [ 3, 4 ],
            UserId = 1,
            ContainsLettering = false,
            IsCompleted = false,
            Date = new DateTime()
        };

        var foodType = new FoodType { Id = 1, Name = "Cake", Fillings = [], Toppings = [], Bases = []};
        var filling1 = new Filling { Id = 1, Name = "Chocolate" };
        var filling2 = new Filling { Id = 2, Name = "Vanilla" };
        var topping3 = new Topping { Id = 3, Name = "Sprinkles" };
        var topping4 = new Topping { Id = 4, Name = "Nuts" };
        var user = new User
        {
            Id = 1,
            FirstName = "John",
            LastName = "Doe",
            PhoneNumber = "0888"
        };

        _mockFoodTypeService.Setup(m => m.ReadOne(order.FoodId)).ReturnsAsync(foodType);
        _mockFillingService.Setup(m => m.ReadOne(1)).ReturnsAsync(filling1);
        _mockFillingService.Setup(m => m.ReadOne(2)).ReturnsAsync(filling2);
        _mockToppingService.Setup(m => m.ReadOne(3)).ReturnsAsync(topping3);
        _mockToppingService.Setup(m => m.ReadOne(4)).ReturnsAsync(topping4);
        _mockUserService.Setup(m => m.ReadOne(order.UserId)).ReturnsAsync(user);

        // Act
        var result = await _orderDTOMapper.MapDTO(order);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(foodType.Name, result.Food.Name);
        Assert.Equal(["Chocolate", "Vanilla"], result.FillingNames);
        Assert.Equal(["Sprinkles", "Nuts"], result.ToppingNames);
        Assert.Equal(user.FirstName, result.UserData.FirstName);
        Assert.Equal(user.LastName, result.UserData.LastName);

    }

    [Fact]
    public async Task MapDTO_NonExistentUser_ThrowsException()
    {
        // Arrange
        var order = new Order
        {
            FoodId = 1,
            ContainsLettering = false,
            Date =  new DateTime(),
            UserId = 999,
            IsCompleted = false
        }; // Non-existent user id

        _mockUserService.Setup(m => m.ReadOne(order.UserId)).ReturnsAsync((User)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => _orderDTOMapper.MapDTO(order));
    }

    [Fact]
    public async Task MapToppingNames_ToppingNoLongerExists_ThrowsException()
    {
        // Arrange
        var order = new Order
        {
            FoodId = 1,
            ContainsLettering = false,
            Date =  new DateTime(),
            UserId = 1,
            Toppings = [ 1, 2 ],
            IsCompleted = false
        };
        _mockToppingService.Setup(m => m.ReadOne(1)).ReturnsAsync((Topping)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => _orderDTOMapper.MapDTO(order));
    }

    [Fact]
    public async Task MapFillingNames_FillingNoLongerExists_ThrowsException()
    {
        // Arrange
        var order = new Order
        {
            FoodId = 1,
            ContainsLettering = false,
            Date =  new DateTime(),
            UserId = 1,
            Fillings = [ 1, 2 ],
            IsCompleted = false
        };
        _mockFillingService.Setup(m => m.ReadOne(2)).ReturnsAsync((Filling)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => _orderDTOMapper.MapDTO(order));
    }
}