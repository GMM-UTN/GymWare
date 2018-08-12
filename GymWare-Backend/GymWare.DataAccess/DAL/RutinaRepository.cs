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
    public class RutinaRepository : BaseRepository
    {
        public Rutina Update(int id, Rutina rutina)
        {
            //ej.Descripcion = ejercicio.Descripcion == null ? ej.Descripcion : ejercicio.Descripcion;
            Rutina ru = _db.Rutinas.Find(id);
            ru.Nombre = rutina.Nombre == null ? ru.Nombre : rutina.Nombre;
            ru.Tipo = rutina.Tipo == null ? ru.Tipo : rutina.Tipo;
            ru.EdadMinima = rutina.EdadMinima == null ? ru.EdadMinima : rutina.EdadMinima;
            ru.EdadMaxima = rutina.EdadMaxima == null ? ru.EdadMaxima : rutina.EdadMaxima;
            ru.Sexo = rutina.Sexo == null ? ru.Sexo : rutina.Sexo;
            ru.Descripcion = rutina.Descripcion == null ? ru.Descripcion : rutina.Descripcion;
            try
            {
                _db.SaveChanges();
                return ru;
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public Rutina Insert(Rutina rutina)
        {
            _db.Rutinas.Add(rutina);
            _db.SaveChanges();
            return rutina;
        }

        public bool Delete(int id)
        {
            if (_db.Rutinas.Find(id) == null)
            {
                return false;
            }
            else
            {
                _db.Rutinas.Remove(_db.Rutinas.Find(id));
                _db.SaveChanges();
                return true;
            }
        }

        private bool RutinaExists(int id)
        {
            return _db.Rutinas.Count(e => e.RutinaId == id) > 0;
        }
    }
}
