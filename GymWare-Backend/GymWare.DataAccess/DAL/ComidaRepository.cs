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
    public class ComidaRepository : BaseRepository
    {
        public List<Comida> GetAll()
        {
            return _db.Comidas.ToList();
        }

        public Comida GetOne(int id)
        {
            return _db.Comidas.Find(id);
        }

        public bool Update(int id, Comida comida)
        {
            Comida co = _db.Comidas.Find(id);
            co.Nombre = comida.Nombre == null ? co.Nombre : comida.Nombre;
            co.Descripcion = comida.Descripcion == null ? co.Descripcion : comida.Descripcion;
            co.Calorias = comida.Calorias == null ? co.Calorias : comida.Calorias;
            
            try
            {
                _db.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComidaExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Insert(Comida comida)
        {
            _db.Comidas.Add(comida);
            _db.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            if (_db.Comidas.Find(id) == null)
            {
                return false;
            }
            else
            {
                _db.Comidas.Remove(_db.Comidas.Find(id));
                _db.SaveChanges();
                return true;
            }
        }

        private bool ComidaExists(int id)
        {
            return _db.Comidas.Count(e => e.ComidaId == id) > 0;
        }
    }
}
