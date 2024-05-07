
using Exceptions;
namespace Services.Tests
{
    public class FillingServiceTests
    {
        private readonly FillingService srv = ArrangeService();

        [Fact]
        public async Task ReadOne_ShouldReturnAnEntityOrNull()
        {
            Filling tempFilling = new() { Id = 1, Name = "Test" };
            await srv.Create(tempFilling);

            var inDatabaseFilling = await srv.ReadOne(1);
            int nonExistentId = 0;

            Assert.Same(inDatabaseFilling, tempFilling);
            await Assert.ThrowsAsync<NotFoundException>(async () =>
                await srv.ReadOne(nonExistentId));
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
