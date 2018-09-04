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

        public string Insert(Ejercicio ejercicio)
        {
            Ejercicio ej = _db.Ejercicios.Where(x => x.Descripcion.ToLower() == ejercicio.Descripcion.ToLower()).FirstOrDefault();
            if (ej == null)
            {
                try
                {
                    _db.Ejercicios.Add(ejercicio);
                    _db.SaveChanges();
                    return "Ejercicio agregado correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                return "Un ejercicio con esa misma Descripción ya existe!";
            }
        }

        public string Delete(int id)
        {
            if(_db.Ejercicios.Find(id) == null)
            {
                return "Error al buscar el ejercicio. Asegúrese de enviar un ID existente";
            }
            else
            {
                List<RutinaEjercicio> ruejs = _db.RutinaEjercicio.ToList();
                foreach (var re in ruejs)
                {
                    if(re.Ejercicio.EjercicioId == id)
                    {
                        return "No se puede eliminar el ejercicio porque pertenece a una Rutina";
                    }
                }
                try
                {
                    _db.Ejercicios.Remove(_db.Ejercicios.Find(id));
                    _db.SaveChanges();
                    return "Ejercicio eliminado correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }                
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
