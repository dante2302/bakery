using Bogus;
using EntityFrameworkCoreMock;
using MockQueryable.Moq;

namespace Repos.Tests;
public class ToppingRepoTests
{
    private readonly ToppingRepo _toppingRepo;
    private readonly Mock<DbSet<Topping>> _mockDbSet;
    private readonly Mock<BakeryContext> _mockContext;
    private readonly List<Topping> tList;

    public ToppingRepoTests()
    {
        _mockContext = new DbContextMock<BakeryContext>();
        _mockDbSet = new DbSetMock<Topping>(null, (x, _) => x.Id);
        _toppingRepo = new ToppingRepo(_mockContext.Object);
        tList = GenerateData(10);
        var toppings = tList.BuildMock();
        _mockContext.Setup(x => x.Toppings).Returns(_mockDbSet.Object);
        _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.Provider).Returns(toppings.Provider);
        _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.Expression).Returns(toppings.Expression);
        _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.ElementType).Returns(toppings.ElementType);
        _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.GetEnumerator()).Returns(toppings.GetEnumerator());
    }

    [Fact]
    public async Task Create_ToppingAddedToContext()
    {
        // Arrange
        var data = GenerateData(1);

        // Act
        await _toppingRepo.Create(data[0]);

        // Assert
        _mockContext.Verify(x => x.AddAsync(data[0], default), Times.Once);
        _mockContext.Verify(x => x.SaveChangesAsync(default), Times.Once);

    }

    [Fact]
    public async Task ReadOne_ReturnsAToppingOrNull()
    {
        var result = await _toppingRepo.ReadAll();
    }

    [Fact]
    public async Task ReadAll_ReturnsCorrectCountAndToppings()
    {
        // Arrange
        var result = await _toppingRepo.ReadAll();
        Assert.Equal(11, result.Count);
    }

    // [Fact]
    // public async Task Update_ToppingUpdated()
    // {
    //     // Arrange
    //     var existingTopping = new Topping { Id = 1, Name = "Caramel" };
    //     var updatedTopping = new Topping { Id = 1, Name = "Chocolate" };
    //     await _toppingRepo.Create(existingTopping);

    //     // Act
    //     await _toppingRepo.Update(updatedTopping, existingTopping);

    //     // Assert
    //     Assert.Equal(updatedTopping.Name, existingTopping.Name);
    //     _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.AtMost(2));
    // }

    // [Fact]
    // public async Task Delete_FillingDeleted()
    // {
    //     // Arrange
    //     var toppingToDelete = new Topping { Id = 1, Name = "Chocolate" };
    //     _mockDbSet.Setup(m => m.FindAsync(toppingToDelete.Id)).ReturnsAsync(toppingToDelete);

    //     // Act
    //     await _toppingRepo.Delete(toppingToDelete);

    //     // Assert
    //     _mockDbSet.Verify(m => m.Remove(toppingToDelete), Times.Once);
    //     _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
    // }

    private List<Topping> GenerateData(int n)
    {
        var faker = new Faker<Topping>()
            .RuleFor(c => c.Name, f => "Chocolate")
            .RuleFor(c => c.Id, f => f.Random.Int(1, 1000));

        return faker.Generate(n);
    }
}