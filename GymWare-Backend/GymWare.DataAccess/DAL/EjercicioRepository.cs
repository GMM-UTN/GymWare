using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.DataAccess.DAL
{
    public class EjercicioRepository
    {
        private GymWareContext _db = new GymWareContext();

        public List<Ejercicio> GetAll()
        {
            return _db.Ejercicios.ToList();
        }

        public Ejercicio GetOne(int id)
        {
            return _db.Ejercicios.Find(id);
        }

        public bool Update(int id, Ejercicio ejercicio)
        {
            _db.Entry(ejercicio).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EjercicioExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Insert(Ejercicio ejercicio)
        {
            _db.Ejercicios.Add(ejercicio);
            _db.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            Ejercicio ejercicio = _db.Ejercicios.Find(id);

            if (ejercicio == null)
            {
                return false;
            }
            else
            {
                _db.Ejercicios.Remove(ejercicio);
                _db.SaveChanges();
                return true;
            }            
        }

        private bool EjercicioExists(int id)
        {
            return _db.Ejercicios.Count(e => e.EjercicioId == id) > 0;
        }
    }
}
