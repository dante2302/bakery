namespace BakeryServer.Tests.Services.Repositories
{
    public class ToppingRepoTests
    {
        private DbContextOptions<BakeryContext> CreateNewContextOptions()
        {
            // Create a fresh DbContextOptionsBuilder with an in-memory database
            return new DbContextOptionsBuilder<BakeryContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
        }

        [Fact]
        public async Task Create_AddsNewToppingToDatabase()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new ToppingRepo(context);
            var newTopping = GenerateData(1)[0];

            // Act
            await repository.Create(newTopping);

            // Assert
            var savedTopping = await context.Toppings.FindAsync(newTopping.Id);
            Assert.NotNull(savedTopping);
            Assert.Equal(newTopping.Name, savedTopping.Name);
        }

        [Fact]
        public async Task ReadOne_ReturnsToppingIfExists()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new ToppingRepo(context);
            var topping = GenerateData(1)[0];
            context.Toppings.Add(topping);
            await context.SaveChangesAsync();

            // Act
            var retrievedTopping = await repository.ReadOne(topping.Id);

            // Assert
            Assert.NotNull(retrievedTopping);
            Assert.Equal(topping.Name, retrievedTopping!.Name);
        }

        [Fact]
        public async Task ReadOne_ReturnsNullIfNotFound()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new ToppingRepo(context);

            // Act
            var retrievedTopping = await repository.ReadOne(999);

            // Assert
            Assert.Null(retrievedTopping);
        }

        [Fact]
        public async Task ReadAll_ReturnsListOfToppings()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new ToppingRepo(context);
            var toppings = GenerateData(2);
            context.Toppings.AddRange(toppings);
            await context.SaveChangesAsync();

            // Act
            var retrievedToppings = await repository.ReadAll();

            // Assert
            Assert.NotNull(retrievedToppings);
            Assert.Equal(2, retrievedToppings.Count);
        }

        [Fact]
        public async Task Update_UpdatesExistingTopping()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new ToppingRepo(context);
            var topping = GenerateData(1)[0];
            context.Toppings.Add(topping);
            await context.SaveChangesAsync();

            // Act
            var updatedTopping = GenerateData(1)[0];
            await repository.Update(updatedTopping, topping);

            // Assert
            var retrievedTopping = await context.Toppings.FindAsync(topping.Id);
            Assert.Equal(updatedTopping.Name, retrievedTopping.Name);
        }

        [Fact]
        public async Task Delete_RemovesToppingFromDatabase()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new ToppingRepo(context);
            var topping = GenerateData(1)[0];
            context.Toppings.Add(topping);
            await context.SaveChangesAsync();

            // Act
            await repository.Delete(topping);

            // Assert
            var retrievedTopping = await context.Toppings.FindAsync(1);
            Assert.Null(retrievedTopping);
        }

        private List<Topping> GenerateData(int n)
        {
            var faker = new Faker<Topping>()
                .RuleFor(x => x.Id, f => f.Random.Int(0, 1000000))
                .RuleFor(x => x.Name, f => f.Random.String());

            return faker.Generate(n);
        }
    }
}
