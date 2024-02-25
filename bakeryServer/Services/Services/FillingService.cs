﻿using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using bakeryServer.Services.Repositories;

namespace bakeryServer.Services
{
    public class FillingService(FillingRepo repo)
    {
        private readonly FillingRepo _repo = repo;

        public async Task<bool> Create(Filling filling)
        {
            return await _repo.Create(filling);
        }

        public async Task<Filling> ReadOne(int id)
        {
            return await _repo.ReadOne(id);  
        }

        public async Task<IEnumerable<Filling?>> ReadAll()
        {
            return await _repo.ReadAll();
        }

        public async Task<bool> Update(Filling newFilling)
        {
            return await _repo.Update(newFilling);
        }

        public async Task<bool> Delete(int id)
        {
            Filling fillingForDeletion = await ReadOne(id);
            return await _repo.Delete(fillingForDeletion);
        }
    }
}