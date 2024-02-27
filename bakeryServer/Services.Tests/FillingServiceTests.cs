
namespace Services.Tests
{
    public class FillingServiceTests
    {
         private readonly FillingService srv = ArrangeService();
        [Fact]
        public async Task Create_ShouldReturnCorrectBool()
        {
            Filling validFilling = new()
            {
                Id = 123,
                Name = "test"
            };

            Filling invalidFilling_1 = new();
            Filling invalidFilling_2 = new() {Id = 1};


            Assert.True(await srv.Create(validFilling));
            Assert.False(await srv.Create(invalidFilling_1));
            Assert.False(await srv.Create(invalidFilling_2));
        }


        [Fact]
        public async Task ReadOne_ShouldReturnAnEntityOrNull()
        {
            Filling tempFilling = new() { Id = 1, Name = "Test" };
            await srv.Create(tempFilling);

            var inDatabaseFilling = await srv.ReadOne(1);
            var nonExistentFilling = await srv.ReadOne(2);

            Assert.Same(inDatabaseFilling, tempFilling);
            Assert.Null(nonExistentFilling);
        }

        private static FillingService ArrangeService()
        {
            DbContextOptionsBuilder<BakeryContext> builder = new();
            builder.UseInMemoryDatabase(databaseName: "Test");

            var context = new BakeryContext(options: builder.Options);

            FillingRepo repo = new(context);
            FillingService srv = new(repo);
            return srv;
        }
    }
}