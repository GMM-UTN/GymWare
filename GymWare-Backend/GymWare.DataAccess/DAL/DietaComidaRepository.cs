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
    public class DietaComidaRepository : BaseRepository
    {
        public List<DietaComida> GetAll()
        {
            return _db.DietaComida.ToList();
        }

        public DietaComida GetOne(int id)
        {
            return _db.DietaComida.Find(id);
        }

        public bool Update(Dieta dieta, List<DietaComida> dietaComida)
        {
            _db.DietaComida.RemoveRange(_db.DietaComida.Where(x => x.Dieta.DietaId == dieta.DietaId));
            _db.SaveChanges();
            foreach (var item in dietaComida)
            {
                DietaComida dc = new DietaComida();
                Comida co = _db.Comidas.Find(item.Comida.ComidaId);
                Dieta di = _db.Dietas.Find(dieta.DietaId);
                dc.Comida = co;
                dc.Dieta = di;
                dc.DiasSemana = item.DiasSemana;
                _db.DietaComida.Add(dc);
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

        public bool Insert(Dieta dieta, List<DietaComida> dietaComida)
        {
            foreach (var item in dietaComida)
            {
                Comida co = _db.Comidas.Find(item.Comida.ComidaId);
                Dieta di = _db.Dietas.Find(dieta.DietaId);
                item.Comida = co;
                item.Dieta = di;
                _db.DietaComida.Add(item);
                _db.SaveChanges();
            }
            return true;
        }

        public bool Delete(int id)
        {
            _db.DietaComida.RemoveRange(_db.DietaComida.Where(x => x.Dieta.DietaId == id));
            _db.SaveChanges();
            return true;
        }
    }
}