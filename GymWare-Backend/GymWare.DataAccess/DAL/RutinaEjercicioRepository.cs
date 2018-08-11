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
    public class RutinaEjercicioRepository : BaseRepository
    {
        public List<RutinaEjercicio> GetAll()
        {
            return _db.RutinaEjercicio.ToList();
        }

        public RutinaEjercicio GetOne(int id)
        {
            return _db.RutinaEjercicio.Find(id);
        }

        public bool Update(int idRutina, List<RutinaEjercicio> rutinaEjercicio)
        {
            _db.RutinaEjercicio.RemoveRange(_db.RutinaEjercicio.Where(x => x.Rutina.RutinaId == idRutina));
            _db.SaveChanges();
            foreach (var item in rutinaEjercicio)
            {
                RutinaEjercicio re = new RutinaEjercicio();
                re.Rutina = item.Rutina;
                re.Ejercicio = item.Ejercicio;
                re.Repeticiones = item.Repeticiones;
                re.Series = item.Series;
                _db.RutinaEjercicio.Add(re);
            }
            try
            {
                _db.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        //public bool Insert(Ejercicio ejercicio)
        //{
        //    _db.Ejercicios.Add(ejercicio);
        //    _db.SaveChanges();
        //    return true;
        //}

        //public bool Delete(int id)
        //{
        //    //Ejercicio ejercicio = _db.Ejercicios.Find(id);
        //    if (_db.RutinaEjercicio.Find(id) == null)
        //    {
        //        return false;
        //    }
        //    else
        //    {
        //        _db.RutinaEjercicio.Remove(_db.RutinaEjercicio.Find(id));
        //        _db.SaveChanges();
        //        return true;
        //    }
        //}

        //private bool EjercicioExists(int id)
        //{
        //    return _db.Ejercicios.Count(e => e.EjercicioId == id) > 0;
        //}
    }
}