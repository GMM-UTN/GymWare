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
        public List<Rutina> GetAllRutinasByUser(int idUsuario)
        {
            List<Rutina> rutinas = new List<Rutina>();
            List<EmpleadoClienteRutina> rutinasClientes = _db.EmpleadoClienteRutina.Where(x => x.Cliente.ClienteId == idUsuario).ToList();
            foreach (var rc in rutinasClientes)
            {
                Rutina rutina = _db.Rutinas.Find(rc.Rutina.RutinaId);
                if (rutina != null)
                {
                    rutinas.Add(rutina);
                }
            }
            return rutinas;
        }
        public string Update(int id, Rutina rutina)
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
                return "Rutina modificada correctamente";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public Rutina Insert(Rutina rutina)
        {
            _db.Rutinas.Add(rutina);
            _db.SaveChanges();
            return rutina;
        }

        public string InsertEmpleadoClienteRutina(EmpleadoClienteRutina empleadoClienteRutina)
        {
            Empleado empleado = _db.Empleados.Find(empleadoClienteRutina.Empleado.EmpleadoId);
            Cliente cliente = _db.Clientes.Find(empleadoClienteRutina.Cliente.ClienteId);
            Rutina rutina = _db.Rutinas.Find(empleadoClienteRutina.Rutina.RutinaId);
            EmpleadoClienteRutina ecr = _db.EmpleadoClienteRutina.Where(x => x.Empleado.EmpleadoId == empleado.EmpleadoId && x.Cliente.ClienteId == cliente.ClienteId && x.Rutina.RutinaId == rutina.RutinaId).FirstOrDefault();
            if (ecr == null)
            {
                empleadoClienteRutina.Empleado = empleado;
                empleadoClienteRutina.Cliente = cliente;
                empleadoClienteRutina.Rutina = rutina;                
                try
                {
                    _db.EmpleadoClienteRutina.Add(empleadoClienteRutina);
                    _db.SaveChanges();
                    return "Rutina asignada correctamente al cliente y empleado";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                } 
            }
            else
            {
                return "El cliente y el empleado ya tienen asignada esta Rutina";
            }
        }

        public string Delete(int id)
        {
            Rutina rutina = _db.Rutinas.Find(id);
            if (rutina == null)
            {
                return "No existe ninguna rutina con ese Id";
            }
            else
            {
                List<EmpleadoClienteRutina> empleadoClienteRutina = _db.EmpleadoClienteRutina.ToList();
                foreach (var ecr in empleadoClienteRutina)
                {
                    if (ecr.Rutina.RutinaId == id)
                    {
                        return "No se puede eliminar la rutina porque ya está asignada a Clientes";
                    }
                }
                List<RutinaEjercicio> rutinaEjercicio = _db.RutinaEjercicio.ToList();
                foreach (var re in rutinaEjercicio)
                {
                    if (re.Rutina.RutinaId == id)
                    {
                        _db.RutinaEjercicio.Remove(re);
                    }
                }
                _db.Rutinas.Remove(_db.Rutinas.Find(id));
                try
                {
                    _db.SaveChanges();
                    return "Rutina eliminada correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }
    }
}
