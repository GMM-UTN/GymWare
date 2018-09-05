using GymWare.DataAccess.DAL;
using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Logic
{
    public class ComidaLogic
    {
        private ComidaRepository _co = new ComidaRepository();
        public List<Comida> GetAll()
        {
            return _co.GetAll();
        }

        public Comida GetOne(int id)
        {
            return _co.GetOne(id);
        }

        public bool Update(int id, Comida comida)
        {
            return _co.Update(id, comida);
        }

        public string Insert(Comida comida)
        {
            return _co.Insert(comida);
        }

        public string Delete(int id)
        {
            return _co.Delete(id);
        }
    }
}
