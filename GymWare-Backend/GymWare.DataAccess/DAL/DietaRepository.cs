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
            List<Empleado> empleados = new List<Empleado>();
            foreach (var e in dieta.Empleados)
            {
                Empleado empleado = _db.Empleados.Find(e.EmpleadoId);
                empleados.Add(empleado);                
            }
            dieta.Empleados.Clear();
            foreach (var e in empleados)
            {
                dieta.Empleados.Add(e);
            }
            _db.Dietas.Add(dieta);
            _db.SaveChanges();
            foreach (var e in dieta.Empleados)
            {
                if(e != null)
                {
                    Empleado em = _db.Empleados.Find(e.EmpleadoId);
                    if (em != null)
                    {
                        Empleado empleado = em;
                        empleado.Dietas.Add(dieta);
                        _db.SaveChanges();
                    }
                }
            }
            return dieta;
        }

        public DietaCliente InsertDietaCliente(DietaCliente dietaCliente)
        {
            Dieta dieta = _db.Dietas.Find(dietaCliente.Dieta.DietaId);
            Cliente cliente = _db.Clientes.Find(dietaCliente.Cliente.ClienteId);
            dietaCliente.Dieta = dieta;
            dietaCliente.Cliente = cliente;
            _db.DietaCliente.Add(dietaCliente);
            try
            {
                _db.SaveChanges();
                return dietaCliente;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int id)
        {
            Dieta dieta = _db.Dietas.Find(id);
            if (dieta == null)
            {
                return false;
            }
            else
            {
                List<DietaCliente> dietaCliente = _db.DietaCliente.ToList();
                foreach (var dc in dietaCliente)
                {
                    if(dc.Dieta.DietaId == id)
                    {
                        return false;
                    }
                }
                foreach (var e in dieta.Empleados)
                {
                    Empleado empleado = _db.Empleados.Find(e.EmpleadoId);
                    empleado.Dietas.Remove(dieta);
                }
                List<DietaComida> dietaComida = _db.DietaComida.ToList();
                foreach (var dc in dietaComida)
                {
                    if(dc.Dieta.DietaId == id)
                    {
                        _db.DietaComida.Remove(dc);
                    }
                }
                _db.Dietas.Remove(_db.Dietas.Find(id));
                _db.SaveChanges();
                return true;
            }
        }
    }
}
