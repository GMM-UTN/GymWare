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
    public class DietaRepository : BaseRepository
    {
        public Dieta Update(int id, Dieta dieta)
        {
            Dieta di = _db.Dietas.Find(id);
            di.Nombre = dieta.Nombre == null ? di.Nombre : dieta.Nombre;
            di.Descripcion = dieta.Descripcion == null ? di.Descripcion : dieta.Descripcion;
            try
            {
                _db.SaveChanges();
                return di;
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public Dieta Insert(Dieta dieta)
        {
            _db.Dietas.Add(dieta);
            _db.SaveChanges();
            return dieta;
        }

        public bool Delete(int id)
        {
            if (_db.Dietas.Find(id) == null)
            {
                return false;
            }
            else
            {
                _db.Dietas.Remove(_db.Dietas.Find(id));
                _db.SaveChanges();
                return true;
            }
        }
    }
}
