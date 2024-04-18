namespace Repos.Tests;
public class FillingRepoTests
{
    private readonly FillingRepo _fillingRepo;
    private readonly Mock<DbSet<Filling>> _mockDbSet;
    private readonly Mock<BakeryContext> _mockContextStruct;
    private readonly BakeryContext _mockContext;

    public FillingRepoTests()
    {
        _mockDbSet = new Mock<DbSet<Filling>>();
        _mockContextStruct = new Mock<BakeryContext>();
        _mockContext = _mockContextStruct.Object;
        _mockContext.Fillings = _mockDbSet.Object;
        _fillingRepo = new FillingRepo(_mockContext);
    }

    [Fact]
    public async Task Create_FillingAddedToContext()
    {
        // Arrange
        var filling = new Filling { Id = 1, Name = "Chocolate" };

        // Act
        await _fillingRepo.Create(filling);

        // Assert
        _mockDbSet.Verify(dbSet => dbSet.AddAsync(filling, default), Times.Once);
        _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
    }
    [Fact]
    public async Task ReadOne_ReturnsFilling()
    {
        // Arrange
        var expectedFilling = new Filling { Id = 1, Name = "Strawberry" };
        _mockDbSet.Setup(m => m.FindAsync(expectedFilling.Id)).ReturnsAsync(expectedFilling);

        // Act
        var result = await _fillingRepo.ReadOne(expectedFilling.Id);

        // Assert
        Assert.Equal(expectedFilling, result);
    }

    [Fact]
    public async Task ReadAll_ReturnsAllFillings()
    {
        // Arrange
        var fillings = new List<Filling>
            {
                new Filling { Id = 1, Name = "Chocolate" },
                new Filling { Id = 2, Name = "Vanilla" },
                new Filling { Id = 3, Name = "Strawberry" }
            }.AsQueryable();
        _mockDbSet.As<IQueryable<Filling>>().Setup(m => m.Provider).Returns(fillings.Provider);
        _mockDbSet.As<IQueryable<Filling>>().Setup(m => m.Expression).Returns(fillings.Expression);
        _mockDbSet.As<IQueryable<Filling>>().Setup(m => m.ElementType).Returns(fillings.ElementType);
        _mockDbSet.As<IQueryable<Filling>>().Setup(m => m.GetEnumerator()).Returns(fillings.GetEnumerator());

        // Act
        var result = await _fillingRepo.ReadAll();

        // Assert
        Assert.Equal(fillings.ToList(), result);
    }

    [Fact]
    public async Task Update_FillingUpdated()
    {
        // Arrange
        var existingFilling = new Filling { Id = 1, Name = "Chocolate" };
        var updatedFilling = new Filling { Id = 1, Name = "Strawberry" };
        _mockDbSet.Setup(m => m.FindAsync(existingFilling.Id)).ReturnsAsync(existingFilling);

        // Act
        await _fillingRepo.Update(updatedFilling, existingFilling);

        // Assert
        Assert.Equal(updatedFilling.Name, existingFilling.Name);
        _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
    }

    [Fact]
    public async Task Delete_FillingDeleted()
    {
        // Arrange
        var fillingToDelete = new Filling { Id = 1, Name = "Chocolate" };
        _mockDbSet.Setup(m => m.FindAsync(fillingToDelete.Id)).ReturnsAsync(fillingToDelete);

        // Act
        await _fillingRepo.Delete(fillingToDelete);

        // Assert
        _mockDbSet.Verify(dbSet => dbSet.Remove(fillingToDelete), Times.Once);
        _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
    }
}