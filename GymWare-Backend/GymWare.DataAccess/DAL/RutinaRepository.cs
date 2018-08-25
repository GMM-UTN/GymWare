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

        public EmpleadoClienteRutina InsertEmpleadoClienteRutina(EmpleadoClienteRutina empleadoClienteRutina)
        {
            Empleado empleado = _db.Empleados.Find(empleadoClienteRutina.Empleado.EmpleadoId);
            Cliente cliente = _db.Clientes.Find(empleadoClienteRutina.Cliente.ClienteId);
            Rutina rutina = _db.Rutinas.Find(empleadoClienteRutina.Rutina.RutinaId);
            empleadoClienteRutina.Empleado = empleado;
            empleadoClienteRutina.Cliente = cliente;
            empleadoClienteRutina.Rutina = rutina;
            _db.EmpleadoClienteRutina.Add(empleadoClienteRutina);
            try
            {
                _db.SaveChanges();
                return empleadoClienteRutina;
            }
            catch (Exception)
            {
                throw;
            }            
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
    }
}
