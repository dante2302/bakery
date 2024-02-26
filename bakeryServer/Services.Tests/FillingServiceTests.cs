
namespace Services.Tests
{
    public class FillingServiceTests
    {
        [Fact]
        public async Task Create_ShouldReturnCorrectBool()
        {
            DbContextOptionsBuilder<BakeryContext> builder = new();
            builder.UseInMemoryDatabase(databaseName: "Test");

            var context = new BakeryContext(configuration: null, options: builder.Options);

            FillingRepo repo = new(context);
            FillingService srv = new(repo);

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
    }
}