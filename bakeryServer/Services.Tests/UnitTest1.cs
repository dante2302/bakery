namespace Services.Tests
{
    public class UnitTest1
    {
        [Fact]
        public async Task asd()
        {
            var dbOptionsBuilder = new DbContextOptionsBuilder<BakeryContext>().UseInMemoryDatabase(databaseName: "Test");

            using (var db = new BakeryContext(null, dbOptionsBuilder.Options))
            {
                var repo = new FillingRepo(db);
                var filling = new Filling()
                {
                    Id = 1,
                    Name = "TestFilling"
                };
                
                bool result = await repo.Create(filling);

                Assert.True(result);
            }
        }
    }
}