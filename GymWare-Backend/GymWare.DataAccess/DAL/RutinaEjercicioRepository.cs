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

        public bool Update(Rutina rutina, List<RutinaEjercicio> rutinaEjercicio)
        {
            _db.RutinaEjercicio.RemoveRange(_db.RutinaEjercicio.Where(x => x.Rutina.RutinaId == rutina.RutinaId));
            _db.SaveChanges();
            foreach (var item in rutinaEjercicio)
            {
                RutinaEjercicio re = new RutinaEjercicio();
                Ejercicio ej = _db.Ejercicios.Find(item.Ejercicio.EjercicioId);
                Rutina ru = _db.Rutinas.Find(rutina.RutinaId);                
                re.Ejercicio = ej;
                re.Rutina = ru;
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

        public bool Insert(Rutina rutina, List<RutinaEjercicio> rutinaEjercicio)
        {
            foreach (var item in rutinaEjercicio)
            {
                Ejercicio ej = _db.Ejercicios.Find(item.Ejercicio.EjercicioId);
                Rutina ru = _db.Rutinas.Find(rutina.RutinaId);
                item.Ejercicio = ej;
                item.Rutina = ru;
                _db.RutinaEjercicio.Add(item);
                _db.SaveChanges();
            }            
            return true;
        }

        public bool Delete(int id)
        {
            _db.RutinaEjercicio.RemoveRange(_db.RutinaEjercicio.Where(x => x.Rutina.RutinaId == id));
            _db.SaveChanges();
            return true;
        }
    }
}