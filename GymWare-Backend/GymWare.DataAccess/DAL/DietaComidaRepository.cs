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

        public List<DietaComida> GetOne(int id)
        {
            return _db.DietaComida.Where(e => e.Dieta.DietaId == id).ToList();
        }

        public string Update(int idDieta, List<DietaComida> dietaComida)
        {
            try
            {
                _db.DietaComida.RemoveRange(_db.DietaComida.Where(x => x.Dieta.DietaId == idDieta));
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }            
            foreach (var item in dietaComida)
            {
                DietaComida dc = new DietaComida();
                Comida co = _db.Comidas.Find(item.Comida.ComidaId);
                Dieta di = _db.Dietas.Find(idDieta);
                dc.Comida = co;
                dc.Dieta = di;
                dc.DiasSemana = item.DiasSemana;
                _db.DietaComida.Add(dc);
            }
            try
            {
                _db.SaveChanges();
                return "Dieta modificada correctamente";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string Insert(Dieta dieta, List<DietaComida> dietaComida)
        {
            foreach (var item in dietaComida)
            {
                try
                {
                    Comida co = _db.Comidas.Find(item.Comida.ComidaId);
                    Dieta di = _db.Dietas.Find(dieta.DietaId);
                    item.Comida = co;
                    item.Dieta = di;
                    _db.DietaComida.Add(item);
                    _db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            return "Dieta creada correctamente";
        }

        //public string Delete(int id)
        //{
        //    try
        //    {
        //        _db.DietaComida.RemoveRange(_db.DietaComida.Where(x => x.Dieta.DietaId == id));
        //        _db.SaveChanges();
        //        return "Dieta eliminada correctamente";
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }            
        //}
    }
}