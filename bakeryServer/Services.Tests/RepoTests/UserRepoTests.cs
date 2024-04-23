namespace BakeryServer.Tests.Services.Repositories
{
    public class UserRepoTests
    {
        private DbContextOptions<BakeryContext> CreateNewContextOptions()
        {
            // Create a fresh DbContextOptionsBuilder with an in-memory database
            return new DbContextOptionsBuilder<BakeryContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
        }

        [Fact]
        public async Task Create_AddsNewUserToDatabase()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new UserRepo(context);
            var newUser = GenerateData(1)[0];

            // Act
            await repository.Create(newUser);

            // Assert
            var savedUser = await context.Users.FindAsync(newUser.Id);
            Assert.NotNull(savedUser);
        }

        [Fact]
        public async Task ReadOne_ReturnsUserIfExists()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new UserRepo(context);
            var user = GenerateData(1)[0];
            context.Users.Add(user);
            await context.SaveChangesAsync();

            // Act
            var retrievedUser = await repository.ReadOne(user.Id);

            // Assert
            Assert.NotNull(retrievedUser);
            Assert.Equal(user.FirstName, retrievedUser!.FirstName);
            Assert.Equal(user.LastName, retrievedUser!.LastName);
            Assert.Equal(user.PhoneNumber, retrievedUser!.PhoneNumber);
        }

        [Fact]
        public async Task ReadOne_ReturnsNullIfNotFound()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new UserRepo(context);

            // Act
            var retrievedUser = await repository.ReadOne(999);

            // Assert
            Assert.Null(retrievedUser);
        }

        [Fact]
        public async Task ReadAll_ReturnsListOfUsers()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new UserRepo(context);
            var users = GenerateData(2);
            context.Users.AddRange(users);
            await context.SaveChangesAsync();

            // Act
            var retrievedUsers = await repository.ReadAll();

            // Assert
            Assert.NotNull(retrievedUsers);
            Assert.Equal(2, retrievedUsers.Count);
        }

        [Fact]
        public async Task Update_UpdatesExistingTopping()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new UserRepo(context);
            var user = GenerateData(1)[0];
            context.Users.Add(user);
            await context.SaveChangesAsync();

            // Act
            var updatedUser = GenerateData(1)[0];
            await repository.Update(updatedUser, user);

            // Assert
            var retrievedUser = await context.Users.FindAsync(user.Id);

            Assert.Equal(updatedUser.FirstName, retrievedUser!.FirstName);
            Assert.Equal(updatedUser.LastName, retrievedUser!.LastName);
            Assert.Equal(updatedUser.PhoneNumber, retrievedUser!.PhoneNumber);
        }

        [Fact]
        public async Task Delete_RemovesToppingFromDatabase()
        {
            // Arrange
            var options = CreateNewContextOptions();
            using var context = new BakeryContext(options);
            var repository = new UserRepo(context);
            var user = GenerateData(1)[0];
            context.Users.Add(user);
            await context.SaveChangesAsync();

            // Act
            await repository.Delete(user);

            // Assert
            var retrievedUser = await context.Users.FindAsync(1);
            Assert.Null(retrievedUser);
        }

        private List<User> GenerateData(int n)
        {
            var faker = new Faker<User>()
                .RuleFor(x => x.Id, f => f.Random.Int(0, 1000000))
                .RuleFor(x => x.FirstName, f => f.Person.FirstName)
                .RuleFor(x => x.LastName, f => f.Person.LastName)
                .RuleFor(x => x.Email, f => f.Person.Email)
                .RuleFor(x => x.PhoneNumber, f => f.Person.Phone);

            return faker.Generate(n);
        }
    }
}

