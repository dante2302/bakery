namespace Repos.Tests
{
    public class ToppingRepoTests
    {
        private readonly ToppingRepo _toppingRepo;
        private readonly Mock<DbSet<Topping>> _mockDbSet;
        private readonly Mock<BakeryContext> _mockContextStruct;
        private readonly BakeryContext _mockContext;

        public ToppingRepoTests()
        {
            _mockDbSet = new Mock<DbSet<Topping>>();
            _mockContextStruct = new Mock<BakeryContext>();
            _mockContext = _mockContextStruct.Object;
            _mockContext.Toppings = _mockDbSet.Object;
            _toppingRepo = new ToppingRepo(_mockContext);
        }

        [Fact]
        public async Task Create_ToppingAddedToContext()
        {
            // Arrange
            var topping = new Topping { Id = 1, Name = "Sprinkles" };

            // Act
            await _toppingRepo.Create(topping);

            // Assert
            _mockDbSet.Verify(dbSet => dbSet.AddAsync(topping, default), Times.Once);
            _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
        }

        [Fact]
        public async Task ReadOne_ReturnsTopping()
        {
            // Arrange
            var expectedTopping = new Topping { Id = 1, Name = "Chocolate Chips" };
            _mockDbSet.Setup(m => m.FindAsync(expectedTopping.Id)).ReturnsAsync(expectedTopping);

            // Act
            var result = await _toppingRepo.ReadOne(expectedTopping.Id);

            // Assert
            Assert.Equal(expectedTopping, result);
        }

        [Fact]
        public async Task ReadAll_ReturnsAllToppings()
        {
            // Arrange
            var toppings = new List<Topping>
            {
                new Topping { Id = 1, Name = "Nuts" },
                new Topping { Id = 2, Name = "Whipped Cream" },
                new Topping { Id = 3, Name = "Caramel Drizzle" }
            }.AsQueryable();
            _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.Provider).Returns(toppings.Provider);
            _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.Expression).Returns(toppings.Expression);
            _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.ElementType).Returns(toppings.ElementType);
            _mockDbSet.As<IQueryable<Topping>>().Setup(m => m.GetEnumerator()).Returns(toppings.GetEnumerator());

            // Act
            var result = await _toppingRepo.ReadAll();

            // Assert
            Assert.Equal(toppings.ToList(), result);
        }

        [Fact]
        public async Task Update_ToppingUpdated()
        {
            // Arrange
            var existingTopping = new Topping { Id = 1, Name = "Caramel" };
            var updatedTopping = new Topping { Id = 1, Name = "Chocolate" };
            _mockDbSet.Setup(m => m.FindAsync(existingTopping.Id)).ReturnsAsync(existingTopping);

            // Act
            await _toppingRepo.Update(updatedTopping, existingTopping);

            // Assert
            Assert.Equal(updatedTopping.Name, existingTopping.Name);
            _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
        }

        [Fact]
        public async Task Delete_FillingDeleted()
        {
            // Arrange
            var toppingToDelete = new Topping { Id = 1, Name = "Chocolate" };
            _mockDbSet.Setup(m => m.FindAsync(toppingToDelete.Id)).ReturnsAsync(toppingToDelete);

            // Act
            await _toppingRepo.Delete(toppingToDelete);

            // Assert
            _mockDbSet.Verify(dbSet => dbSet.Remove(toppingToDelete), Times.Once);
            _mockContextStruct.Verify(context => context.SaveChangesAsync(default), Times.Once);
        }
    }
}