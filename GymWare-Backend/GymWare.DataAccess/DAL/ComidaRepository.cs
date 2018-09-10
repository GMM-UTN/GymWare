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
    public class ComidaRepository : BaseRepository
    {
        public List<Comida> GetAll()
        {
            return _db.Comidas.ToList();
        }

        public Comida GetOne(int id)
        {
            return _db.Comidas.Find(id);
        }

        public bool Update(int id, Comida comida)
        {
            Comida co = _db.Comidas.Find(id);
            co.Nombre = comida.Nombre == null ? co.Nombre : comida.Nombre;
            co.Descripcion = comida.Descripcion == null ? co.Descripcion : comida.Descripcion;
            co.Calorias = comida.Calorias == null ? co.Calorias : comida.Calorias;
            
            try
            {
                _db.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComidaExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public string Insert(Comida comida)
        {
            Comida co = _db.Comidas.Where(x => x.Nombre.ToLower() == comida.Nombre.ToLower()).FirstOrDefault();
            if (co == null)
            {
                try
                {
                    _db.Comidas.Add(comida);
                    _db.SaveChanges();
                    return "Comida agregada correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                return "Una comida con ese mismo Nombre ya existe!";
            }
        }

        public string Delete(int id)
        {
            if (_db.Comidas.Find(id) == null)
            {
                return "Error al buscar la comida. Asegúrese de enviar un ID existente";
            }
            else
            {
                List<DietaComida> dicos = _db.DietaComida.ToList();
                foreach (var dc in dicos)
                {
                    if (dc.Comida.ComidaId == id)
                    {
                        return "No se puede eliminar la comida porque pertenece a una Dieta";
                    }
                }
                try
                {
                    _db.Comidas.Remove(_db.Comidas.Find(id));
                    _db.SaveChanges();
                    return "Comida eliminada correctamente";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }

        private bool ComidaExists(int id)
        {
            return _db.Comidas.Count(e => e.ComidaId == id) > 0;
        }
    }
}
