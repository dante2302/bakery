namespace BakeryServer.Tests.Services.Repositories
{
    public class FillingRepoTests
    {
        private DbContextOptions<BakeryContext> CreateNewContextOptions()
        {
            // Create a fresh DbContextOptionsBuilder with an in-memory database
            return new DbContextOptionsBuilder<BakeryContext>()
                .UseInMemoryDatabase(databaseName: "TestDbFillings")
                .Options;
        }

        [Fact]
        public async Task Create_AddsNewFillingToDatabase()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new FillingRepo(context);
            var newFilling = GenerateData(1)[0];

            // Act
            await repository.Create(newFilling);

            // Assert
            var savedFilling = await context.Fillings.FindAsync(newFilling.Id);
            Assert.NotNull(savedFilling);
            Assert.Equal(newFilling.Name, savedFilling.Name);
        }

        [Fact]
        public async Task ReadOne_ReturnsFillingIfExists()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new FillingRepo(context);
            var filling = GenerateData(1)[0];
            context.Fillings.Add(filling);
            await context.SaveChangesAsync();

            // Act
            var retrievedFilling = await repository.ReadOne(filling.Id);

            // Assert
            Assert.NotNull(retrievedFilling);
            Assert.Equal(filling.Name, retrievedFilling!.Name);
        }

        [Fact]
        public async Task ReadOne_ReturnsNullIfNotFound()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new FillingRepo(context);

            // Act
            var retrievedFilling = await repository.ReadOne(999);

            // Assert
            Assert.Null(retrievedFilling);
        }

        [Fact]
        public async Task ReadAll_ReturnsListOfFillings()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new FillingRepo(context);
            var fillings = GenerateData(3);
            context.Fillings.AddRange(fillings);
            await context.SaveChangesAsync();

            // Act
            var retrievedFillings = await repository.ReadAll();

            // Assert
            Assert.NotNull(retrievedFillings);
            Assert.Equal(3, retrievedFillings.Count);
        }

        [Fact]
        public async Task Update_UpdatesExistingFilling()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new FillingRepo(context);
            var filling = GenerateData(1)[0];
            context.Fillings.Add(filling);
            await context.SaveChangesAsync();

            // Act
            var updatedFilling = GenerateData(1)[0];
            await repository.Update(updatedFilling, filling);

            // Assert
            var retrievedFilling = await context.Fillings.FindAsync(filling.Id);
            Assert.Equal(updatedFilling.Name, retrievedFilling.Name);
        }

        [Fact]
        public async Task Delete_RemovesFillingFromDatabase()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new FillingRepo(context);
            var filling = GenerateData(1)[0];
            context.Fillings.Add(filling);
            await context.SaveChangesAsync();

            // Act
            await repository.Delete(filling);

            // Assert
            var retrievedFilling = await context.Fillings.FindAsync(1);
            Assert.Null(retrievedFilling);
        }

        private List<Filling> GenerateData(int n)
        {
            var faker = new Faker<Filling>()
                .RuleFor(x => x.Id, f => f.Random.Int(0, 1000000))
                .RuleFor(x => x.Name, f => f.Random.String());

            return faker.Generate(n);
        }
    }
}
