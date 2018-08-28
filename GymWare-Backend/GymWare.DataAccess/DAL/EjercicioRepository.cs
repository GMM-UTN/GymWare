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
    public class EjercicioRepository : BaseRepository
    {     
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
            Ejercicio ej = _db.Ejercicios.Find(id);
            ej.Descripcion = ejercicio.Descripcion == null ? ej.Descripcion : ejercicio.Descripcion;
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
            if(_db.Ejercicios.Find(id) == null)
            {
                return false;
            }
            else
            {
                _db.Ejercicios.Remove(_db.Ejercicios.Find(id));
                _db.SaveChanges();
                return true;
            }       
        }

        private bool EjercicioExists(int id)
        {
            return _db.Ejercicios.Count(e => e.EjercicioId == id) > 0;
        }

        public List<Ejercicio> findByRutina(Rutina rutina)
        {
            var query = from rutinaEjercicio in _db.RutinaEjercicio
                        join ejercicio in _db.Ejercicios
                            on rutinaEjercicio.Ejercicio.EjercicioId equals ejercicio.EjercicioId
                        where rutinaEjercicio.Rutina.RutinaId == rutina.RutinaId
                        select ejercicio;
            return query.ToList();
        }
    }
}
