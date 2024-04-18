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

        // Similar setup for other test methods...
    }