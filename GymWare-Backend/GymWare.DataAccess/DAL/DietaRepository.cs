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
        public List<Dieta> GetAllDietasByUser(int idUsuario)
        {
            List<Dieta> dietas = new List<Dieta>();
            List<DietaCliente> dietasClientes = _db.DietaCliente.Where(x => x.Cliente.ClienteId == idUsuario).ToList();
            foreach (var dc in dietasClientes)
            {                
                Dieta dieta = _db.Dietas.Find(dc.Dieta.DietaId);
                if(dieta != null)
                {
                    dietas.Add(dieta);
                }
            }
            return dietas;
        }

        public string Update(int id, Dieta dieta)
        {
            if(_db.DietaCliente.Where(x => x.Dieta.DietaId == id).FirstOrDefault() == null)
            {
                try
                {
                    Dieta di = _db.Dietas.Find(id);
                    di.Nombre = dieta.Nombre == null ? di.Nombre : dieta.Nombre;
                    di.Descripcion = dieta.Descripcion == null ? di.Descripcion : dieta.Descripcion;
                    _db.SaveChanges();
                    return "Dieta modificada correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                return "Esta dieta está asignada a un Cliente, por lo que no puede modificarse";
            }
        }

        public Dieta Insert(Dieta dieta)
        {
            List<Empleado> empleados = new List<Empleado>();
            foreach (var e in dieta.Empleados)
            {
                Empleado empleado = _db.Empleados.Find(e.EmpleadoId);
                if(empleado != null)
                {
                    empleados.Add(empleado);
                }                
            }
            dieta.Empleados.Clear();
            foreach (var e in empleados)
            {
                dieta.Empleados.Add(e);
            }
            try
            {
                _db.Dietas.Add(dieta);
                _db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }            
            foreach (var e in dieta.Empleados)
            {
                if(e != null)
                {
                    Empleado em = _db.Empleados.Find(e.EmpleadoId);
                    if (em != null)
                    {
                        try
                        {
                            Empleado empleado = em;
                            empleado.Dietas.Add(dieta);
                            _db.SaveChanges();
                        }
                        catch (Exception)
                        {
                            return null;
                        }
                        
                    }
                }
            }
            return dieta;
        }

        public string InsertDietaCliente(DietaCliente dietaCliente)
        {
            Dieta dieta = _db.Dietas.Find(dietaCliente.Dieta.DietaId);
            Cliente cliente = _db.Clientes.Find(dietaCliente.Cliente.ClienteId);
            DietaCliente dc = _db.DietaCliente.Where(x => x.Dieta.DietaId == dieta.DietaId && x.Cliente.ClienteId == cliente.ClienteId).FirstOrDefault();
            if (dc == null)
            {
                dietaCliente.Dieta = dieta;
                dietaCliente.Cliente = cliente;
                try
                {
                    _db.DietaCliente.Add(dietaCliente);
                    _db.SaveChanges();
                    return "Dieta asignada correctamente al cliente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                return "El cliente ya tiene asignada esta Dieta";
            }
        }

        public string Delete(int id)
        {
            Dieta dieta = _db.Dietas.Find(id);
            if (dieta == null)
            {
                return "No existe ninguna dieta con ese Id";
            }
            else
            {
                List<DietaCliente> dietaCliente = _db.DietaCliente.ToList();
                foreach (var dc in dietaCliente)
                {
                    if(dc.Dieta.DietaId == id)
                    {
                        return "No se puede eliminar la dieta porque ya está asignada a Clientes";
                    }
                }
                List<DietaComida> dietaComida = _db.DietaComida.ToList();
                foreach (var dc in dietaComida)
                {
                    if (dc.Dieta.DietaId == id)
                    {
                        _db.DietaComida.Remove(dc);
                    }
                }
                foreach (var e in dieta.Empleados)
                {
                    Empleado empleado = _db.Empleados.Find(e.EmpleadoId);
                    empleado.Dietas.Remove(dieta);
                }                
                _db.Dietas.Remove(_db.Dietas.Find(id));
                try
                {
                    _db.SaveChanges();
                    return "Dieta eliminada correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }                
            }
        }
    }
}
